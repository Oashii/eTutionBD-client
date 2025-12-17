import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config.js';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };


  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };


  const logInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };


  const logOut = () => {
    return signOut(auth);
  };


  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Get token from localStorage
          const token = localStorage.getItem('token');
          
          // If we have a token, fetch user details from the server
          if (token) {
            const response = await fetch('http://localhost:5000/api/auth/me', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            
            if (response.ok) {
              const data = await response.json();
              setUser({
                displayName: currentUser.displayName,
                email: currentUser.email,
                photoURL: currentUser.photoURL,
                uid: currentUser.uid,
                role: data.user.role,
              });
              localStorage.setItem('role', data.user.role);
              setLoading(false);
              return;
            }
          }
          
          // Fallback to localStorage role
          const role = localStorage.getItem('role') || 'Student';
          setUser({
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
            role: role
          });
        } catch (error) {
          console.error('Error fetching user role:', error);
          const role = localStorage.getItem('role') || 'Student';
          setUser({
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
            role: role
          });
        }
      } else {
        setUser(null);
        localStorage.removeItem('role');
        localStorage.removeItem('token');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    updateUser,
    logIn,
    logInWithGoogle,
    logOut,
    resetPassword,
    loading,
    setLoading
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
