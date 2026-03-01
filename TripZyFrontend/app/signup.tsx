import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';

export default function SignUpPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Create Account
      </ThemedText>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button}>
        <ThemedText type="defaultSemiBold" style={styles.buttonText}>
          Register
        </ThemedText>
      </TouchableOpacity>

      {/* Back to Login */}
      <TouchableOpacity onPress={() => router.push('/dashboard')}>
        <ThemedText style={styles.loginText}>
          Already have an account? Login
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F5F7FA',
  },
  header: {
    fontSize: 32,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#A1CEDC',
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1D3D47',
    fontSize: 18,
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#1D3D47',
  },
});