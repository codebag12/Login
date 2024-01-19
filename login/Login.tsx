import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {UserContext} from './context/UserContext';
import {useCredentials} from './hooks/useCredentials';
import tw from 'twrnc';
import {login} from './api/auth';

// This is a login component that allows users to enter their username and password and attempt to log in.
export const Login = ({navigation}) => {
  // Import necessary dependencies and custom hooks
  const {
    pass123,
    setPassword,
    password,
    setUsername,
    user123,
    username,
    users,
  } = useCredentials();
  

  // Function to handle login attempt
  const handleLogin = async (user, pass) => {
    //login();

    // console.log("handle login function ");

    // Iterate through the list of users
    for (let i of users) {
      // Check if the entered username and password match any user in the list
      if (i.username1 === user && i.password1 === pass) {
        navigation.navigate('Home')
        //console.log('login successful');
        // Set background color of username and password inputs to green
        user123.current.setNativeProps({style:{backgroundColor:'green'}})
        pass123.current.setNativeProps({style:{backgroundColor:'green'}})
        return true;
      }
    }

    console.log('login failed');
    // Set background color of username and password inputs to red
    user123.current.setNativeProps({style:{backgroundColor:'red'}})
    pass123.current.setNativeProps({style:{backgroundColor:'red'}})
    return false;
  };

  // Function to validate the entered username
  const validateUsername = (username: string) =>
    username.split(' ').join('').toLowerCase();

  // Function to check if the username is valid and update the UI accordingly
  const isUserNameValid = (valid: boolean) => {
    if (valid) {
      user123.current.setNativeProps({style: {backgroundColor: 'green'}});
      pass123.current.setNativeProps({style: {backgroundColor: 'green'}});
    } else {
      user123.current.setNativeProps({style: {backgroundColor: 'red'}});
      pass123.current.setNativeProps({style: {backgroundColor: 'red'}});
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center p-5`}>
      <Text style={styles.title}> Login Page</Text>

      <Text>Your Username</Text>
      <TextInput
        style={styles.input}
        ref={user123}
        onChangeText={setUsername}
        value={username}
      />

      <Text>password</Text>
      <TextInput
        style={styles.passwordInput}
        ref={pass123}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          handleLogin(username, password);
        }}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
// Styling for the login component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 10,
    paddingLeft: 10,
  },
  passwordInput: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 30,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
