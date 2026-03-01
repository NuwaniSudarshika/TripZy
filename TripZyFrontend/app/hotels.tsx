import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';

const hotels = [
  'Hotel Sunshine',
  'Ocean View Resort',
  'Mountain Retreat',
  'City Inn',
  'Grand Palace Hotel'
];

export default function HotelsPage() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/signup'); // Navigate to signup page
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Available Hotels
      </ThemedText>

      {hotels.map((hotel, index) => (
        <ThemedText key={index} type="subtitle" style={styles.hotel}>
          {hotel}
        </ThemedText>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <ThemedText type="defaultSemiBold" style={styles.buttonText}>
          Sign Up
        </ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    marginBottom: 24,
  },
  hotel: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#A1CEDC',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 32,
  },
  buttonText: {
    color: '#1D3D47',
    fontSize: 18,
  },
});