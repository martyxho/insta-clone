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
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDocs,
  getDoc,
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

// Returns the user's display name.
async function getUserProfile(uid) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
}

function getCurrentUser() {
  return getAuth().currentUser;
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

async function handleSignUp(name) {
  await signIn();
  saveUser(name);
}

async function saveUser(name) {
  const postRef = await setDoc(doc(db, 'users', getAuth().currentUser.uid), {
    name: name,
    email: getAuth().currentUser.email,
    profilePicUrl: getProfilePicUrl(),
  });
}

function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

async function authStateObserver(user) {
  // html element shortcuts
  const loginBtns = document.getElementById('login-btns');
  const userInfo = document.getElementById('user-info');
  const userPicElement = document.getElementById('user-pic');
  const userNameElement = document.getElementById('user-name');

  if (user) {
    // get user name and pic
    const profilePicUrl = getProfilePicUrl();
    const user = await getUserProfile(getAuth().currentUser.uid);
    // set user name and pic
    userPicElement.src = profilePicUrl;
    userNameElement.textContent = user.name;

    //hide login buttons
    loginBtns.setAttribute('hidden', 'true');

    //show user info
    userInfo.removeAttribute('hidden');
  } else {
    loginBtns.removeAttribute('hidden');
    userInfo.setAttribute('hidden', 'true');
  }
}

async function callAuthStateObserver() {
  await authStateObserver(getAuth());
}

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
      profilePicUrl: getProfilePicUrl(),
      timestamp: timestamp,
      likes: [uid],
    });

    // Upload the image to Cloud Storage.
    const filePath = `${getAuth().currentUser.uid}/${file.name}`;
    const imageRef = ref(storage, filePath);
    const fileSnapshot = await uploadBytes(imageRef, file);

    // Generate a public URL for the file.
    const publicImageUrl = await getDownloadURL(imageRef);

    // Update firestore doc with the image's URL.
    await updateDoc(postRef,{
      imageUrl: publicImageUrl,
      storageUri: fileSnapshot.metadata.fullPath,
      postID: postRef.id,
    });

    //update user - posts with new post
    const docRef = doc(db, 'users', uid, 'posts', postRef.id);
    await setDoc(docRef, {
      postID: postRef.id,
      timestamp: timestamp,
    });
  } catch(error) {
    console.error('Error uploading to Firebase', error);
  }
} 

async function updateLikes(postID, likes) {
  try {
    const docRef = doc(db, 'posts', postID);
    await updateDoc(docRef, {
      likes: likes
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
      profilePicUrl: getProfilePicUrl(),
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

async function getUserPosts(userID) {
  try {
    const colRef = collection(db, 'users', userID, 'posts');
    const q = query(colRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const arr = [];
    querySnapshot.forEach(e => arr.push(e.data()));
    return arr;
  } catch(error) {
    console.error('Error acessing data from Firebase', error);
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
initFirebaseAuth();
getPosts();

export { signIn, signOutUser, uploadPost, getPosts, getPost, getUserPosts, handleSignUp, getCurrentUser, getUserProfile, updateLikes, addComment, getComments, callAuthStateObserver };