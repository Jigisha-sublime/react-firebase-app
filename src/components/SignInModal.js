import React, { useState } from 'react'
import { getModalStyle, useStyles } from '../assets/MuiStyles'
import { Button, Input, Modal } from '@material-ui/core';

const SignInModal = (props) => {

  const { openSignIn, toggleSignIn, setValueChange, state, signIn } = props;
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)

  return (
    <Modal
      open={openSignIn}
      onClose={toggleSignIn}
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
            name="email"
            value={state.email}
            onChange={(e) => setValueChange(e)}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={state.password}
            onChange={(e) => setValueChange(e)}
          />
          <Button onClick={signIn}>Sign In</Button>
        </form>
      </div>
    </Modal>
  )
}

export default SignInModal
