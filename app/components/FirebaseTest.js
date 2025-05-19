import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { auth, db } from '../config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const FirebaseTest = () => {
  const [testResult, setTestResult] = useState('');
  const [error, setError] = useState('');

  const testFirebaseConnection = async () => {
    try {
      // Test Firestore connection
      const testCollection = collection(db, 'test');
      await addDoc(testCollection, {
        message: 'Test connection',
        timestamp: new Date()
      });
      
      const querySnapshot = await getDocs(testCollection);
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setTestResult('Firebase connection successful!');
      console.log('Test documents:', documents);
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Firebase test error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Connection Test</Text>
      
      <Button 
        title="Test Firebase Connection" 
        onPress={testFirebaseConnection}
      />

      {testResult ? (
        <Text style={styles.success}>{testResult}</Text>
      ) : null}

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  success: {
    color: 'green',
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
});

export default FirebaseTest; 