import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { db, storage } from '../firebaseconfig'
import firebase from 'firebase';


const ImageUpload = (props) => {

  const [fileInput, setFileInput] = useState(null)
  const [progress, setProgress] = useState(0)
  const [caption, setCaption] = useState('')

  const handleFileInput = (e) => {
    if (e.target.files[0]) {
      setFileInput(e.target.files[0])
    }
  }
  const handleSubmit = () => {
    const uploadTask = storage.ref(`images/${fileInput.name}`).put(fileInput)
    uploadTask.on(
      'state_changed',
      (snapshots) => {
        const progress = Math.round(
          (snapshots.bytesTransferred / snapshots.totalBytes) * 100
        )
        setProgress(progress)
      },
      (error) => {
        alert(error.message)
      },
      () => {
        // complete function
        storage
          .ref("images")
          .child(fileInput.name)
          .getDownloadURL()
          .then(url => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              userName: userName
            })
            setProgress(0);
            setFileInput(null);
            setCaption('')
          })
      }

    )
  }

  const { userName } = props
  return (
    <div className="image_upload">
      <progress className="image_upload_progress" value={progress} max='100' />
      <input
        type="text"
        placeholder="Enter Caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="file"
        onChange={handleFileInput}
        accept="image/*"
      />
      <Button onClick={handleSubmit} >Upload</Button>
    </div>
  )
}

export default ImageUpload
