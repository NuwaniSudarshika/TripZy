import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';

export default function BookingScreen() {
  const router = useRouter();
  const [guests, setGuests] = useState(1);

  const handleConfirm = () => {
    Alert.alert(
      'Booking Confirmed!',
      'Your stay at TripZy has been booked successfully.',
      [{ text: 'OK', onPress: () => router.push('/hotels') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#1D3D47" />
        </TouchableOpacity>
        <ThemedText type="subtitle" style={styles.headerTitle}>Complete Booking</ThemedText>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionLabel}>Full Name</ThemedText>
          <TextInput 
            style={styles.input}
            placeholder="John Doe"
            placeholderTextColor="#94A3B8"
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionLabel}>Email Address</ThemedText>
          <TextInput 
            style={styles.input}
            placeholder="john@example.com"
            keyboardType="email-address"
            placeholderTextColor="#94A3B8"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.section, { flex: 1 }]}>
            <ThemedText style={styles.sectionLabel}>Guests</ThemedText>
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => setGuests(Math.max(1, guests - 1))}>
                <Ionicons name="remove-circle-outline" size={28} color="#1D3D47" />
              </TouchableOpacity>
              <ThemedText style={styles.counterText}>{guests}</ThemedText>
              <TouchableOpacity onPress={() => setGuests(guests + 1)}>
                <Ionicons name="add-circle-outline" size={28} color="#1D3D47" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.summary}>
          <ThemedText style={styles.summaryTitle}>Price Summary</ThemedText>
          <View style={styles.summaryRow}>
            <ThemedText style={styles.summaryLabel}>Stay (3 nights)</ThemedText>
            <ThemedText style={styles.summaryValue}>$360</ThemedText>
          </View>
          <View style={styles.summaryRow}>
            <ThemedText style={styles.summaryLabel}>Service fee</ThemedText>
            <ThemedText style={styles.summaryValue}>$24</ThemedText>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <ThemedText style={styles.totalLabel}>Total</ThemedText>
            <ThemedText style={styles.totalValue}>$384</ThemedText>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <ThemedText style={styles.confirmButtonText}>Confirm & Pay</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D3D47',
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1D3D47',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  counterText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D3D47',
  },
  summary: {
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 20,
    marginTop: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D3D47',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#64748B',
    fontSize: 15,
  },
  summaryValue: {
    color: '#1D3D47',
    fontWeight: '600',
    fontSize: 15,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1D3D47',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1D3D47',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  confirmButton: {
    backgroundColor: '#1D3D47',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
