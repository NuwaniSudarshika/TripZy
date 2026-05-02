import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ThemedText } from './themed-text';

const categories = ['All', 'Luxury', 'Budget', 'Resort', 'City', 'Boutique'];

export function CategoryFilter() {
  const [selected, setSelected] = useState('All');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          onPress={() => setSelected(cat)}
          style={[
            styles.item,
            selected === cat && styles.selectedItem,
          ]}
        >
          <ThemedText
            style={[
              styles.text,
              selected === cat && styles.selectedText,
            ]}
          >
            {cat}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedItem: {
    backgroundColor: '#1D3D47',
    borderColor: '#1D3D47',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedText: {
    color: '#fff',
  },
});
