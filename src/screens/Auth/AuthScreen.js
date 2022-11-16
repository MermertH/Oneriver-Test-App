import React from 'react';
import {signIn} from '../../config/firebase';
import {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

const AuthScreen = ({navigation}) => {
  const [userMail, setUserMail] = useState('');
  const [password, setPassword] = useState('');

  const signInCheck = () => {
    if (userMail !== '' && password !== '') {
      signIn(userMail, password)
        .then(() => {
          navigation.navigate('Tabs');
        })
        .catch(e => {
          alert(signInErrorMessage(e));
        });
    } else {
      alert('Username or password cannot be blank!');
    }
  };

  const signInErrorMessage = error => {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'Email adress is not valid!';
      case 'auth/user-not-found':
        return 'there is no user corresponding to the given email.';
      case 'auth/wrong-password':
        return 'Password is not valid!';
      default:
        return 'Unknown error occured';
    }
  };

  return (
    <View style={styles.scaffold}>
      <Image
        style={styles.image}
        source={require('OneriverApp/src/images/auth/oneriver_icon.png')}
      />
      <Text style={styles.welcomeText}>Welcome to Oneriver</Text>
      <View>
        <Text style={styles.textInputEmailLabel}>E-Mail</Text>
        <TextInput
          style={styles.textInput}
          value={userMail}
          onChangeText={text => setUserMail(text)}
        />
      </View>
      <View>
        <Text style={styles.textInputPasswordLabel}>Password</Text>
        <TextInput
          style={styles.textInput}
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginbutton}
        onPress={() => signInCheck()}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scaffold: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 192,
    height: 192,
    marginBottom: 10,
  },
  welcomeText: {
    color: '#1A4184',
    fontSize: 24,
  },
  textInputEmailLabel: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'left',
    fontSize: 20,
    color: '#000000',
    opacity: 0.63,
  },
  textInputPasswordLabel: {
    marginVertical: 10,
    textAlign: 'left',
    fontSize: 20,
    color: '#000000',
    opacity: 0.63,
  },
  textInput: {
    backgroundColor: '#D9D9D9',
    width: 307,
    height: 50,
    borderRadius: 10,
    color: 'black',
    paddingLeft: 10,
  },
  loginbutton: {
    marginTop: 30,
    borderRadius: 10,
    width: 171,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A4184',
  },
  loginButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default AuthScreen;
