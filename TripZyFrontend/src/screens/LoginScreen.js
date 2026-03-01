import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import API from '../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await API.post('/auth/login', { email, password });
    alert("Login Success");
    navigation.navigate("Home");
  };

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={login} />
    </View>
  );
}