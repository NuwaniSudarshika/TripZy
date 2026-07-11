import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    } else {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      if (user) {
        const response = await axios.get(`http://localhost:5000/api/bookings/user/${user.id}`);
        setBookings(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  };

  if (!user) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <ThemedText style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</ThemedText>
            </View>
            <View>
              <ThemedText type="title" style={styles.name}>{user.name}</ThemedText>
              <ThemedText style={styles.email}>{user.email}</ThemedText>
            </View>
          </View>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Booking History</ThemedText>
          
          {bookings.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color="#CBD5E1" />
              <ThemedText style={styles.emptyText}>No bookings yet.</ThemedText>
            </View>
          ) : (
            bookings.map((booking: any) => (
              <View key={booking._id} style={styles.bookingCard}>
                <View style={styles.bookingHeader}>
                  <ThemedText style={styles.hotelName}>{booking.hotelName}</ThemedText>
                  <ThemedText style={styles.price}>${booking.totalPrice}</ThemedText>
                </View>
                <View style={styles.bookingDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons name="people-outline" size={16} color="#64748B" />
                    <ThemedText style={styles.detailText}>{booking.guests} Guests</ThemedText>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="calendar-outline" size={16} color="#64748B" />
                    <ThemedText style={styles.detailText}>
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </ThemedText>
                  </View>
                </View>
                <View style={styles.statusBadge}>
                  <ThemedText style={styles.statusText}>Confirmed</ThemedText>
                </View>
              </View>
            ))
          )}
        </View>

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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1D3D47',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1D3D47',
  },
  email: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D3D47',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  emptyText: {
    marginTop: 12,
    color: '#94A3B8',
    fontSize: 16,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D3D47',
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0284C7',
  },
  bookingDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    color: '#64748B',
    fontSize: 14,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#059669',
    fontSize: 12,
    fontWeight: '600',
  },
});
