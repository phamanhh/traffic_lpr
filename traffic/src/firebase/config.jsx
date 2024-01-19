import firebase from 'firebase'

const firebaseConfig = {
  "apiKey": "AIzaSyCODqolrMr_nkxSXP43NEDjnv-QB2P8BqE",
  "authDomain": "lpr-traffic.firebaseapp.com",
  "projectId": "lpr-traffic",
  "storageBucket": "lpr-traffic.appspot.com",
  "serviceAccout": "service_account.json"
};
firebase.initializeApp(firebaseConfig); 
const storage = firebase.storage();

export default storage;