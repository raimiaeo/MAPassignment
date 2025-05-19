import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  getDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const teamService = {
  // Create a new team
  async createTeam(teamData) {
    try {
      const docRef = await addDoc(collection(db, 'teams'), {
        ...teamData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  // Get all teams
  async getAllTeams() {
    try {
      const querySnapshot = await getDocs(collection(db, 'teams'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw error;
    }
  },

  // Get a specific team
  async getTeam(teamId) {
    try {
      const docRef = doc(db, 'teams', teamId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      }
      return null;
    } catch (error) {
      throw error;
    }
  },

  // Update a team
  async updateTeam(teamId, teamData) {
    try {
      const docRef = doc(db, 'teams', teamId);
      await updateDoc(docRef, {
        ...teamData,
        updatedAt: new Date()
      });
    } catch (error) {
      throw error;
    }
  },

  // Delete a team
  async deleteTeam(teamId) {
    try {
      const docRef = doc(db, 'teams', teamId);
      await deleteDoc(docRef);
    } catch (error) {
      throw error;
    }
  },

  // Get teams by coach
  async getTeamsByCoach(coachId) {
    try {
      const q = query(collection(db, 'teams'), where('coachId', '==', coachId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw error;
    }
  }
}; 