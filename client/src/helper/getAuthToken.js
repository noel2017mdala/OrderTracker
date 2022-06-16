import firebase from "../firebase/firebase";

const getAuthToken = async () => {
  let token = await firebase.auth().currentUser.getIdToken();
  return token;
};

export default getAuthToken;
