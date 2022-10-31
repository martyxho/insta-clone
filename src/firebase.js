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

// Returns the signed-in user's display name.
function getUserName() {
  return getAuth().currentUser.displayName;
}

function getEmail() {
  return getAuth().currentUser.email;
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

function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

function authStateObserver(user) {
  // html element shortcuts
  const loginBtns = document.getElementById('login-btns');
  const userInfo = document.getElementById('user-info');
  const userPicElement = document.getElementById('user-pic');
  const userNameElement = document.getElementById('user-name');

  if (user) {
    // get user name and pic
    const profilePicUrl = getProfilePicUrl();
    const userName = getUserName();

    // set user name and pic
    userPicElement.style.backgroundImage =
      'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userNameElement.textContent = userName;

    //hide login buttons
    loginBtns.setAttribute('hidden', 'true');

    //show user info
    userInfo.removeAttribute('hidden');
  } else {
    loginBtns.removeAttribute('hidden');
    userInfo.setAttribute('hidden', 'true');
  }
}

function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

async function uploadPost(file, text) {
  try {
    // add doc to firestore 
    const postRef = await addDoc(collection(db, 'posts'), {
      name: getUserName(),
      email: getEmail(),
      text: text,
      profilePicUrl: getProfilePicUrl(),
      timestamp: serverTimestamp()
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
      storageUri: fileSnapshot.metadata.fullPath
    });
  } catch(error) {
    console.error('Error uploading to Firebase', error);
  }
} 

async function getPosts() {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, orderBy('timestamp', 'desc'));
  const querySnapshot = await getDocs(q);
  const arr = [];
  querySnapshot.forEach(e => arr.push(e.data()));
  return arr;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
initFirebaseAuth();
getPosts();

export { signIn, signOutUser, uploadPost, getPosts };