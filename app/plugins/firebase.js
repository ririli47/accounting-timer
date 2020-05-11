import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyANfnGAKZqnGBnnIOkLLWH6-RhMCNpTiGo',
  authDomain: 'meteor-2de65.firebaseapp.com',
  databaseURL: 'https://meteor-2de65.firebaseio.com',
  projectId: 'meteor-2de65',
  storageBucket: 'meteor-2de65.appspot.com',
  messagingSenderId: '284743984432',
  appId: '1:284743984432:web:6ca89ddd4f81461ca054f5',
  measurementId: 'G-8Z76RKVF6N'
}

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

export default firebase
