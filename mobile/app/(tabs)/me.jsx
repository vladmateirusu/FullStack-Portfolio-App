import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { usePostsContext } from '../contexts/PostsContext';

const { width, height } = Dimensions.get('window');

const images = [
  require('../../assets/images/i1.jpeg'), // Ski
  require('../../assets/images/i2.jpeg'), // Moto
  require('../../assets/images/i3.jpeg'), // Hike
];

const titles = ['Ski', 'Moto', 'Hike'];

const ImageSwitcher = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.imageContainer}>
      <Image source={images[index]} style={styles.image} />
      <View style={styles.featuredOverlay}>
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredBadgeText}>Most Viewed</Text>
        </View>
        <Text style={styles.featuredTitle}>{titles[index]}</Text>
      </View>
    </View>
  );
};

const PostCard = ({ post, onDelete }) => (
  <View style={styles.postCard}>
    {post.image && (
      <Image source={{ uri: post.image }} style={styles.postImage} />
    )}
    <View style={styles.postContent}>
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <TouchableOpacity onPress={() => onDelete(post.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>×</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.postText}>{post.content}</Text>
      {post.createdAt && (
        <Text style={styles.postDate}>
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>
      )}
    </View>
  </View>
);

export default function MeScreen() {
  const { posts, deletePost } = usePostsContext();
  const [categorySelected, setCategorySelected] = useState('');
  
  const scrollViewRef = useRef(null);
  const skiRef = useRef(null);
  const motoRef = useRef(null);
  const hikeRef = useRef(null);

  const scrollToRef = (ref) => {
    ref?.current?.measureLayout(
      scrollViewRef.current,
      (x, y) => {
        scrollViewRef.current.scrollTo({ y, animated: true });
      }
    );
  };

  const handleDeletePost = (category, postId) => {
    deletePost(category, postId);
  };

  const renderCategorySection = (category, ref) => (
    <View ref={ref} style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {category} Section ({posts[category].length})
        </Text>
      </View>
      
      {posts[category].length > 0 ? (
        <FlatList
          data={posts[category]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => 
            <PostCard 
              post={item} 
              onDelete={(postId) => handleDeletePost(category, postId)}
            />
          }
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.emptyText}>
          No posts yet. Go to "Create Post" tab to add your first {category.toLowerCase()} post!
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView ref={scrollViewRef}>
        <ImageSwitcher />

        {/* Category Buttons */}
        <View style={styles.categoryContainer}>
          {titles.map((title, i) => {
            const refMap = [skiRef, motoRef, hikeRef];
            return (
              <TouchableOpacity
                key={title}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      categorySelected === title ? 'red' : 'blue'
                  }
                ]}
                onPress={() => {
                  setCategorySelected(title);
                  scrollToRef(refMap[i]);
                }}
              >
                <Text style={styles.categoryButtonText}>
                  {title} ({posts[title].length})
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Category Sections */}
        {renderCategorySection('Ski', skiRef)}
        {renderCategorySection('Moto', motoRef)}
        {renderCategorySection('Hike', hikeRef)}
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  emptyText: {
    color: 'lightgray',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  postCard: {
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  postContent: {
    padding: 15,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  postTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'rgba(255,0,0,0.8)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postText: {
    color: 'lightgray',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  postDate: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
});