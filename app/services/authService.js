import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const authService = {
  // Register a new user
  async register(email, password, displayName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // Sign in an existing user
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // Sign out the current user
  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  },

  // Get the current user
  getCurrentUser() {
    return auth.currentUser;
  }
}; 