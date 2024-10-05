import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Create AuthContext
const AuthContext = React.createContext();

// Custom hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component to manage auth state
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

  // Define your admin emails here
  const adminEmails = React.useMemo(() => ["dhiyanesh0704@gmail.com"], []); // Memoized to avoid unnecessary re-creation

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setUsername(user.displayName || user.email);
        setUserLoggedIn(true);

        // Check if the user is an admin
        if (adminEmails.includes(user.email)) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setCurrentUser(null);
        setUsername("");
        setUserLoggedIn(false);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, [adminEmails]); // Add `adminEmails` to the dependency array

  // Logout function
  function logout() {
    return signOut(auth);
  }

  // Value provided to AuthContext consumers
  const value = {
    userLoggedIn,
    currentUser,
    username,
    logout,
    isAdmin, // Add admin status to the context
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
