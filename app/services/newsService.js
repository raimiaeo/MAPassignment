import { db } from '../config/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';

const COLLECTION_NAME = 'news';

export const newsService = {
  // Create a new news item
  createNews: async (newsData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...newsData,
        createdAt: new Date().toISOString()
      });
      return { id: docRef.id, ...newsData };
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  },

  // Get all news items, sorted by creation date
  getAllNews: async () => {
    try {
      const newsQuery = query(
        collection(db, COLLECTION_NAME),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(newsQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting news:', error);
      throw error;
    }
  },

  // Delete a news item
  deleteNews: async (newsId) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, newsId));
    } catch (error) {
      console.error('Error deleting news:', error);
      throw error;
    }
  },

  // Update a news item
  updateNews: async (newsId, newsData) => {
    try {
      const newsRef = doc(db, COLLECTION_NAME, newsId);
      await updateDoc(newsRef, {
        ...newsData,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating news:', error);
      throw error;
    }
  }
}; 