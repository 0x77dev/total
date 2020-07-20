import { firebase, firebaseConfig } from "../firebase";

export const initFirebase = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
};

export default initFirebase;
