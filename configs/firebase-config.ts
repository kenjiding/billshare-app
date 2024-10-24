import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: 'AIzaSyDXLxJQ0gDj4Ah0U6tvKHSXFNnfk78Mrlo',
    authDomain: 'splitmate-eta.firebaseapp.com',
    projectId: 'splitmate-eta',
    storageBucket: 'splitmate-eta.appspot.com',
    messagingSenderId: '611796211003',
    appId: '1:611796211003:web:600d4ce5bfd08c7820d31e'
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(firebase);

export { messaging, firebase };