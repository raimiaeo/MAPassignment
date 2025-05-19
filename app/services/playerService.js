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

export const playerService = {
  // Add a new player
  async addPlayer(playerData) {
    try {
      const docRef = await addDoc(collection(db, 'players'), {
        ...playerData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  // Get all players
  async getAllPlayers() {
    try {
      const querySnapshot = await getDocs(collection(db, 'players'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw error;
    }
  },

  // Get players by team
  async getPlayersByTeam(teamId) {
    try {
      const q = query(collection(db, 'players'), where('teamId', '==', teamId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw error;
    }
  },

  // Get a specific player
  async getPlayer(playerId) {
    try {
      const docRef = doc(db, 'players', playerId);
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

  // Update a player
  async updatePlayer(playerId, playerData) {
    try {
      const docRef = doc(db, 'players', playerId);
      await updateDoc(docRef, {
        ...playerData,
        updatedAt: new Date()
      });
    } catch (error) {
      throw error;
    }
  },

  // Delete a player
  async deletePlayer(playerId) {
    try {
      const docRef = doc(db, 'players', playerId);
      await deleteDoc(docRef);
    } catch (error) {
      throw error;
    }
  }
}; 