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
import { eventService } from '../services/eventService';
import { teamService } from '../services/teamService';

const EventEntriesScreen = () => {
  const [events, setEvents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    maxTeams: '',
    registrationDeadline: ''
  });

  useEffect(() => {
    loadEvents();
    loadTeams();
  }, []);

  const loadEvents = async () => {
    try {
      const eventsList = await eventService.getAllEvents();
      setEvents(eventsList);
    } catch (error) {
      Alert.alert('Error', 'Failed to load events');
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
      if (!formData.title || !formData.date || !formData.location) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      await eventService.createEvent(formData);
      Alert.alert('Success', 'Event created successfully');
      setFormData({
        title: '',
        date: '',
        location: '',
        description: '',
        maxTeams: '',
        registrationDeadline: ''
      });
      loadEvents();
    } catch (error) {
      Alert.alert('Error', 'Failed to create event');
    }
  };

  const handleTeamRegistration = async (eventId, teamId) => {
    try {
      await eventService.registerTeamForEvent(eventId, teamId);
      Alert.alert('Success', 'Team registered for event successfully');
      loadEvents();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
      <Text>Location: {item.location}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Max Teams: {item.maxTeams}</Text>
      <Text>Registration Deadline: {new Date(item.registrationDeadline).toLocaleDateString()}</Text>
      
      <View style={styles.registeredTeams}>
        <Text style={styles.subtitle}>Registered Teams:</Text>
        {item.registeredTeams?.map(teamId => {
          const team = teams.find(t => t.id === teamId);
          return team ? (
            <Text key={teamId} style={styles.teamName}>{team.name}</Text>
          ) : null;
        })}
      </View>

      <TouchableOpacity 
        style={styles.registerButton}
        onPress={() => {
          // Show team selection dialog
          Alert.alert(
            'Register Team',
            'Select a team to register',
            teams.map(team => ({
              text: team.name,
              onPress: () => handleTeamRegistration(item.id, team.id)
            }))
          );
        }}
      >
        <Text style={styles.registerButtonText}>Register Team</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Event</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Event Title *"
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD) *"
          value={formData.date}
          onChangeText={(text) => setFormData({ ...formData, date: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Location *"
          value={formData.location}
          onChangeText={(text) => setFormData({ ...formData, location: text })}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          multiline
          numberOfLines={4}
        />

        <TextInput
          style={styles.input}
          placeholder="Maximum Teams"
          value={formData.maxTeams}
          onChangeText={(text) => setFormData({ ...formData, maxTeams: text })}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Registration Deadline (YYYY-MM-DD)"
          value={formData.registrationDeadline}
          onChangeText={(text) => setFormData({ ...formData, registrationDeadline: text })}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create Event</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.subtitle}>Upcoming Events</Text>
        <FlatList
          data={events}
          renderItem={renderEventItem}
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
  eventItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  registeredTeams: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  teamName: {
    color: '#3498db',
    marginTop: 5,
  },
  registerButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EventEntriesScreen; 