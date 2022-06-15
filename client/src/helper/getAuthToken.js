import firebase from "../firebase/firebase";

const getAuthToken = async () => {
  let token = await firebase.auth().currentUser.getIdToken();
  console.log(token);
};


export default getAuthToken;