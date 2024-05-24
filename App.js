import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


import { login, logout } from "./auth.js";
const buttonLogin = document.querySelector("#button-login");
const buttonLogout = document.querySelector("#button-logout");
const todoForm = document.querySelector("#todo-form");
let currentUser;
firebase.auth().onAuthStateChanged( user => {
     if (user){
      currentUser = user;
      console.log("Usuario logeado", currentUser.displayName);
     Init();
    }else{
        console.log("No hay usuario logeado");
     }
});


buttonLogin.addEventListener("click", async e => {
  try {
    currentUser = await login();
  } catch (error) {
    
  }

});

buttonLogout.addEventListener("click",  e => {
  
  logout();
});

function init(){
  buttonLogin.classList.add('hidden');
  buttonLogin.classList.remove('hidden');
}