import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';

const { width, height } = Dimensions.get('window');

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Basic validation for demo
    if (email && password) {
      router.replace('/hotels');
    } else {
      Alert.alert('Error', 'Please enter both email and password');
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
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
          style={styles.overlay}
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/logoo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
            <ThemedText style={styles.subtitle}>Sign in to continue your journey</ThemedText>

            <View style={styles.form}>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#94A3B8" />
                <TextInput
                  placeholder="Email Address"
                  placeholderTextColor="#94A3B8"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity style={styles.forgotPass}>
                <ThemedText style={styles.forgotText}>Forgot Password?</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLogin} activeOpacity={0.8}>
                <LinearGradient
                  colors={['#A1CEDC', '#4facfe']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.button}
                >
                  <ThemedText style={styles.buttonText}>Sign In</ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <ThemedText style={styles.footerText}>Don't have an account? </ThemedText>
              <TouchableOpacity onPress={() => router.push('/signup')}>
                <ThemedText style={styles.signupText}>Sign Up</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 90,
    height: 90,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    marginBottom: 40,
  },
  form: {
    width: '100%',
    gap: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },
  forgotPass: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: '#A1CEDC',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#1D3D47',
    fontSize: 18,
    fontWeight: '800',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  footerText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 15,
  },
  signupText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
});