import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import InstagramEmbed from 'react-instagram-embed';

import { db, auth } from '../firebaseconfig';
import Post from './Post';
import ImageUpload from './ImageUpload';
import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';



function Main() {

  const initialState = {
    email: '',
    password: '',
    userName: ''
  }
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState(initialState)
  const [user, setUser] = useState(null)
  const { email, password, userName } = state

  useEffect(() => {
    db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })
      ))
    })
  }, [])

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser)
      }
      else {
        setUser(null)
      }
    })
    return () => {
      unSubscribe()
    }
  }, [user, userName])

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return authUser.user.updateProfile({
          displayName: userName
        })
      })
      .catch(err => alert(err.message))
    setOpen(false)
  }

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .catch(err => alert(err))
    setOpenSignIn(false)

  }

  const toggleOpen = () => {
    setOpen(!open)
  }
  const toggleSignIn = () => {
    setOpenSignIn(!openSignIn)
  }
  const setValueChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }


  return (
    <div className="app">
      <SignUpModal
        open={open}
        signUp={signUp}
        toggleOpen={toggleOpen}
        setValueChange={setValueChange}
        state={state}
      />
      <SignInModal
        openSignIn={openSignIn}
        signIn={signIn}
        toggleSignIn={toggleSignIn}
        setValueChange={setValueChange}
        state={state} />

      <div className="app_header">
        <img
          className="app_headerImage"
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTkPV11Xh8V16t7ud6uPm7w1pROwvPcJzxPOw&usqp=CAU'
          alt="logo"
        />
        {
          user ? <Button onClick={() => auth.signOut()}>Logout</Button> :
            <div className="app_loginContainer">
              <Button onClick={() => setOpenSignIn(!openSignIn)}>Sign In</Button>
              <Button onClick={() => setOpen(!open)}>Sign Up</Button>
            </div>
        }
      </div>
      <div className="app_posts">
        <div className="app_postLeft">
          {posts.map(({ id, post }) => (
            <Post key={id} postId={id} signInUser={user} userName={post.userName} imageUrl={post.imageUrl} caption={post.caption} />
          ))}
        </div>
        <div className="app_postRight">
          <InstagramEmbed
            url='https://instagr.am/p/Zw9o4/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
          />
        </div>

      </div>


      {
        (user && user.displayName) ?
          <ImageUpload userName={user.displayName} /> :
          <h3>Sorry! You need to login to upload</h3>
      }
    </div>
  );
}

export default Main;
