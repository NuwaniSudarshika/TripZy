import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function LoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Simulate login validation
  const handleLogin = () => {
    if (email === 'user@example.com' && password === '123456') {
      // Redirect to Dashboard
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Invalid credentials', 'Please check your email and password');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../assets/images/homepage5.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <View style={styles.box}>
          <Image
            source={require('../assets/images/logoo.png')}
            style={styles.logo}
          />

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Please login to continue</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Icon name="email" size={20} color="#555" style={styles.icon} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#555"
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#555" style={styles.icon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#555"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity style={{ width: '100%' }} onPress={handleLogin}>
            <LinearGradient
              colors={['#007BFF', '#00C6FF']}
              style={styles.button}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Signup Redirect */}
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signup}>
              Don't have an account? <Text style={{ fontWeight: 'bold' }}>Sign Up</Text>
            </Text>
          </TouchableOpacity>

          <Text style={styles.forgot}>Forgot Password?</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },

  box: {
    width: '85%',
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingVertical: 40,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },

  logo: { width: 100, height: 100, borderRadius: 50, marginBottom: 15, borderWidth: 2, borderColor: '#007BFF' },

  title: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 5 },

  subtitle: { fontSize: 14, color: '#555', marginBottom: 20 },

  inputContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 15 },

  icon: { marginRight: 10 },

  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  button: { paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 5, marginBottom: 10 },

  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  forgot: { color: '#007BFF', marginTop: 10, fontSize: 14 },

  signup: { marginTop: 10, color: '#555', fontSize: 14 },
});