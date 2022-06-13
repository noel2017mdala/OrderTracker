import {initializeApp} from "firebase/app";
import FIREBASE_CONFIG  from "./firebaseConfig";
import "firebase/auth";

const app = initializeApp(FIREBASE_CONFIG);

export const auth = app.auth();
export default app;