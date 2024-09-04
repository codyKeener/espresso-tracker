import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getShots } from '../api/shotData';
import ShotCard from '../components/shotCard';

export default function PastShots() {
  const [shots, setShots] = useState([]);

  const getAllTheShots = () => {
    getShots().then(setShots);
  };

  useEffect(() => {
    getAllTheShots();
  }, []);

  console.warn(shots);

  return (
    <>
      <div style={{
        display: 'flex', gap: '15px', margin: '20px', flexWrap: 'wrap',
      }}
      >
        {(shots.length > 0) ? shots.map((shot) => (
          <ShotCard key={shot.firebaseKey} shotObj={shot} onUpdate={getAllTheShots} />
        )) : <div style={{ display: 'flex', width: '800px', justifyContent: 'center' }}><h5 style={{ marginRight: '5px' }}>No shots match your search.</h5><Link passHref href="/post/edit/new"><h5 className="clickableLink">Create a New Shot?</h5></Link></div>}
      </div>
    </>
  );
}
