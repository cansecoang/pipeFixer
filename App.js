import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { BlurView } from 'expo-blur';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebaseConfig } from './firebaseConfig';
//import { launchCamera } from 'react-native-image-picker';


// Constantes de URLs
const uri = 'https://media.istockphoto.com/id/153699849/photo/water-splash.jpg?s=612x612&w=0&k=20&c=Z885-_iFcybYPL7jHMHEHEBL3CM27O8k4xYabKrsYQg=';
const profilePicture = 'https://www.un.org/pga/wp-content/uploads/sites/51/2017/08/dummy-profile.jpg';

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function HomeScreen() {
  const [reportType, setReportType] = useState(null);

  const openCamera = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        console.log('Image captured successfully:', response.assets[0].uri);
        Alert.alert('Captura Exitosa', 'Imagen capturada con éxito.');
      }
    });
  };

  const openReportWindow = () => {
    Alert.alert(
      'Tipo de Reporte',
      'Elige el tipo de reporte:',
      [
        { text: 'Tubería Rota', onPress: () => setReportType('Tubería Rota') },
        { text: 'Fuga de Agua', onPress: () => setReportType('Fuga de Agua') },
        { text: 'Cancelar', style: 'cancel' }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Elige tu rol:</Text>
      <Button title="Enviar" onPress={openReportWindow} />
      {reportType && (
        <View style={styles.reportContainer}>
          <Text style={styles.reportText}>Has seleccionado: {reportType}</Text>
          <Button title="Tomar Foto" onPress={openCamera} />
        </View>
      )}
    </View>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('Account created!');
        const user = userCredential.user;
        console.log(user);
      })
      .catch(error => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('Signed in!');
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <BlurView intensity={90}>
          <View style={styles.login}>
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
            <View>
              <Text style={styles.texts}>E-mail</Text>
              <TextInput
                onChangeText={text => setEmail(text)}
                style={styles.inputText}
                placeholder='correo@electronico.com'
                value={email}
              />
            </View>
            <View>
              <Text style={styles.texts}>Password</Text>
              <TextInput
                onChangeText={text => setPassword(text)}
                style={styles.inputText}
                placeholder='********'
                secureTextEntry={true}
                value={password}
              />
            </View>
            <TouchableOpacity onPress={handleSignIn} style={[styles.button, { backgroundColor: '#00CFEB90' }]}>
              <Text style={styles.texts}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, { backgroundColor: '#6792F090' }]}>
              <Text style={styles.texts}>Create account</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
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
    resizeMode: 'cover',
  },
  scrollViewContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginVertical: 30,
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
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  reportContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  reportText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
