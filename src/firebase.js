import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBH5RC4meaNX5FKFA8ABHDUz4O5UQ-IpcQ",
    authDomain: "todo-957a2.firebaseapp.com",
    projectId: "todo-957a2",
    storageBucket: "todo-957a2.appspot.com",
    messagingSenderId: "81937666808",
    appId: "1:81937666808:web:54290f9d2ced892f81a10d"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default  db;
