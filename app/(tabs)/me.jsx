import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

const { width, height } = Dimensions.get('window');

const images = [
  require('../../assets/images/i1.jpeg'), // Ski
  require('../../assets/images/i2.jpeg'), // Moto
  require('../../assets/images/i3.jpeg'), // Hike
];

const titles = ['Ski', 'Moto', 'Hike'];

const  ImageSwitcher = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length); 
    }, 2000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <View style={styles.imageContainer}>
      <Image
        source={images[index]}
        style={styles.image}
      />
      <View style={styles.featuredOverlay}>
        <View style={styles.featuredBadge}>
        <Text style={styles.featuredBadgeText}>Most Viewed</Text>
        </View>
        <Text style={styles.featuredTitle}>{titles[index]}</Text>
      </View>
    </View>
  );
};

export default function MeScreen() {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const scrollViewRef = useRef(null);
  const skiRef = useRef(null);
  const motoRef = useRef(null);
  const hikeRef = useRef(null);

  const animateFade = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateFade();
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % images.length;
        animateFade();
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToRef = (ref) => {
    ref?.current?.measureLayout(
      scrollViewRef.current,
      (x, y) => {
        scrollViewRef.current.scrollTo({ y, animated: true });
      }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView ref={scrollViewRef}>
        <ImageSwitcher index={index} fadeAnim={fadeAnim} />

        {/* Category Buttons */}
        <View style={styles.categoryContainer}>
          {titles.map((title, i) => {
            const refMap = [skiRef, motoRef, hikeRef];
            return (
              <TouchableOpacity
                key={title}
                style={styles.categoryButton}
                onPress={() => scrollToRef(refMap[i])}
              >
                <Text style={styles.categoryButtonText}>{title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Category Sections */}
        <View ref={skiRef} style={styles.section}>
          <Text style={styles.sectionTitle}>Ski Section</Text>
          <Text style={styles.sectionContent}>All about skiing...</Text>
        </View>

        <View ref={motoRef} style={styles.section}>
          <Text style={styles.sectionTitle}>Moto Section</Text>
          <Text style={styles.sectionContent}>All about motorcycles...</Text>
        </View>

        <View ref={hikeRef} style={styles.section}>
          <Text style={styles.sectionTitle}>Hike Section</Text>
          <Text style={styles.sectionContent}>All about hiking...</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    width: 250,
    marginTop: 50,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  image: {
    height: 200,
    width: 250,
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 20,
  },
  featuredBadgeText: {
    color: 'red',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredBadge: {
    backgroundColor: 'cyan',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
    flexWrap: 'wrap',
  },
  categoryButton: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
  },
  categoryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  section: {
    marginTop: 50,
    padding: 20,
    backgroundColor: '#222',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    color: 'lightgray',
    fontSize: 16,
  },
});
