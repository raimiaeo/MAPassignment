import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import TeamRegistrationScreen from '../screens/TeamRegistrationScreen';
import EventEntriesScreen from '../screens/EventEntriesScreen';
import PlayerManagementScreen from '../screens/PlayerManagementScreen';
import NewsFeedScreen from '../screens/NewsFeedScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Teams':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Events':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Players':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'News':
              iconName = focused ? 'newspaper' : 'newspaper-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="Teams" 
        component={TeamRegistrationScreen}
        options={{ title: 'Teams' }}
      />
      <Tab.Screen 
        name="Events" 
        component={EventEntriesScreen}
        options={{ title: 'Events' }}
      />
      <Tab.Screen 
        name="Players" 
        component={PlayerManagementScreen}
        options={{ title: 'Players' }}
      />
      <Tab.Screen 
        name="News" 
        component={NewsFeedScreen}
        options={{ title: 'News' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Main" 
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 