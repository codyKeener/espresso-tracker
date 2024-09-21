import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getShotsForSingleUser } from '../api/shotData';
import ShotCard from '../components/shotCard';
import { useAuth } from '../utils/context/authContext';

export default function PastShots() {
  const [shots, setShots] = useState([]);
  const { user } = useAuth();

  const getAllTheShots = () => {
    getShotsForSingleUser(user.uid).then((allShots) => {
      allShots.sort((a, b) => b.brewed_at - a.brewed_at);
      setShots(allShots);
    });
  };

  useEffect(() => {
    getAllTheShots();
  }, []);

  return (
    <>
      <div style={{
        display: 'flex', gap: '15px', margin: '20px', flexWrap: 'wrap', justifyContent: 'center',
      }}
      >
        {(shots.length > 0) ? shots.map((shot) => (
          <ShotCard key={shot.firebaseKey} shotObj={shot} onUpdate={getAllTheShots} />
        )) : <div style={{ display: 'flex', width: '800px', justifyContent: 'center' }}><h5 style={{ marginRight: '5px', color: '#FFFFEE' }}>No shots match your search.</h5><Link passHref href="/shots/edit/new"><h5 className="clickableLink">Create a New Shot?</h5></Link></div>}
      </div>
    </>
  );
}
