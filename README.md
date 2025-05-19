# Namibia Hockey Union Mobile App

A comprehensive mobile application for managing hockey teams, players, events, and news in Namibia.

## Features

### 1. Team Management
- Register new teams with details like:
  - Team name
  - Coach information
  - Division
  - Contact details
- View all registered teams
- Edit team information
- Delete teams

### 2. Player Management
- Register players with:
  - Personal information (name, DOB)
  - Position and jersey number
  - Team assignment
  - Contact details
- View all registered players
- Edit player information
- Delete players

### 3. Event Management
- Create new events with:
  - Event title and description
  - Date and location
  - Maximum team capacity
  - Registration deadline
- Register teams for events
- View upcoming events
- Track registered teams for each event

### 4. News Feed
- Post news updates with:
  - Title and content
  - Optional images
  - Timestamp
- View latest news
- Edit news posts
- Delete news items

## Technical Details

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd NamibiaHockeyApp
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project
   - Enable Firestore Database
   - Add your Firebase configuration to `app/config/firebase.js`

4. Start the development server:
```bash
npx expo start
```

### Project Structure
```
NamibiaHockeyApp/
├── app/
│   ├── config/
│   │   └── firebase.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── TeamRegistrationScreen.js
│   │   ├── EventEntriesScreen.js
│   │   ├── PlayerManagementScreen.js
│   │   └── NewsScreen.js
│   └── services/
│       ├── teamService.js
│       ├── playerService.js
│       ├── eventService.js
│       └── newsService.js
├── assets/
└── package.json
```

### Dependencies
- React Native
- Expo
- React Navigation
- Firebase
- Ionicons

## Usage

1. **Team Registration**
   - Navigate to the Teams tab
   - Fill in team details
   - Submit to register a new team

2. **Player Registration**
   - Go to the Players tab
   - Enter player information
   - Select a team
   - Submit to register a new player

3. **Event Creation**
   - Access the Events tab
   - Fill in event details
   - Set registration deadline
   - Create the event

4. **News Updates**
   - Visit the News tab
   - Write news content
   - Add optional images
   - Post the update

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For support, please contact [support email/contact]

## License

This project is licensed under the MIT License - see the LICENSE file for details. 