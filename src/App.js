import * as React from "react";
import firebase from "firebase";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
import logo from './logo.svg';
import './App.css';

export const App = () => {
  return (
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
      
          <button
            onClick={() => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().signInWithPopup(googleAuthProvider);
            }}
          >
            Sign In with Google
          </button>

          <button
            onClick={() => {
              firebase.auth().signOut();
            }}
          >
            Sign Out
          </button>

          <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
              return (
                <pre style={{ height: 300, overflow: "auto" }}>
                  {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
                </pre>
              );
            }}
          </FirebaseAuthConsumer>

          <div>
          
            <IfFirebaseAuthedAnd
              filter={({ providerId }) => providerId !== "anonymous"}
            >
              {({ providerId }) => {
                return <div>You are authenticated with {providerId}</div>;
              }}
            </IfFirebaseAuthedAnd>

          </div>
        </header>
      </div>
    </FirebaseAuthProvider>
  );
};
export default App;