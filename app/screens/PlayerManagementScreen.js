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
import { playerService } from '../services/playerService';
import { teamService } from '../services/teamService';

const PlayerManagementScreen = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    position: '',
    jerseyNumber: '',
    teamId: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    loadPlayers();
    loadTeams();
  }, []);

  const loadPlayers = async () => {
    try {
      const playersList = await playerService.getAllPlayers();
      setPlayers(playersList);
    } catch (error) {
      Alert.alert('Error', 'Failed to load players');
    }
  };

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
      if (!formData.firstName || !formData.lastName || !formData.teamId) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      await playerService.addPlayer(formData);
      Alert.alert('Success', 'Player registered successfully');
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        position: '',
        jerseyNumber: '',
        teamId: '',
        email: '',
        phone: ''
      });
      loadPlayers();
    } catch (error) {
      Alert.alert('Error', 'Failed to register player');
    }
  };

  const handleDelete = async (playerId) => {
    try {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this player?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              await playerService.deletePlayer(playerId);
              loadPlayers();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to delete player');
    }
  };

  const renderPlayerItem = ({ item }) => {
    const team = teams.find(t => t.id === item.teamId);
    return (
      <View style={styles.playerItem}>
        <Text style={styles.playerName}>{item.firstName} {item.lastName}</Text>
        <Text>Team: {team ? team.name : 'No Team'}</Text>
        <Text>Position: {item.position}</Text>
        <Text>Jersey Number: {item.jerseyNumber}</Text>
        <Text>Date of Birth: {new Date(item.dateOfBirth).toLocaleDateString()}</Text>
        <Text>Contact: {item.email}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.editButton]}
            onPress={() => {
              // TODO: Implement edit functionality
              Alert.alert('Coming Soon', 'Edit functionality will be available soon');
            }}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Player Registration</Text>
        
        <TextInput
          style={styles.input}
          placeholder="First Name *"
          value={formData.firstName}
          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name *"
          value={formData.lastName}
          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD)"
          value={formData.dateOfBirth}
          onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Position"
          value={formData.position}
          onChangeText={(text) => setFormData({ ...formData, position: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Jersey Number"
          value={formData.jerseyNumber}
          onChangeText={(text) => setFormData({ ...formData, jerseyNumber: text })}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            Alert.alert(
              'Select Team',
              'Choose a team',
              teams.map(team => ({
                text: team.name,
                onPress: () => setFormData({ ...formData, teamId: team.id })
              }))
            );
          }}
        >
          <Text style={formData.teamId ? styles.selectedTeam : styles.placeholder}>
            {formData.teamId 
              ? teams.find(t => t.id === formData.teamId)?.name 
              : 'Select Team *'}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register Player</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.subtitle}>Registered Players</Text>
        <FlatList
          data={players}
          renderItem={renderPlayerItem}
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
  selectedTeam: {
    color: '#2c3e50',
  },
  placeholder: {
    color: '#999',
  },
  submitButton: {
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
  playerItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: '#f39c12',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
});

export default PlayerManagementScreen; 