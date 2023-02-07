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
  arrayUnion,
  arrayRemove,
  increment,
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes,
  getDownloadURL,
  deleteObject,
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
  const cUser = await getCurrentUserProfile();
  return cUser.following.includes(uid);
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
    return false;
  }
  return true;
}

async function signUp(name) {
  if (await checkUsernames(name)) {
    await signIn();
    if (await isNewUser()) {
      await saveUser(name);
      await updateUsernames(name);
    }
  }
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
    posts: [],
    following: [],
    followers: [],
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
    const user = await getCurrentUserProfile();
    const uid = user.uid;

    const postRef = await addDoc(collection(db, 'posts'), {
      uid: uid,
      email: getAuth().currentUser.email,
      text: text,
      timestamp: timestamp,
      likes: [uid],
      commentCount: 0,
    });

    // Upload the image to Cloud Storage.
    const filePath = `${getAuth().currentUser.uid}/${file.name}`;
    const [fileSnapshot, imageUrl] = await uploadImgToCloud(file, filePath);

    // Update firestore doc with the image's URL.
    await updateDoc(postRef,{
      imageUrl: imageUrl,
      storageUri: fileSnapshot.metadata.fullPath,
      postID: postRef.id,
    });

    //update user - posts with new post 
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      posts: arrayUnion(postRef.id)
    });
  } catch(error) {
    console.error('Error uploading to Firebase', error);
  }
} 

async function uploadImgToCloud(file, path) {
  //upload file to cloud storage
  const imageRef = ref(storage, path);
  const fileSnapshot = await uploadBytes(imageRef, file);

  //generate public image url
  const imageUrl = await getDownloadURL(imageRef);

  return [fileSnapshot, imageUrl];
}

async function updateProfile(name, bio, oldName) {
  if (await checkUsernames(name)) {
    //update user doc
    const userRef = doc(db, 'users', getAuth().currentUser.uid);
    await updateDoc(userRef, {
      name: name,
      bio: bio,
    });

    updateUsernames(name, oldName);
  }
}

async function getUsernames() {
  const docRef = doc(db, 'data', 'data');
  const data = (await getDoc(docRef)).data();
  const usernames = data.usernames;
  return usernames;
}

async function checkUsernames(name) {
  const usernames = await getUsernames();
  if (usernames.includes(name)) {
    return false;
  } else {
    return true;
  }
}

async function updateUsernames(newName, oldName = null) {
  const docRef = doc(db, 'data', 'data');
  await updateDoc(docRef, {
    usernames: arrayUnion(newName)
  });
  if (oldName) {
    await updateDoc(docRef, {
      usernames: arrayRemove(oldName)
    });
  }
}

async function updateProfileBanner(cUser, bannerFile) {

  //delete current banner img from storage if not default
  if (cUser.bannerStorageUri) {
    await deleteObject(ref(storage, cUser.bannerStorageUri));
  }

  //upload image to Cloud Storage
  const path = `${cUser.uid}/banner/${bannerFile.name}`
  const [bannerSnapshot, bannerUrl] = await uploadImgToCloud(bannerFile, path);

  //update user doc
  const userRef = doc(db, 'users', cUser.uid);
  await updateDoc(userRef, {
    bannerURL: bannerUrl,
    bannerStorageUri: bannerSnapshot.metadata.fullPath,
  });
}

async function updateProfilePic(cUser, picFile) {

  //delete current profile pic if not default
  if (cUser.profilePicStorageUri) {
    await deleteObject(ref(storage, cUser.profilePicStorageUri));
  }

  //upload image to Cloud Storage
  const path = `${cUser.uid}/profile/${picFile.name}`
  const [picSnapshot, picUrl] = await uploadImgToCloud(picFile, path);

  //update user doc
  const userRef = doc(db, 'users', cUser.uid);
  await updateDoc(userRef, {
    profilePicUrl: picUrl,
    profilePicStorageUri: picSnapshot.metadata.fullPath,
  });
}

async function updateLikes(postID, likes) {
  try {
    const docRef = doc(db, 'posts', postID);
    await updateDoc(docRef, {
      likes: likes,
    });
  } catch(error) {
    console.error('Error uploading to Firebase', error);
  }
}

async function addComment(postID, text) {
  try {
    const docRef = doc(db, 'posts', postID);
    const colRef = collection(db, 'posts', postID, 'comments');
    const cmtRef = await addDoc(colRef, {
      uid: getAuth().currentUser.uid,
      text: text,
      timestamp: serverTimestamp()
    });
    await updateDoc(cmtRef, {
      cmtID: cmtRef.id
    });
    await updateDoc(docRef, {
      commentCount: increment(1)
    });
  } catch(error) {
    console.error('Error uploading to Firebase', error);
  }
}

async function getComments(postID, lim = 2) {
  try {
    const colRef = collection(db, 'posts', postID, 'comments');
    const q = query(colRef, orderBy('timestamp', 'desc'), limit(lim));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach(e => data.push(e.data()));
    return data;
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
    const q = query(postsRef, orderBy('likesCount', 'desc'), limit(3));
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

async function getPostsFromIDArr(arr) {
  const posts = [];
  for await (const postID of arr) {
    posts.push(await getPost(postID));
  }
  return posts;
}

async function deletePost(cUser, post) {
  const {postID} = post;
  await deleteDoc(doc(db, 'posts', postID));
  const userRef = doc(db, 'users', cUser.uid);
  await updateDoc(userRef, {
    posts: arrayRemove(postID)
  });
  await deleteObject(ref(storage, post.storageUri));
}

async function getUserPostsArr(userID, lim=false) {
  try {
    const user = await getUserProfile(userID);
    const posts = user.posts;
    if (lim && posts.length > lim) {
      return posts.slice(posts.length - lim);
    }
    return posts;
  } catch(error) {
    console.error('Error acessing data from Firebase', error);
  }
}

async function getUserPosts(userID) {
  const postsArr = await getUserPostsArr(userID);
  return getPostsFromIDArr(postsArr);
}

async function getUserFeed(userID) {
  //get user doc
  const user = await getUserProfile(userID);
  //create array with user posts
  const all = await getUserPosts(userID, 5);
  
  //check if user has follows
  if (user.following.length > 0) {
    //get user posts from followed users and push to array
    for await (const fUser of user.following) {
      all.push(...await getUserPosts(fUser, 5));
    }
    
    //get most Liked posts from any user
    all.push(...await getMostLikedPosts());
  } else {
    all.push(...await getPosts());
  }

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

async function followUser(uid) {
  try {
    //get currentUser 
    const cUID = getAuth().currentUser.uid;

    //update currentUser -- following 
    const cUserRef = doc(db, 'users', cUID);
    await updateDoc(cUserRef, {
      following: arrayUnion(uid)
    });

    //update followed user -- followers 
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      followers: arrayUnion(cUID)
    });
  } catch(error) {
    console.error('Error acessing data from Firebase', error);
  }
  
}

async function unfollowUser(uid) {
  try {
    //get currentUser ID
    const cUID = getAuth().currentUser.uid;

    //update currentUser -- following 
    const cUserRef = doc(db, 'users', cUID);
    await updateDoc(cUserRef, {
      following: arrayRemove(uid)
    });

    //update followed user -- followers 
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      followers: arrayRemove(cUID)
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
  updateProfile, 
  updateProfileBanner, 
  updateProfilePic,
  getUsernames,
};