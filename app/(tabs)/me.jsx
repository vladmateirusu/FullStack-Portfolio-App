import { SafeAreaView, View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import  { useState, useEffect } from 'react';

const { width, height } = Dimensions.get('window');

const images=[
  require('../../assets/images/i1.jpeg'),
  require('../../assets/images/i2.jpeg'),
  require('../../assets/images/i3.jpeg'),
]

const  ImageSwitcher = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length); 
    }, 3000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <View style={styles.imageContainer}>
      <Image
        source={images[index]}
        style={styles.image}
      />
      <View style={styles.featuredOverlay}>
        <Text style={styles.featuredBadgeText}>Hello</Text>
      </View>
    </View>
  );
};

export default function meScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageSwitcher />
    </SafeAreaView>
  )
};

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
  },
  image: {
    height: 200,
    width: 250,
    borderRadius: 20,

  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
   // backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "space-between",
    padding: 20,
  },
  featuredBadgeText: {
    color: 'red',
    fontSize: 12,
    fontWeight: "600",
  },

});