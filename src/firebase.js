// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  where,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  Timestamp,
  getDocs,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWcDBOnbi6pY81oE2LGeiOVK6GxR9vV7I",
  authDomain: "insta-clone-33a5b.firebaseapp.com",
  projectId: "insta-clone-33a5b",
  storageBucket: "insta-clone-33a5b.appspot.com",
  messagingSenderId: "1031313346003",
  appId: "1:1031313346003:web:b1a33ed6ce80a29c81b326"
};

function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || './assets/images/profile_placeholder.png';
}

async function getUserProfile(uid) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
}

async function getCurrentUserProfile() {
  return await getUserProfile(getAuth().currentUser.uid);
}

function getCurrentUser() {
  return getAuth().currentUser;
}

async function checkFollow(uid) {
  const follows = await getUserFollows(getAuth().currentUser.uid);
  if (follows.some(e => e.uid === uid)) {
    return true;
  }
  return false;
}

async function isNewUser() {
  const userEmails = await getUserEmails();
  const newUser = !(userEmails.includes(getAuth().currentUser.email));
  return newUser;
}

async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
}

async function handleLogin() {
  await signIn();
  if (await isNewUser()) {
    signOutUser();
  }
}

async function signUp(name) {
  await signIn();
  if (await isNewUser()) {
    await saveUser(name);
  }
}

async function newUser() {
  const userEmails = await getUserEmails();
  return !(userEmails.includes(getAuth().currentUser.email));
}

async function getUserEmails() {
  try {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    const arr = [];
    querySnapshot.forEach(e => arr.push(e.data().email));
    return arr;
  } catch(error) {
    console.error('Error acessing data from Firebase', error);
  }
}

async function saveUser(name) {
  const uid = getAuth().currentUser.uid;
  const postRef = await setDoc(doc(db, 'users', uid), {
    name: name,
    email: getAuth().currentUser.email,
    profilePicUrl: getProfilePicUrl(),
    bio: `Hi my name is ${name}`,
    bannerURL: await getDefaultBannerUrl(),
    uid: uid,
    followingCount: 0,
    followersCount: 0,
  });
}

async function getDefaultBannerUrl() {
  const bannerRef = ref(storage, 'assets/profile-banner-default.webp');
  return await getDownloadURL(bannerRef);
}

// function initFirebaseAuth() {
//   // Listen to auth state changes.
//   onAuthStateChanged(getAuth(), authStateObserver);
// }

// async function authStateObserver(user) {
//   // html element shortcuts
//   const loginBtns = document.getElementById('login-btns');
//   const userInfo = document.getElementById('user-info');
//   const userPicElement = document.getElementById('user-pic');
//   const userNameElement = document.getElementById('user-name');

//   if (user) {
//     // get user profile
//     const user = await getUserProfile(getAuth().currentUser.uid);
//     // set user name and pic
//     userPicElement.src = user.profilePicUrl;
//     userNameElement.textContent = user.name;

//     //hide login buttons
//     loginBtns.setAttribute('hidden', 'true');

//     //show user info
//     userInfo.removeAttribute('hidden');
//   } else {
//     loginBtns.removeAttribute('hidden');
//     userInfo.setAttribute('hidden', 'true');
//   }
// }

// async function callAuthStateObserver() {
//   await authStateObserver(getAuth());
// }

// function addSizeToGoogleProfilePic(url) {
//   if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
//     return url + '?sz=150';
//   }
//   return url;
// }

async function uploadPost(file, text) {
  try {
    // add doc to firestore 
    const timestamp = serverTimestamp();
    const uid = getAuth().currentUser.uid;

    const postRef = await addDoc(collection(db, 'posts'), {
      uid: uid,
      email: getAuth().currentUser.email,
      text: text,
      timestamp: timestamp,
      likes: [uid],
      likesCount: 1,
    });

    // Upload the image to Cloud Storage.
    const [fileSnapshot, imageUrl] = await uploadImgToCloud(file);

    // Update firestore doc with the image's URL.
    await updateDoc(postRef,{
      imageUrl: imageUrl,
      storageUri: fileSnapshot.metadata.fullPath,
      postID: postRef.id,
    });

    //update user - posts with new post
    const docRef = doc(db, 'users', uid, 'posts', postRef.id);
    await setDoc(docRef, {
      postID: postRef.id,
      timestamp: timestamp,
      imageUrl: imageUrl,
    });
  } catch(error) {
    console.error('Error uploading to Firebase', error);
  }
} 

async function uploadImgToCloud(file) {
  //upload file to cloud storage
  const filePath = `${getAuth().currentUser.uid}/${file.name}`;
  const imageRef = ref(storage, filePath);
  const fileSnapshot = await uploadBytes(imageRef, file);

  //generate public image url
  const imageUrl = await getDownloadURL(imageRef);

  return [fileSnapshot, imageUrl];
}

async function updateProfile(name, bio) {
  //update user doc
  const userRef = doc(db, 'users', getAuth().currentUser.uid);
  await updateDoc(userRef, {
    name: name,
    bio: bio,
  });
}

async function updateProfileBanner(bannerFile) {
  //upload image to Cloud Storage
  const [bannerSnapshot, bannerUrl] = await uploadImgToCloud(bannerFile);

  //update user doc
  const userRef = doc(db, 'users', getAuth().currentUser.uid);
  await updateDoc(userRef, {
    bannerURL: bannerUrl,
    bannerStorageUri: bannerSnapshot.metadata.fullPath,
  });
}

async function updateProfilePic(picFile) {
  //upload image to Cloud Storage
  const [picSnapshot, picUrl] = await uploadImgToCloud(picFile);

  //update user doc
  const userRef = doc(db, 'users', getAuth().currentUser.uid);
  await updateDoc(userRef, {
    profilePicUrl: picUrl,
    profilePicStorageUri: picSnapshot.metadata.fullPath,
  });
}

async function updateLikes(postID, likes, likesCount) {
  try {
    const docRef = doc(db, 'posts', postID);
    await updateDoc(docRef, {
      likes: likes,
      likesCount: likesCount,
    });
  } catch(error) {
    console.error('Error uploading to Firebase', error);
  }
}

async function addComment(postID, text) {
  try {
    const colRef = collection(db, 'posts', postID, 'comments');
    await addDoc(colRef, {
      text: text,
      uid: getAuth().currentUser.uid,
      timestamp: serverTimestamp(),
    });
  } catch(error) {
    console.error('Error uploading to Firebase', error);
  }
}

async function getComments(postID, lim = 2) {
  try {
    const cmtsRef = collection(db, 'posts', postID, 'comments');
    const q = query(cmtsRef, orderBy('timestamp', 'desc'), limit(lim));
    const querySnapshot = await getDocs(q);
    const arr = [];
    querySnapshot.forEach(e => arr.push(e.data()));
    return arr;
  } catch(error) {
    console.error('Error acessing data from Firebase', error);
  }
}

async function getPosts() {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('timestamp', 'desc'), limit(15));
    const querySnapshot = await getDocs(q);
    const arr = [];
    querySnapshot.forEach(e => arr.push(e.data()));
    arr.push(...await getMostLikedPosts());
    const unique = [...removeDuplicates(arr)];
    unique.sort(sortFeedArray);
    return unique;
  } catch(error) {
    console.error('Error acessing data from Firebase', error);
  }
}

async function getMostLikedPosts() {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('likesCount', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);
    const arr = [];
    querySnapshot.forEach(e => arr.push(e.data()));
    return arr;
  } catch(error) {
    console.error('Error acessing data from Firebase', error);
  }
}

async function getPost(postID) {
  const docRef = doc(db, 'posts', postID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
}

async function deletePost(postID, uid) {
  await deleteDoc(doc(db, 'posts', postID));
  await deleteDoc(doc(db, 'users', uid, 'posts', postID));
}

async function getUserPosts(userID, lim = false) {
  try {
    const colRef = collection(db, 'users', userID, 'posts');
    const q = lim ? query(colRef, orderBy('timestamp', 'desc'), limit(lim)) : query(colRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const arr = [];
    querySnapshot.forEach(e => arr.push(e.data()));
    return arr;
  } catch(error) {
    console.error('Error acessing data from Firebase', error);
  }
}

async function getUserFeed(userID) {
  //get followed users
  const follows = await getUserFollows(userID);
  
  //create array with user posts
  const all = await getUserPosts(userID, 5);
  
  //get user posts from followed users and push to array
  for await (const user of follows) {
    all.push(...await getUserPosts(user.uid, 5));
  }
  
  //get most Liked posts from any user
  all.push(...await getMostLikedPosts());

  //filter out duplicates
  const filtered = [...removeDuplicates(all)];

  //sort array by timestamp
  filtered.sort(sortFeedArray);

  //limit array to first 10
  filtered.splice(9);

  //use postID's to get posts from firebase
  const posts = [];
  for await (const post of filtered) {
    posts.push(await getPost(post.postID));
  }
  return posts;
}

function removeDuplicates(arr) {
  const uniqueIds = [];

  const unique = arr.filter(e => {
    const isDuplicate =  uniqueIds.includes(e.postID);

    if(!isDuplicate) {
      uniqueIds.push(e.postID);

      return true;
    }

    return false;
  });

  return unique;
}

function sortFeedArray(a, b) {
  return b.timestamp - a.timestamp;
}

async function getUserFollows(userID) {
  try {
    const colRef = collection(db, 'users', userID, 'following');
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    const arr = [];
    querySnapshot.forEach(e => arr.push(e.data()));
    return arr;
  } catch(error) {
    console.error('Error acessing data from Firebase', error);
  }
}

async function getUserFollowers(userID) {
  try {
    const colRef = collection(db, 'users', userID, 'followers');
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    const arr = [];
    querySnapshot.forEach(e => arr.push(e.data()));
    return arr;
  } catch(error) {
    console.error('Error acessing data from Firebase', error);
  }
}

async function followUser(user) {
  try {
    //get currentUser 
    const cUser = await getCurrentUserProfile();
    const cUID = cUser.uid;
    const uid = user.uid;

    //update currentUser -- following 
    const docRef = doc(db, 'users', cUID, 'following', uid);
    await setDoc(docRef, {
      uid: uid,
    });

    //update followed user -- followers 
    const docRef2 = doc(db, 'users', uid, 'followers', cUID);
    await setDoc(docRef2, {
      uid: cUID,
    });

    //update current user --followingCount, 
    const userRef = doc(db, 'users', cUID);
    await updateDoc(userRef, {
      followingCount: cUser.followingCount + 1,
    });

    //update followed user -- followersCount
    const userRef2 = doc(db, 'users', uid);
    await updateDoc(userRef2, {
      followersCount: user.followersCount + 1,
    });

  } catch(error) {
    console.error('Error acessing data from Firebase', error);
  }
  
}

async function unfollowUser(user) {
  try {
    //get currentUser ID
    const cUser = await getCurrentUserProfile();
    const cUID = cUser.uid;
    const uid = user.uid;

    //update currentUser -- following
    const docRef = doc(db, 'users', cUID, 'following', uid);
    await deleteDoc(docRef);

    //update followed user -- followers
    const docRef2 = doc(db, 'users', uid, 'followers', cUID);
    await deleteDoc(docRef2);

    //update current user --followingCount, 
    const userRef = doc(db, 'users', cUID);
    await updateDoc(userRef, {
      followingCount: cUser.followingCount - 1,
    });

    //update followed user -- followersCount
    const userRef2 = doc(db, 'users', uid);
    await updateDoc(userRef2, {
      followersCount: user.followersCount - 1,
    });
  } catch(error) {
    console.error('Error accessing firebase', error);
  }
  
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
// initFirebaseAuth();

export { 
  handleLogin, 
  signOutUser, 
  uploadPost, 
  getPosts, 
  getPost, 
  deletePost,
  getUserFeed,
  getUserPosts, 
  signUp, 
  getCurrentUser, 
  getCurrentUserProfile, 
  getUserProfile, 
  updateLikes, 
  addComment, 
  getComments, 
  checkFollow, 
  followUser, 
  unfollowUser,
  getUserFollows,
  getUserFollowers, 
  updateProfile, 
  updateProfileBanner, 
  updateProfilePic };