/**
 * Firebase configuration object for the app.
 *
 * This object contains the necessary credentials and identifiers
 * to connect to the Firebase project.
 *
 * @property {string} apiKey - The API key for the Firebase project.
 * @property {string} authDomain - The authentication domain for the Firebase project.
 * @property {string} projectId - The unique identifier for the Firebase project.
 * @property {string} storageBucket - The storage bucket URL for the Firebase project.
 * @property {string} messagingSenderId - The sender ID for Firebase Cloud Messaging.
 * @property {string} appId - The unique identifier for the app instance.
 * @property {string} measurementId - The measurement ID for Google Analytics.
 */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyATv5Uzz_9QKefbO_GXQ3_GL1PVSv9xaaw",
  authDomain: "am-i-safe-61709.firebaseapp.com",
  projectId: "am-i-safe-61709",
  storageBucket: "am-i-safe-61709.firebasestorage.app",
  messagingSenderId: "906626025628",
  appId: "1:906626025628:web:213e4e3c2ba94d6f5dc559",
  measurementId: "G-NM5PR6LMQ4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
