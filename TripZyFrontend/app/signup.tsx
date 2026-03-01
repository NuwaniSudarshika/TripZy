import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';

export default function SignUpPage() {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Sign Up
      </ThemedText>

      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry />

      <TouchableOpacity style={styles.button}>
        <ThemedText type="defaultSemiBold" style={styles.buttonText}>
          Register
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
  },
  header: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#A1CEDC',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1D3D47',
    fontSize: 18,
  },
});