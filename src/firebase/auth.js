import { auth } from "./firebase"; // Ensure this is your firebase initialization file
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  signOut, // Import signOut from firebase/auth
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";

// Create user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in with email and password
export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign in with Google
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  // Add user to Firestore (optional)
  return user; // Return the user object if needed
};

// Sign in with Facebook
export const doSignInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  // Add user to Firestore (optional)
  return user; // Return the user object if needed
};

// Sign in with Twitter
export const doSignInWithTwitter = async () => {
  const provider = new TwitterAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  // Add user to Firestore (optional)
  return user; // Return the user object if needed
};

// Sign out
export const doSignOut = async () => {
  return signOut(auth); // Call the imported signOut function
};

// Send password reset email
export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Change password
export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

// Send email verification
export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}`, // Update this URL as necessary
  });
};
