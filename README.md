# Todo App with Tabs, Drawer Navigation & Backend

A professional React Native Todo app built with Expo Router, featuring tab navigation, drawer navigation, and a complete backend API integration.

## 🚀 Features

- **Todo Management**: Create, edit, delete, and mark todos as complete
- **Tab Navigation**: Todos and Profile tabs with different content
- **Drawer Navigation**: Side drawer with the same functionality as tabs
- **Backend API**: Express.js server with RESTful endpoints for todos
- **Professional UI**: Modern, clean design with proper styling
- **Error Handling**: Comprehensive error handling and loading states
- **API Integration**: Real-time data fetching and updates
- **Priority System**: High, medium, and low priority todos
- **Statistics**: Todo completion stats in profile

## 📱 App Structure

```
app/
├── (drawer)/
│   ├── _layout.tsx          # Drawer navigation layout
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Tab navigation layout
│   │   ├── index.tsx        # Todos tab - Todo management
│   │   └── profile.tsx      # Profile tab - User settings & stats
│   └── profile.tsx          # Drawer profile screen
├── _layout.tsx              # Root layout
└── index.tsx                # Entry point

backend/
├── server.js                # Express.js server with todo endpoints
└── package.json             # Backend dependencies
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
# Install mobile app dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 2. Start the Backend Server

```bash
cd backend
npm start
```

The backend will run on `http://localhost:3000`

### 3. Start the Mobile App

```bash
# In the root directory
npm start
```

Then choose your platform:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser

## 🔧 Backend API Endpoints

### Health Check

- `GET /api/health` - Check if backend is running

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id/like` - Like a post

## 📱 App Features

### Home Tab

- **Posts Feed**: Displays posts from the backend
- **Like Functionality**: Tap heart to like posts
- **Pull to Refresh**: Swipe down to refresh content
- **Loading States**: Professional loading indicators
- **Error Handling**: User-friendly error messages

### Profile Tab

- **User Information**: Displays user data from backend
- **Settings Menu**: Account, notifications, privacy options
- **Support Section**: Help center, contact, about
- **Logout Functionality**: Secure logout with confirmation

### Drawer Navigation

- **Same Functionality**: Drawer provides same features as tabs
- **Professional Design**: Clean, modern drawer interface
- **Consistent Navigation**: Seamless experience between tabs and drawer

## 🎨 Design Features

- **Modern UI**: Clean, professional design
- **Consistent Styling**: Unified color scheme and typography
- **Responsive Layout**: Works on all screen sizes
- **Smooth Animations**: Native feel with proper transitions
- **Loading States**: Professional loading indicators
- **Error States**: User-friendly error handling

## 🔧 Technical Stack

### Frontend

- **React Native**: Cross-platform mobile development
- **Expo Router**: File-based navigation
- **TypeScript**: Type-safe development
- **React Navigation**: Tab and drawer navigation
- **Expo Vector Icons**: Professional iconography

### Backend

- **Express.js**: Node.js web framework
- **CORS**: Cross-origin resource sharing
- **Body Parser**: Request body parsing
- **RESTful API**: Standard HTTP methods

## 🚀 Getting Started for Beginners

This app is designed to be beginner-friendly while maintaining professional standards:

1. **Simple Structure**: Clear file organization
2. **Basic Code**: Easy to understand React patterns
3. **Professional Features**: Real-world functionality
4. **Good Practices**: Proper error handling and loading states
5. **Documentation**: Comprehensive comments and README

## 📝 Development Notes

- The app uses `http://localhost:3000` for API calls
- Make sure the backend is running before testing the app
- The app includes proper error handling for offline scenarios
- All components are properly typed with TypeScript
- The design follows modern mobile app patterns

## 🎯 Next Steps

- Add authentication system
- Implement real-time updates with WebSockets
- Add push notifications
- Include image upload functionality
- Add search and filtering features

## 📞 Support

If you encounter any issues:

1. Make sure both backend and frontend are running
2. Check that the API URL is correct in the app
3. Verify all dependencies are installed
4. Check the console for error messages

Happy coding! 🎉
