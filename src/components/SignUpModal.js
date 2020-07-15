import React, { useState } from 'react'
import { Button, Input, Modal } from '@material-ui/core';
import { getModalStyle, useStyles } from '../assets/MuiStyles'

const SignUpModal = (props) => {
  const { open, toggleOpen, setValueChange, signUp, state } = props
  const classes = useStyles()

  const [modalStyle] = useState(getModalStyle)

  return (
    <Modal
      open={open}
      onClose={toggleOpen}
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
            name="userName"
            value={state.userName}
            onChange={(e) => setValueChange(e)}
          />
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
          <Button onClick={signUp}>Sign Up</Button>
        </form>
      </div>
    </Modal>
  )
}

export default SignUpModal
