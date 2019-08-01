/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Loading from './loading';
import firebase from 'firebase';
console.disableYellowBox = true;
import './global';
var config = {
    apiKey: "AIzaSyC5AbOuCjjvWMHM4aptQo63CCrC8pgmwtc",
    authDomain: "unipool-26b08.firebaseapp.com",
    databaseURL: "https://unipool-26b08.firebaseio.com",
    projectId: "unipool-26b08",
    storageBucket: "unipool-26b08.appspot.com",
    messagingSenderId: "962016352059"
  };
firebase.initializeApp(config);

AppRegistry.registerComponent(appName, () => Loading);

