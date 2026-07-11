import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';

// ─── Pricing Constants ───────────────────────────────────────────────────────
const FOOD_PRICES: Record<string, number> = {
  none: 0,
  breakfast: 15,
  halfBoard: 35,
  fullBoard: 60,
};

const BED_LABELS: Record<string, string> = {
  single: 'Single Bed',
  double: 'Double Bed',
  king: 'King Bed',
};

const FOOD_LABELS: Record<string, string> = {
  none: 'No Meals',
  breakfast: 'Breakfast Only',
  halfBoard: 'Half Board',
  fullBoard: 'Full Board',
};

const BED_ICONS: Record<string, string> = {
  single: 'bed-outline',
  double: 'bed-outline',
  king: 'star-outline',
};

// ─── Counter Component ────────────────────────────────────────────────────────
function Counter({ label, value, onInc, onDec, min = 1, max = 10 }: any) {
  return (
    <View style={counterStyles.wrapper}>
      <ThemedText style={counterStyles.label}>{label}</ThemedText>
      <View style={counterStyles.row}>
        <TouchableOpacity
          style={[counterStyles.btn, value <= min && counterStyles.btnDisabled]}
          onPress={onDec}
          disabled={value <= min}
        >
          <Ionicons name="remove" size={18} color={value <= min ? '#CBD5E1' : '#1D3D47'} />
        </TouchableOpacity>
        <ThemedText style={counterStyles.value}>{value}</ThemedText>
        <TouchableOpacity
          style={[counterStyles.btn, value >= max && counterStyles.btnDisabled]}
          onPress={onInc}
          disabled={value >= max}
        >
          <Ionicons name="add" size={18} color={value >= max ? '#CBD5E1' : '#1D3D47'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Option Card ──────────────────────────────────────────────────────────────
function OptionCard({ label, sublabel, selected, onPress, icon }: any) {
  return (
    <TouchableOpacity
      style={[optStyles.card, selected && optStyles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon}
        size={22}
        color={selected ? '#fff' : '#64748B'}
        style={{ marginBottom: 6 }}
      />
      <ThemedText style={[optStyles.label, selected && optStyles.labelSelected]}>{label}</ThemedText>
      {sublabel ? (
        <ThemedText style={[optStyles.sub, selected && optStyles.subSelected]}>{sublabel}</ThemedText>
      ) : null}
    </TouchableOpacity>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ icon, title }: any) {
  return (
    <View style={secStyles.row}>
      <View style={secStyles.iconWrap}>
        <Ionicons name={icon} size={18} color="#1D3D47" />
      </View>
      <ThemedText style={secStyles.title}>{title}</ThemedText>
    </View>
  );
}

// ─── Main Booking Screen ───────────────────────────────────────────────────────
export default function BookingScreen() {
  const router = useRouter();
  const { hotelId, hotelName, price } = useLocalSearchParams();
  const { user } = useContext(AuthContext);

  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [nights, setNights] = useState(1);
  const [bedType, setBedType] = useState<'single' | 'double' | 'king'>('double');
  const [foodService, setFoodService] = useState<'none' | 'breakfast' | 'halfBoard' | 'fullBoard'>('none');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const basePrice = Number(price || 0) * rooms * nights;
  const foodCost = FOOD_PRICES[foodService] * guests * nights;
  const serviceFee = Math.round(basePrice * 0.08); // 8% service fee
  const taxes = Math.round(basePrice * 0.12); // 12% taxes
  const totalPrice = basePrice + foodCost + serviceFee + taxes;

  const checkInDate = new Date();
  const checkOutDate = new Date();
  checkOutDate.setDate(checkOutDate.getDate() + nights);

  const handleConfirm = async () => {
    if (!user) {
      Alert.alert('Error', 'Please log in to book.');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        userId: user.id,
        hotelId: hotelId as string,
        hotelName: hotelName as string,
        totalPrice,
        guests,
        rooms,
        bedType,
        foodService,
        specialRequests,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
      });

      Alert.alert(
        '🎉 Booking Confirmed!',
        `Your stay at ${hotelName} is booked!\n\nTotal: $${totalPrice}\nCheck-in: ${checkInDate.toDateString()}\nCheck-out: ${checkOutDate.toDateString()}`,
        [{ text: 'View My Bookings', onPress: () => router.push('/profile') }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to complete booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#1D3D47" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Complete Booking</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ── Hotel Banner ── */}
        <LinearGradient colors={['#1D3D47', '#2d5f6e']} style={styles.hotelBanner}>
          <Ionicons name="business" size={28} color="rgba(255,255,255,0.7)" />
          <View style={{ marginLeft: 14, flex: 1 }}>
            <ThemedText style={styles.bannerName}>{hotelName}</ThemedText>
            <ThemedText style={styles.bannerPrice}>${price} / night per room</ThemedText>
          </View>
        </LinearGradient>

        {/* ── Guest Info ── */}
        <View style={styles.card}>
          <SectionHeader icon="person-outline" title="Guest Information" />
          <View style={styles.infoRow}>
            <Ionicons name="person-circle-outline" size={16} color="#64748B" />
            <ThemedText style={styles.infoText}>{user?.name}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={16} color="#64748B" />
            <ThemedText style={styles.infoText}>{user?.email}</ThemedText>
          </View>
        </View>

        {/* ── Stay Details ── */}
        <View style={styles.card}>
          <SectionHeader icon="calendar-outline" title="Stay Details" />
          <View style={styles.countersRow}>
            <Counter
              label="Rooms"
              value={rooms}
              onInc={() => setRooms(r => Math.min(10, r + 1))}
              onDec={() => setRooms(r => Math.max(1, r - 1))}
            />
            <Counter
              label="Guests"
              value={guests}
              onInc={() => setGuests(g => Math.min(20, g + 1))}
              onDec={() => setGuests(g => Math.max(1, g - 1))}
            />
            <Counter
              label="Nights"
              value={nights}
              onInc={() => setNights(n => Math.min(30, n + 1))}
              onDec={() => setNights(n => Math.max(1, n - 1))}
            />
          </View>
          <View style={styles.dateRow}>
            <View style={styles.dateBox}>
              <ThemedText style={styles.dateLabel}>Check-in</ThemedText>
              <ThemedText style={styles.dateValue}>{checkInDate.toDateString()}</ThemedText>
            </View>
            <Ionicons name="arrow-forward" size={18} color="#94A3B8" />
            <View style={[styles.dateBox, { alignItems: 'flex-end' }]}>
              <ThemedText style={styles.dateLabel}>Check-out</ThemedText>
              <ThemedText style={styles.dateValue}>{checkOutDate.toDateString()}</ThemedText>
            </View>
          </View>
        </View>

        {/* ── Bed Type ── */}
        <View style={styles.card}>
          <SectionHeader icon="bed-outline" title="Bed Preference" />
          <View style={styles.optionsGrid}>
            {(['single', 'double', 'king'] as const).map(type => (
              <OptionCard
                key={type}
                label={BED_LABELS[type]}
                sublabel={type === 'king' ? '+$20/night' : type === 'double' ? '+$10/night' : null}
                icon={BED_ICONS[type]}
                selected={bedType === type}
                onPress={() => setBedType(type)}
              />
            ))}
          </View>
        </View>

        {/* ── Food Service ── */}
        <View style={styles.card}>
          <SectionHeader icon="restaurant-outline" title="Food & Dining" />
          <View style={styles.optionsGrid}>
            {(['none', 'breakfast', 'halfBoard', 'fullBoard'] as const).map(food => (
              <OptionCard
                key={food}
                label={FOOD_LABELS[food]}
                sublabel={FOOD_PRICES[food] > 0 ? `+$${FOOD_PRICES[food]}/guest/night` : 'Included'}
                icon={food === 'none' ? 'close-circle-outline' : 'restaurant-outline'}
                selected={foodService === food}
                onPress={() => setFoodService(food)}
              />
            ))}
          </View>
        </View>

        {/* ── Special Requests ── */}
        <View style={styles.card}>
          <SectionHeader icon="chatbubble-outline" title="Special Requests" />
          <TextInput
            style={styles.textArea}
            placeholder="E.g. Late check-in, baby cot, high floor room..."
            placeholderTextColor="#94A3B8"
            value={specialRequests}
            onChangeText={setSpecialRequests}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* ── Price Summary ── */}
        <View style={styles.summaryCard}>
          <ThemedText style={styles.summaryTitle}>Price Summary</ThemedText>
          <View style={styles.divider} />

          <SummaryRow label={`Room(s) (${rooms} × $${price} × ${nights} nights)`} value={`$${basePrice}`} />
          {foodCost > 0 && (
            <SummaryRow label={`${FOOD_LABELS[foodService]} (${guests} guests × ${nights} nights)`} value={`$${foodCost}`} />
          )}
          <SummaryRow label="Service Fee (8%)" value={`$${serviceFee}`} />
          <SummaryRow label="Taxes (12%)" value={`$${taxes}`} />

          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <ThemedText style={styles.totalLabel}>Total</ThemedText>
            <ThemedText style={styles.totalValue}>${totalPrice}</ThemedText>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ── Footer ── */}
      <View style={styles.footer}>
        <View style={styles.footerTotal}>
          <ThemedText style={styles.footerTotalLabel}>Total Amount</ThemedText>
          <ThemedText style={styles.footerTotalValue}>${totalPrice}</ThemedText>
        </View>
        <TouchableOpacity
          style={[styles.confirmButton, isSubmitting && styles.confirmButtonDisabled]}
          onPress={handleConfirm}
          disabled={isSubmitting}
          activeOpacity={0.85}
        >
          <LinearGradient colors={['#1D3D47', '#2d5f6e']} style={styles.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Ionicons name={isSubmitting ? 'hourglass-outline' : 'checkmark-circle-outline'} size={22} color="#fff" />
            <ThemedText style={styles.confirmButtonText}>
              {isSubmitting ? 'Processing...' : 'Confirm & Pay'}
            </ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <ThemedText style={styles.summaryLabel}>{label}</ThemedText>
      <ThemedText style={styles.summaryValue}>{value}</ThemedText>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const counterStyles = StyleSheet.create({
  wrapper: { alignItems: 'center', flex: 1 },
  label: { fontSize: 12, color: '#64748B', fontWeight: '600', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  btn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  btnDisabled: { backgroundColor: '#F8FAFC', borderColor: '#F1F5F9' },
  value: { fontSize: 20, fontWeight: '800', color: '#1D3D47', minWidth: 30, textAlign: 'center' },
});

const optStyles = StyleSheet.create({
  card: {
    flex: 1, borderRadius: 14, padding: 14, borderWidth: 1.5, borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC', alignItems: 'center', minHeight: 90,
  },
  cardSelected: { backgroundColor: '#1D3D47', borderColor: '#1D3D47' },
  label: { fontSize: 12, fontWeight: '700', color: '#475569', textAlign: 'center' },
  labelSelected: { color: '#fff' },
  sub: { fontSize: 10, color: '#94A3B8', marginTop: 2, textAlign: 'center' },
  subSelected: { color: 'rgba(255,255,255,0.7)' },
});

const secStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  iconWrap: {
    width: 34, height: 34, borderRadius: 10, backgroundColor: '#EFF6FF',
    justifyContent: 'center', alignItems: 'center', marginRight: 10,
  },
  title: { fontSize: 16, fontWeight: '700', color: '#1D3D47' },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1D3D47' },
  content: { padding: 16 },

  hotelBanner: {
    flexDirection: 'row', alignItems: 'center', borderRadius: 18,
    padding: 20, marginBottom: 16,
  },
  bannerName: { color: '#fff', fontSize: 18, fontWeight: '800' },
  bannerPrice: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 2 },

  card: {
    backgroundColor: '#fff', borderRadius: 18, padding: 20,
    marginBottom: 16, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05,
    shadowRadius: 8, elevation: 2,
  },

  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  infoText: { color: '#475569', fontSize: 15 },

  countersRow: { flexDirection: 'row', gap: 16, marginBottom: 20 },

  dateRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#F8FAFC', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#E2E8F0',
  },
  dateBox: {},
  dateLabel: { fontSize: 12, color: '#94A3B8', fontWeight: '600', marginBottom: 4 },
  dateValue: { fontSize: 14, fontWeight: '700', color: '#1D3D47' },

  optionsGrid: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },

  textArea: {
    backgroundColor: '#F8FAFC', borderRadius: 14, padding: 16,
    fontSize: 14, color: '#1D3D47', borderWidth: 1, borderColor: '#E2E8F0',
    minHeight: 100, textAlignVertical: 'top',
  },

  summaryCard: {
    backgroundColor: '#fff', borderRadius: 18, padding: 20, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  summaryTitle: { fontSize: 18, fontWeight: '800', color: '#1D3D47', marginBottom: 16 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'flex-start' },
  summaryLabel: { color: '#64748B', fontSize: 13, flex: 1, marginRight: 8 },
  summaryValue: { color: '#1D3D47', fontWeight: '600', fontSize: 14 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  totalLabel: { fontSize: 18, fontWeight: '800', color: '#1D3D47' },
  totalValue: { fontSize: 22, fontWeight: '800', color: '#1D3D47' },

  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff', padding: 16, paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    borderTopWidth: 1, borderTopColor: '#F1F5F9',
    flexDirection: 'row', alignItems: 'center', gap: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06, shadowRadius: 10, elevation: 12,
  },
  footerTotal: { flex: 1 },
  footerTotalLabel: { fontSize: 12, color: '#94A3B8', fontWeight: '600' },
  footerTotalValue: { fontSize: 22, fontWeight: '800', color: '#1D3D47' },
  confirmButton: { flex: 2, borderRadius: 14, overflow: 'hidden' },
  confirmButtonDisabled: { opacity: 0.6 },
  gradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16 },
  confirmButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
