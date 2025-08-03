// contexts/PostsContext.js
import React, { createContext, useContext, useState } from 'react';

const PostsContext = createContext();

export const usePostsContext = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePostsContext must be used within a PostsProvider');
  }
  return context;
};

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState({
    Ski: [],
    Moto: [],
    Hike: []
  });

  const addPost = (category, newPost) => {
    setPosts(prevPosts => ({
      ...prevPosts,
      [category]: [...prevPosts[category], { ...newPost, id: Date.now().toString() }]
    }));
  };

  const deletePost = (category, postId) => {
    setPosts(prevPosts => ({
      ...prevPosts,
      [category]: prevPosts[category].filter(post => post.id !== postId)
    }));
  };

  const getPostsByCategory = (category) => {
    return posts[category] || [];
  };

  const getAllPostsCount = () => {
    return Object.values(posts).reduce((total, categoryPosts) => total + categoryPosts.length, 0);
  };

  return (
    <PostsContext.Provider value={{
      posts,
      addPost,
      deletePost,
      getPostsByCategory,
      getAllPostsCount
    }}>
      {children}
    </PostsContext.Provider>
  );
};