import React, { useEffect, useState, useRef } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient'; // For overlay gradient
import { Ionicons } from '@expo/vector-icons';

const images = [
  require('../../assets/images/homepage1.jpg'),
  require('../../assets/images/homepage2.jpg'),
  require('../../assets/images/homepage3.jpg'),
  require('../../assets/images/homepage4.jpg'),
  require('../../assets/images/homepage5.jpg'),
];

export default function HomeScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Change image every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        fadeAnim.setValue(1);
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    router.push('/hotels');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ImageBackground
          source={images[currentIndex]}
          style={styles.background}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
            style={styles.gradientOverlay}
          >
            <View style={styles.contentContainer}>
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../assets/images/logoo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              
              <ThemedText type="title" style={styles.title}>
                TripZy
              </ThemedText>
              
              <ThemedText style={styles.description}>
                Explore luxury stays and unforgettable experiences across the world.
              </ThemedText>

              <TouchableOpacity 
                activeOpacity={0.8}
                style={styles.button} 
                onPress={handleGetStarted}
              >
                <ThemedText style={styles.buttonText}>
                  Explore Now
                </ThemedText>
                <Ionicons name="arrow-forward" size={20} color="#1D3D47" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, width: '100%', height: '100%' },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 80,
  },
  contentContainer: {
    paddingHorizontal: 30,
  },
  logoContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backdropFilter: 'blur(10px)',
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 56,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 12,
    letterSpacing: -1,
  },
  description: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 40,
    lineHeight: 28,
  },
  button: {
    backgroundColor: '#A1CEDC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonText: {
    color: '#1D3D47',
    fontSize: 18,
    fontWeight: '800',
  },
});