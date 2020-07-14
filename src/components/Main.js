import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input, Modal } from '@material-ui/core';
import InstagramEmbed from 'react-instagram-embed';

import Post from './Post';
import { db, auth } from '../firebaseconfig';
import ImageUpload from './ImageUpload';



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Main() {

  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)

  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img
                className="app_headerImage"
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTkPV11Xh8V16t7ud6uPm7w1pROwvPcJzxPOw&usqp=CAU'
                alt="logo"
              />
            </center>
            <Input
              placeholder="User Name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(!openSignIn)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img
                className="app_headerImage"
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTkPV11Xh8V16t7ud6uPm7w1pROwvPcJzxPOw&usqp=CAU'
                alt="logo"
              />
            </center>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>
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
