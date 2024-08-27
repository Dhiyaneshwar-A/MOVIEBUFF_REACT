// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBM2d6LqairWJ8Sr99cqzYtZAkjIVqxQGA",
  authDomain: "moviebuff-3007b.firebaseapp.com",
  projectId: "moviebuff-3007b",
  storageBucket: "moviebuff-3007b.appspot.com",
  messagingSenderId: "33959895618",
  appId: "1:33959895618:web:60be247696471fb57a43db",
  measurementId: "G-B1GQ31753T"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Firestore instance
const db = getFirestore(app);

export { db };
