import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';

const hotels = [
  {
    name: 'Hotel Sunshine',
    image: require('../assets/images/homepage1.jpg'),
  },
  {
    name: 'Ocean View Resort',
    image: require('../assets/images/homepage2.jpg'),
  },
  {
    name: 'Mountain Retreat',
    image: require('../assets/images/homepage3.jpg'),
  },
  {
    name: 'City Inn',
    image: require('../assets/images/homepage4.jpg'),
  },
  {
    name: 'Grand Palace Hotel',
    image: require('../assets/images/homepage5.jpg'),
  },
];

export default function HotelsPage() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Available Hotels
      </ThemedText>

      {hotels.map((hotel, index) => (
        <View key={index} style={styles.card}>
          <Image source={hotel.image} style={styles.image} />

          <View style={styles.cardContent}>
            <ThemedText type="subtitle" style={styles.hotelName}>
              {hotel.name}
            </ThemedText>

            <TouchableOpacity
              style={styles.bookButton}
              onPress={handleSignUp}
            >
              <ThemedText style={styles.bookText}>
                Book Now
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 15,
  },
  hotelName: {
    fontSize: 20,
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: '#A1CEDC',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookText: {
    color: '#1D3D47',
    fontSize: 16,
  },
});