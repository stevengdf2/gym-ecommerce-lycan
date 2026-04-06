import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración secreta oficial (GymPro)
const firebaseConfig = {
  apiKey: "AIzaSyC1z1tb6YfUlH7pAZ8VNfMq1jPS58IkyE4",
  authDomain: "gympro-1a182.firebaseapp.com",
  projectId: "gympro-1a182",
  storageBucket: "gympro-1a182.firebasestorage.app",
  messagingSenderId: "445776800640",
  appId: "1:445776800640:web:0709c60ed544fd64f26f65",
  measurementId: "G-DNV1J8T6B5" // Opcional, pero incluido para compatibilidad
};

// ¡Encendiendo los motores de Firebase!
const app = initializeApp(firebaseConfig);

// Nuestra puerta de conexión a la Base de Datos
export const db = getFirestore(app);
