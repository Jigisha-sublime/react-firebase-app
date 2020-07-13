import React, { useState } from 'react';
import Logo from './assetss/instalogomb.png'
import './App.css';
import Post from './components/Post';

function App() {
  const initialPosts = [
    {
      userName: "Username",
      imageUrl: "https://www.andreasreiterer.at/wp-content/uploads/2017/11/react-logo-825x510.jpg",
      caption: "Nice caption"
    },
    {
      userName: "Username",
      imageUrl: "https://www.andreasreiterer.at/wp-content/uploads/2017/11/react-logo-825x510.jpg",
      caption: "Nice caption"
    }
  ]
  const [posts, setPosts] = useState(initialPosts);
  useEffect
  return (
    <div className="app">
      <div className="app_header">
        <img className="app_headerImage" src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' alt="logo" />
      </div>
      <h3>App header text</h3>
      {posts.map(post => (
        <Post userName={post.userName} imageUrl={post.imageUrl} caption={post.caption} />
      ))}
    </div>
  );
}

export default App;
