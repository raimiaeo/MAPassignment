import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  getDoc,
  orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const eventService = {
  // Create a new event
  async createEvent(eventData) {
    try {
      const docRef = await addDoc(collection(db, 'events'), {
        ...eventData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  // Get all events
  async getAllEvents() {
    try {
      const q = query(collection(db, 'events'), orderBy('date', 'asc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw error;
    }
  },

  // Get upcoming events
  async getUpcomingEvents() {
    try {
      const now = new Date();
      const q = query(
        collection(db, 'events'),
        where('date', '>=', now),
        orderBy('date', 'asc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw error;
    }
  },

  // Get a specific event
  async getEvent(eventId) {
    try {
      const docRef = doc(db, 'events', eventId);
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

  // Update an event
  async updateEvent(eventId, eventData) {
    try {
      const docRef = doc(db, 'events', eventId);
      await updateDoc(docRef, {
        ...eventData,
        updatedAt: new Date()
      });
    } catch (error) {
      throw error;
    }
  },

  // Delete an event
  async deleteEvent(eventId) {
    try {
      const docRef = doc(db, 'events', eventId);
      await deleteDoc(docRef);
    } catch (error) {
      throw error;
    }
  },

  // Register a team for an event
  async registerTeamForEvent(eventId, teamId) {
    try {
      const eventRef = doc(db, 'events', eventId);
      const eventDoc = await getDoc(eventRef);
      
      if (!eventDoc.exists()) {
        throw new Error('Event not found');
      }

      const eventData = eventDoc.data();
      const registeredTeams = eventData.registeredTeams || [];
      
      if (registeredTeams.includes(teamId)) {
        throw new Error('Team already registered for this event');
      }

      await updateDoc(eventRef, {
        registeredTeams: [...registeredTeams, teamId],
        updatedAt: new Date()
      });
    } catch (error) {
      throw error;
    }
  }
}; 