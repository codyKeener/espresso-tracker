import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        color: '#E9EBE8',
        padding: '30px',
        margin: '20px',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <h2>Hey, {user.displayName}! Welcome to Espresso Tracker.</h2>
      <div style={{
        display: 'flex', justifyContent: 'space-between', width: '80%', marginTop: '60px',
      }}
      >
        <Link passHref href="/shots/edit/new">
          <div className="home-image" style={{ maxWidth: '320px' }}>
            <img src="/espresso-machine.png" alt="espresso machine" style={{ maxWidth: '300px' }} />
            <h3 style={{ margin: '0 10px 10px 10px' }}>Ready to pull a new shot?</h3>
          </div>
        </Link>
        <Link passHref href="/my-shots">
          <div className="home-image" style={{ maxWidth: '320px' }}>
            <img src="/latte-art.png" alt="espresso machine" style={{ maxWidth: '300px' }} />
            <h3 style={{ margin: '0 10px 10px 10px' }}>Want to check out your last shot?</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
