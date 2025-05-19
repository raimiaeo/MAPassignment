import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView
} from 'react-native';
import { teamService } from '../services/teamService';

const TeamRegistrationScreen = () => {
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    coach: '',
    division: '',
    contactEmail: '',
    contactPhone: ''
  });

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const teamsList = await teamService.getAllTeams();
      setTeams(teamsList);
    } catch (error) {
      Alert.alert('Error', 'Failed to load teams');
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.coach || !formData.division) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      await teamService.createTeam(formData);
      Alert.alert('Success', 'Team registered successfully');
      setFormData({
        name: '',
        coach: '',
        division: '',
        contactEmail: '',
        contactPhone: ''
      });
      loadTeams();
    } catch (error) {
      Alert.alert('Error', 'Failed to register team');
    }
  };

  const renderTeamItem = ({ item }) => (
    <View style={styles.teamItem}>
      <Text style={styles.teamName}>{item.name}</Text>
      <Text>Coach: {item.coach}</Text>
      <Text>Division: {item.division}</Text>
      <Text>Contact: {item.contactEmail}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Team Registration</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Team Name *"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Coach Name *"
          value={formData.coach}
          onChangeText={(text) => setFormData({ ...formData, coach: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Division *"
          value={formData.division}
          onChangeText={(text) => setFormData({ ...formData, division: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Contact Email"
          value={formData.contactEmail}
          onChangeText={(text) => setFormData({ ...formData, contactEmail: text })}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Contact Phone"
          value={formData.contactPhone}
          onChangeText={(text) => setFormData({ ...formData, contactPhone: text })}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register Team</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.subtitle}>Registered Teams</Text>
        <FlatList
          data={teams}
          renderItem={renderTeamItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 20,
  },
  list: {
    marginTop: 10,
  },
  teamItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
});

export default TeamRegistrationScreen; 