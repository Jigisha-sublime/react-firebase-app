import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import firebase from 'firebase'

import { db } from '../firebaseconfig'

const Post = (props) => {
  const { postId, signInUser, userName, imageUrl, caption } = props;
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
          setComments(snapshot.docs.map(doc => doc.data()));
        })
    }
    return () => {
      unsubscribe();
    }
  }, [postId])

  const postComment = (e) => {
    e.preventDefault();
    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: signInUser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setComment('')
  }

  return (
    <div className="post">
      <div className="post_header">
        <Avatar className='post_avatar' src='/static/' alt="Rj" />
        <h3>{userName}</h3>
      </div>
      <img className="post_img" src={imageUrl} alt="post" />
      <h4 className="post_text"><strong>{userName} : </strong> {caption}</h4>
      <div className="post_comments">
        {
          comments.map(cmt => (
            <p>
              <strong>{cmt.username}</strong> {cmt.text}
            </p>
          ))
        }
      </div>
      {signInUser && <form className="post_commentform" onSubmit={postComment}>
        <input
          className="post_input"
          type="text"
          placeholder="Add comments..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="post_button"
          type="submit"
          disabled={!comment}
        >
          Post
        </button>
      </form>}
    </div>
  )
}

export default Post
