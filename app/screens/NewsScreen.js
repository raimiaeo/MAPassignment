import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
  Image
} from 'react-native';
import { newsService } from '../services/newsService';

const NewsScreen = () => {
  const [news, setNews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const newsList = await newsService.getAllNews();
      setNews(newsList);
    } catch (error) {
      Alert.alert('Error', 'Failed to load news');
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.title || !formData.content) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      await newsService.createNews(formData);
      Alert.alert('Success', 'News posted successfully');
      setFormData({
        title: '',
        content: '',
        imageUrl: ''
      });
      loadNews();
    } catch (error) {
      Alert.alert('Error', 'Failed to post news');
    }
  };

  const handleDelete = async (newsId) => {
    try {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this news item?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              await newsService.deleteNews(newsId);
              loadNews();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to delete news item');
    }
  };

  const renderNewsItem = ({ item }) => {
    return (
      <View style={styles.newsItem}>
        {item.imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.newsImage}
            resizeMode="cover"
          />
        )}
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsContent}>{item.content}</Text>
        <Text style={styles.newsDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        
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
        <Text style={styles.title}>Post News</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Title *"
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
        />

        <TextInput
          style={[styles.input, styles.contentInput]}
          placeholder="Content *"
          value={formData.content}
          onChangeText={(text) => setFormData({ ...formData, content: text })}
          multiline
          numberOfLines={4}
        />

        <TextInput
          style={styles.input}
          placeholder="Image URL (optional)"
          value={formData.imageUrl}
          onChangeText={(text) => setFormData({ ...formData, imageUrl: text })}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Post News</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.subtitle}>Latest News</Text>
        <FlatList
          data={news}
          renderItem={renderNewsItem}
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
  contentInput: {
    height: 100,
    textAlignVertical: 'top',
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
  newsItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  newsContent: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 10,
  },
  newsDate: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 10,
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

export default NewsScreen; 