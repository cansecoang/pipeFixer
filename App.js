//import * as React from 'react';
import React from 'react';


import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Alert} from 'react-native';
import {BlurView} from 'expo-blur';

import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';

// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const uri = 'https://media.istockphoto.com/id/153699849/photo/water-splash.jpg?s=612x612&w=0&k=20&c=Z885-_iFcybYPL7jHMHEHEBL3CM27O8k4xYabKrsYQg='
const profilePicture = 'https://www.un.org/pga/wp-content/uploads/sites/51/2017/08/dummy-profile.jpg'


function  HomeScreen() {
return (
  <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
    <Text >Home Screen</Text>
  </View>
)
};

function  LoginScreen() {

  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  /*const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });*/

  const handleCreateAccount = () =>{
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=> {
      console.log('Account created!')
      const user = userCredential.user;
      console.log(user);
    })
    .catch(error => {
      console.log(error)
      Alert.alert(error.message)

    })
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=> {
      console.log('Signed in!')
      const user = userCredential.user;
      console.log(user)
      navigation.navigate('Home');
    })
    .catch(error => {
      console.log(error)
    })
  };

  return (
    //<NavigationContainer>{}</NavigationContainer>
  <View style={styles.container}>

  <Image source={{uri}} style={[styles.image, StyleSheet.absoluteFill]}></Image>

  

  <ScrollView contentContainerStyle = {{
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }}>

    <BlurView intensity={90}>
      <View style={styles.login}>
        <Image source={{uri: profilePicture}} style={styles.profilePicture}></Image>

        <View >
          <Text style={styles.texts}>E-mail</Text>
          <TextInput onChangeText={(text)=> setEmail(text)} style={styles.inputText} placeholder='correo@electronico.com'></TextInput>
        </View>
        <View >
          <Text style={styles.texts}>Password</Text>
          <TextInput onChangeText={(text)=> setPassword(text)} style={styles.inputText} placeholder='********' secureTextEntry={true}></TextInput>
        </View>
        
        <TouchableOpacity onPress={handleSignIn} style={[styles.button,{backgroundColor: '#00CFEB90'}]}>
          <Text style={styles.texts}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCreateAccount} style={[styles.button,{backgroundColor: '#6792F090'}]}>
          <Text style={styles.texts}>Create account</Text>
        </TouchableOpacity>


      </View>
    </BlurView>
  </ScrollView>
  </View>

  )
  };

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    //<LoginScreen />
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  login: {
    width: 350,
    height: 500,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 30
  },
  texts: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',

  },
  inputText: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth:2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20
  },
  button: {
    width:250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
  }
});


