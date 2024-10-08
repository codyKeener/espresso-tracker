import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deleteShot, getSingleShot } from '../../api/shotData';
import { getSingleBean } from '../../api/beanData';
import { getSingleMachine } from '../../api/machineData';
import { getSingleGrinder } from '../../api/grinderData';

export default function ViewShot() {
  const router = useRouter();
  const { id } = router.query;
  const [shotDetails, setShotDetails] = useState({});
  const [shotBeans, setShotBeans] = useState({});
  const [shotMachine, setShotMachine] = useState({});
  const [shotGrinder, setShotGrinder] = useState({});

  const getTheShot = () => {
    getSingleShot(id).then(setShotDetails);
  };

  const deleteThisShot = () => {
    if (window.confirm('Delete this shot?')) {
      deleteShot(id).then(() => router.push('/my-shots'));
    }
  };

  useEffect(() => {
    getTheShot();
  }, []);

  useEffect(() => {
    getSingleShot(id).then((shot) => {
      getSingleBean(shot.beans).then(setShotBeans);
      getSingleMachine(shot.machine).then(setShotMachine);
      getSingleGrinder(shot.grinder).then(setShotGrinder);
    });
  }, []);

  const formatDate = (timestamp) => {
    let shotDate;
    const newDate = new Date(timestamp);
    if (Number(newDate.getFullYear()) < 2024) {
      shotDate = new Date(timestamp * 1000);
    } else {
      shotDate = new Date(timestamp);
    }
    return shotDate;
  };

  const shotDate = formatDate(shotDetails.brewed_at);

  const espressoRatio = (espressoDose, espressoYield) => {
    let roundedYield;
    if (espressoYield % espressoDose === 0) {
      roundedYield = parseFloat(espressoYield / espressoDose);
    } else {
      roundedYield = parseFloat(espressoYield / espressoDose).toFixed(2);
    }
    const ratio = `1:${roundedYield}`;
    return ratio;
  };

  // const formatStringDate = (dateString) => {
  //   const year = dateString.slice(0, 4);
  //   const month = dateString.slice(5, 7);
  //   const day = dateString.slice(8, 10);
  //   const formattedDate = `${month}-${day}-${year}`;
  //   return formattedDate;
  // };

  return (
    <div style={{ display: 'flex', width: '100%', margin: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', marginRight: '50px' }}>
        <img src={shotDetails.image} alt="A shot of espresso" style={{ width: '400px' }} />
        <Link href={`/shots/edit/${id}`} passHref>
          <Button variant="success" className="card-button" style={{ marginTop: '15px', marginBottom: '15px' }}>Edit Shot</Button>
        </Link>
        <Button variant="danger" className="card-delete-button" onClick={deleteThisShot}>Delete Shot</Button>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'column', width: '70%', color: '#E9EBE8',
      }}
      >
        <h3>Shot pulled on {shotDate.toDateString()} at {(Number(shotDate.getHours()) < 13) ? shotDate.getHours() : (Number(shotDate.getHours()) - 12)}:{String(shotDate.getMinutes()).padStart(2, '0')} {(Number(shotDate.getHours()) < 12) ? 'am' : 'pm'}</h3>
        <div style={{
          display: 'flex', fontSize: '18px', marginTop: '20px', gap: '10px', flexDirection: 'column',
        }}
        >
          <div>
            <h5>Shot Details</h5>
            <ul>
              <li><strong>Temperature:</strong> {shotDetails.temperature}&deg; Fahrenheit</li>
              <li><strong>Prep notes:</strong> {shotDetails.prep}</li>
              <li><strong>Dose:</strong> {shotDetails.dose}</li>
              <li><strong>Yield:</strong> {shotDetails.yield}</li>
              <li><strong>Ratio:</strong> {espressoRatio(shotDetails.dose, shotDetails.yield)}</li>
              <li><strong>Shot Time:</strong> {shotDetails.shot_time} seconds</li>
              <li><strong>Rating:</strong> {shotDetails.rating}</li>
            </ul>
          </div>
          <div>
            <h5>Beans</h5>
            <ul>
              <li><strong>Beans used:</strong> {shotBeans.brand} {shotBeans.name}</li>
              <li><strong>Roast date:</strong> {shotDetails.bean_roast_date}</li>
            </ul>
          </div>
          <div>
            <h5>Gear</h5>
            <ul>
              <li><strong>Machine:</strong> {shotMachine.brand} {shotMachine.name}</li>
              <li><strong>Grinder:</strong> {shotGrinder.brand} {shotGrinder.name}</li>
              <li><strong>Pressure:</strong> {shotDetails.pressure} Bar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
