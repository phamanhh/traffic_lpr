import firebase from 'firebase'

const firebaseConfig = {
  "apiKey": "AIzaSyAlqF1_JPWxAPrcOKSSpjveEBks2aaGKso",
  "authDomain": "lpr-data-9983a.firebaseapp.com",
  "projectId": "lpr-data-9983a",
  "storageBucket": "lpr-data-9983a.appspot.com",
  "serviceAccout": "service_account.json"
};

firebase.initializeApp(firebaseConfig); 
const storage = firebase.storage();

export default storage;