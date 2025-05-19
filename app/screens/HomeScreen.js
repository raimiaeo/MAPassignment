import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FirebaseTest from '../components/FirebaseTest';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Namibia Hockey Union</Text>
        
        {/* Firebase Test Component */}
        <FirebaseTest />
        
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('TeamRegistration')}
          >
            <Text style={styles.menuText}>Team Registration</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('EventEntries')}
          >
            <Text style={styles.menuText}>Event Entries</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('PlayerManagement')}
          >
            <Text style={styles.menuText}>Player Management</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('NewsFeed')}
          >
            <Text style={styles.menuText}>News & Updates</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2c3e50',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  menuItem: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HomeScreen; 