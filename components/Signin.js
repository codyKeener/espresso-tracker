import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      style={{
        backgroundImage: "url('/latte-background.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1344px 652px',
        backgroundPosition: 'top center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '652px',
        minWidth: '1344px',
        padding: '0',
        margin: '0',
      }}
    >
      <h1 style={{ marginTop: '140px' }}>Espresso Tracker</h1>
      <Button className="sign-in-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
