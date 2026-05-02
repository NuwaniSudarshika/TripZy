import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const hotelsData: any = {
  '1': {
    name: 'Hotel Sunshine',
    location: 'Mirissa, Sri Lanka',
    price: '$120',
    rating: 4.8,
    reviews: 124,
    description: 'Experience the perfect blend of luxury and comfort at Hotel Sunshine. Located just steps away from the pristine Mirissa beach, our hotel offers breathtaking ocean views and world-class amenities.',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Beach Access', 'Breakfast'],
    image: require('../../assets/images/homepage1.jpg'),
  },
  '2': {
    name: 'Ocean View Resort',
    location: 'Galle, Sri Lanka',
    price: '$250',
    rating: 4.9,
    reviews: 89,
    description: 'A luxurious sanctuary in the heart of Galle. Ocean View Resort provides an unparalleled experience with its colonial architecture and modern luxury.',
    amenities: ['Fine Dining', 'Infinity Pool', 'Gym', 'Guided Tours'],
    image: require('../../assets/images/homepage2.jpg'),
  },
  // Add more as needed
};

export default function HotelDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const hotel = hotelsData[id as string] || hotelsData['1'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={hotel.image} style={styles.image} />
          <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.6)']}
            style={styles.gradient}
          />
          <SafeAreaView style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.favButton}>
              <Ionicons name="heart-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View>
              <ThemedText type="title" style={styles.name}>{hotel.name}</ThemedText>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={16} color="#64748B" />
                <ThemedText style={styles.location}>{hotel.location}</ThemedText>
              </View>
            </View>
            <View style={styles.ratingBox}>
              <ThemedText style={styles.ratingText}>{hotel.rating}</ThemedText>
              <Ionicons name="star" size={14} color="#fff" />
            </View>
          </View>

          <View style={styles.divider} />

          <ThemedText type="subtitle" style={styles.sectionTitle}>Description</ThemedText>
          <ThemedText style={styles.description}>{hotel.description}</ThemedText>

          <ThemedText type="subtitle" style={styles.sectionTitle}>Amenities</ThemedText>
          <View style={styles.amenitiesGrid}>
            {hotel.amenities.map((item: string) => (
              <View key={item} style={styles.amenityItem}>
                <Ionicons name="checkmark-circle" size={18} color="#A1CEDC" />
                <ThemedText style={styles.amenityText}>{item}</ThemedText>
              </View>
            ))}
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <ThemedText style={styles.footerPrice}>{hotel.price}</ThemedText>
          <ThemedText style={styles.footerSub}>per night</ThemedText>
        </View>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => router.push('/booking')}
        >
          <ThemedText style={styles.bookButtonText}>Book Now</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 400,
    width: width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#fff',
    marginTop: -32,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1D3D47',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  location: {
    color: '#64748B',
    fontSize: 14,
  },
  ratingBox: {
    backgroundColor: '#1D3D47',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D3D47',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 24,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '45%',
  },
  amenityText: {
    color: '#475569',
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 24,
    paddingBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  footerPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1D3D47',
  },
  footerSub: {
    fontSize: 12,
    color: '#64748B',
  },
  bookButton: {
    backgroundColor: '#1D3D47',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
