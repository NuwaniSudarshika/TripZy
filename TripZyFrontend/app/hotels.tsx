import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { HotelCard } from '@/components/HotelCard';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';

const hotelsData = [
  {
    id: '1',
    name: 'Hotel Sunshine',
    location: 'Mirissa, Sri Lanka',
    price: '$120',
    rating: 4.8,
    image: require('../assets/images/homepage1.jpg'),
  },
  {
    id: '2',
    name: 'Ocean View Resort',
    location: 'Galle, Sri Lanka',
    price: '$250',
    rating: 4.9,
    image: require('../assets/images/homepage2.jpg'),
  },
  {
    id: '3',
    name: 'Mountain Retreat',
    location: 'Ella, Sri Lanka',
    price: '$80',
    rating: 4.5,
    image: require('../assets/images/homepage3.jpg'),
  },
  {
    id: '4',
    name: 'City Inn',
    location: 'Colombo, Sri Lanka',
    price: '$60',
    rating: 4.2,
    image: require('../assets/images/homepage4.jpg'),
  },
  {
    id: '5',
    name: 'Grand Palace',
    location: 'Kandy, Sri Lanka',
    price: '$180',
    rating: 4.7,
    image: require('../assets/images/homepage5.jpg'),
  },
];

export default function HotelsPage() {
  const router = useRouter();

  const handlePress = (id: string) => {
    router.push({
      pathname: '/details/[id]',
      params: { id }
    } as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            Discover
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Find your perfect stay
          </ThemedText>
        </View>

        <SearchBar />
        <CategoryFilter />

        <View style={styles.hotelsContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Top Destinations
          </ThemedText>
          {hotelsData.map((hotel) => (
            <HotelCard
              key={hotel.id}
              name={hotel.name}
              location={hotel.location}
              price={hotel.price}
              rating={hotel.rating}
              image={hotel.image}
              onPress={() => handlePress(hotel.id)}
            />
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1D3D47',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1D3D47',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  hotelsContainer: {
    alignItems: 'center',
  },
});