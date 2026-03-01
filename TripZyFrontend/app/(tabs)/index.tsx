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
      <StatusBar hidden />
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ImageBackground
          source={images[currentIndex]}
          style={styles.background}
          resizeMode="cover"
        >
          {/* Gradient Overlay */}
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)']}
            style={styles.gradientOverlay}
          >
            <View style={styles.contentContainer}>
              {/* Logo */}
              <Image
                source={require('../../assets/images/logoo.png')}
                style={styles.logo}
                resizeMode="cover"
              />
              {/* Project Title */}
              <ThemedText type="title" style={styles.title}>
                TripZy
              </ThemedText>
              {/* Description */}
              <ThemedText type="subtitle" style={styles.description}>
                Explore the best hotels, plan your trips, and enjoy your stay with ease.
              </ThemedText>
              {/* CTA Button */}
              <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                  Get Started
                </ThemedText>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 65, // circle
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  title: {
    fontSize: 42,
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 2,
  },
  description: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 28,
    maxWidth: 350,
  },
  button: {
    backgroundColor: '#A1CEDC',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#1D3D47',
    fontSize: 20,
  },
});