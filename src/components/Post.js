import React from 'react'
import { Avatar } from '@material-ui/core'

const Post = (props) => {
  const { userName, imageUrl, caption } = props
  return (
    <div className="post">
      <div className="post_header">
        <Avatar className='post_avatar' src='/static/' alt="Rj" />
        <h3>{userName}</h3>
      </div>
      <img className="post_img" src={imageUrl} />
      <h4 className="post_text"><strong>{userName} : </strong> {caption}</h4>
    </div>
  )
}

export default Post
