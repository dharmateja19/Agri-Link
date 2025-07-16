// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCYLCOTz_U1BtCv5NTe9K9B-evzKb98mMA",
//   authDomain: "agrilink-56f0c.firebaseapp.com",
//   projectId: "agrilink-56f0c",
//   storageBucket: "agrilink-56f0c.firebasestorage.app",
//   messagingSenderId: "889562341938",
//   appId: "1:889562341938:web:19a47aca562af2cb31922b",
//   measurementId: "G-93GMXW40JG"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCYLCOTz_U1BtCv5NTe9K9B-evzKb98mMA",
//   authDomain: "agrilink-56f0c.firebaseapp.com",
//   projectId: "agrilink-56f0c",
//   storageBucket: "agrilink-56f0c.appspot.com",
//   messagingSenderId: "889562341938",
//   appId: "1:889562341938:web:19a47aca562af2cb31922b"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export { auth};


// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYLCOTz_U1BtCv5NTe9K9B-evzKb98mMA",
  authDomain: "agrilink-56f0c.firebaseapp.com",
  projectId: "agrilink-56f0c",
  storageBucket: "agrilink-56f0c.appspot.com",
  messagingSenderId: "889562341938",
  appId: "1:889562341938:web:19a47aca562af2cb31922b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Export auth and OTP tools
export { auth, RecaptchaVerifier, signInWithPhoneNumber };
