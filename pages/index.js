import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        color: '#ffffff',
        padding: '30px',
        margin: '20px',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <h1>Hey, {user.displayName}! Welcome to Espresso Tracker.</h1>
      <div style={{
        border: '2px solid white', borderRadius: '5px', marginTop: '100px', width: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}
      >
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px',
        }}
        >
          <h3>Ready to pull a new shot?</h3>
          <Link passHref href="/shots/edit/new">
            <Button className="home-button">New Shot</Button>
          </Link>
        </div>
        {/* <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px',
        }}
        >
          <h3>Buy some new beans?</h3>
          <Link passHref href="/past-shots">
            <Button className="home-button">New Beans</Button>
          </Link>
        </div> */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px',
        }}
        >
          <h3>Want to check out your last shot?</h3>
          <Link passHref href="/profile">
            <Button className="home-button">Past Shots</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
