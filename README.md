# 📱 Virtual Assistant for Fishermen

Welcome to the **Virtual Assistant for Fishermen** project! This React Native mobile application is designed to revolutionize the fishing industry by empowering artisanal fishermen with tools, data, and direct access to the market. Leveraging modern technologies like Firebase and external APIs, this app helps fishermen make informed and sustainable decisions while facilitating direct communication with buyers and consumers.

## 🚀 Features

- **Real-Time Data Integration**: Get accurate and up-to-date information on weather conditions and fish population trends through API integrations.
- **Sustainable Fishing Insights**: Access tools that help fishermen plan their activities based on real-time data, maximizing success and minimizing environmental impact.
- **Market Connectivity**: Fishermen can list their products on an online platform and negotiate directly with buyers, eliminating intermediaries and ensuring fair pricing.
- **Capture Management**: Track and record fishing activities, helping fishermen better manage resources and comply with sustainable practices.

## 🛠️ Technologies

This project uses the following key technologies:

- **React Native**: For building cross-platform mobile applications (iOS and Android).
- **Firebase**: For user authentication, real-time database, and cloud storage.
- **API Integrations**: For weather and marine condition data.
- **JavaScript**: For the frontend logic and dynamic app behavior.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [React Native CLI](https://reactnative.dev/docs/environment-setup) or [Expo CLI](https://expo.dev/)
- [Firebase Project](https://firebase.google.com/) with Authentication and Database enabled

## ⚙️ Setup & Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/virtual-assistant-for-fishermen.git
    cd virtual-assistant-for-fishermen
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Configure Firebase:
    - Create a new Firebase project.
    - Enable Authentication and Firestore Database.
    - Add your Firebase credentials in the `firebaseConfig.js` file.

4. Run the application:
    ```bash
    npx react-native run-android
    ```
    or
    ```bash
    npx react-native run-ios
    ```

## 🔧 Firebase Configuration

To set up Firebase, create a `firebaseConfig.js` file with the following structure:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
