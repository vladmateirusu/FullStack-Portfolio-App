import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { usePostsContext } from '../contexts/PostsContext';

export default function CreatePost() {
  const { addPost } = usePostsContext();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState('Ski');
  const [isPosting, setIsPosting] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Required', 'Permission to access photos is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handlePost = async () => {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a title for your post');
      return;
    }
    
    if (!content.trim()) {
      Alert.alert('Missing Content', 'Please enter some content for your post');
      return;
    }

    setIsPosting(true);

    try {
      const newPost = { 
        title: title.trim(), 
        content: content.trim(), 
        image: selectedImage,
        createdAt: new Date().toISOString()
      };
      
      addPost(category, newPost);
      
      // Reset form
      setTitle('');
      setContent('');
      setSelectedImage(null);
      
      // Show success message
      Alert.alert(
        'Post Created!', 
        `Your post has been added to the ${category} section successfully!`,
        [
          {
            text: 'Create Another',
            style: 'default'
          },
          {
            text: 'View Posts',
            style: 'default',
            onPress: () => {
              // You can add navigation to the "About Me" tab here if needed
              // navigation.navigate('About Me');
            }
          }
        ]
      );
      
    } catch (error) {
      Alert.alert('Error', 'Failed to create post. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create a New Post</Text>

      <View style={styles.categorySelector}>
        {['Ski', 'Moto', 'Hike'].map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            style={[
              styles.categoryButton,
              category === cat && styles.categoryButtonSelected,
            ]}
            disabled={isPosting}
          >
            <Text style={[
              styles.categoryButtonText,
              category === cat && styles.categoryButtonTextSelected
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={[styles.input, isPosting && styles.inputDisabled]}
        placeholder="Post Title"
        value={title}
        onChangeText={setTitle}
        maxLength={100}
        editable={!isPosting}
      />

      <TextInput
        style={[styles.textArea, isPosting && styles.inputDisabled]}
        placeholder="What's on your mind?"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={6}
        maxLength={500}
        editable={!isPosting}
      />

      <TouchableOpacity 
        style={[styles.imagePlaceholder, isPosting && styles.inputDisabled]} 
        onPress={pickImage}
        disabled={isPosting}
      >
        {selectedImage ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
            <TouchableOpacity 
              style={styles.changeImageButton}
              onPress={pickImage}
              disabled={isPosting}
            >
              <Text style={styles.changeImageText}>Change Image</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.imageText}>+ Add Image (Optional)</Text>
        )}
      </TouchableOpacity>

      <View style={styles.characterCount}>
        <Text style={styles.characterCountText}>
          Title: {title.length}/100 | Content: {content.length}/500
        </Text>
      </View>

      <TouchableOpacity 
        style={[
          styles.button,
          (!title.trim() || !content.trim() || isPosting) && styles.buttonDisabled
        ]} 
        onPress={handlePost}
        disabled={!title.trim() || !content.trim() || isPosting}
      >
        <Text style={styles.buttonText}>
          {isPosting ? 'Posting...' : `Post to ${category}`}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    color: '#999',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    textAlignVertical: 'top',
    fontSize: 16,
    height: 120,
    backgroundColor: '#fff',
  },
  imagePlaceholder: {
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  imageText: {
    color: '#888',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  changeImageText: {
    color: 'white',
    fontSize: 12,
  },
  characterCount: {
    marginBottom: 20,
  },
  characterCountText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007aff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  categorySelector: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  categoryButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryButtonSelected: {
    backgroundColor: '#007aff',
    borderColor: '#0056b3',
  },
  categoryButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  categoryButtonTextSelected: {
    color: 'white',
  },
});