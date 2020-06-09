import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Swal from "sweetalert2";
//Firebase Things
import firebase from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/firebase-auth";
import "firebase/firebase-functions";
import "firebase/firebase-storage";

Vue.config.productionTip = false;
var config = {
  apiKey: "AIzaSyB1-M9-CjEIycMpW5_vz4L2YRh-6D_Z3Tc",
  authDomain: "pasalavoz-sv.firebaseapp.com",
  databaseURL: "https://pasalavoz-sv.firebaseio.com",
  projectId: "pasalavoz-sv",
  storageBucket: "pasalavoz-sv.appspot.com",
  messagingSenderId: "626221695676",
  appId: "1:626221695676:web:891ad344934c11e53886b9",
  measurementId: "G-CMLC5MKN30",
};

firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const especialAuth = firebase.auth;
export const functions = firebase.functions();
export const storage = firebase.storage();
export const swal2 = Swal;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
