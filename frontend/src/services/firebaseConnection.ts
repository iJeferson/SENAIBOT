
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOxyIvc7aSXq89gST_9ZVnNXtbMRqT6Hw",
  authDomain: "inpi-9eed2.firebaseapp.com",
  projectId: "inpi-9eed2",
  storageBucket: "inpi-9eed2.firebasestorage.app",
  messagingSenderId: "355830801756",
  appId: "1:355830801756:web:4b5ff37373dd9e2f9f4d99"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
