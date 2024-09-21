import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
    }}
    >
      <div
        style={{
          backgroundImage: "url('/moody-cafe-cropped.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top center',
          backgroundSize: '402px 536px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '536px',
          width: '402px',
          padding: '0',
          border: '2px solid black',
          borderRadius: '12px',
        }}
      >
        <h1 style={{ marginTop: '105px', color: '#E9EBE8' }}>Espresso Tracker</h1>
        <Button variant="success" className="sign-in-btn" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
