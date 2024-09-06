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
      deleteShot(id).then(() => router.push('/past-shots'));
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

  // Found this function to reduce fractions here: https://stackoverflow.com/questions/4652468/is-there-a-javascript-function-that-reduces-a-fraction
  const espressoRatio = (espressoDose, espressoYield) => {
    let gcd = function gcd(a, b) {
      return b ? gcd(b, a % b) : a;
    };
    gcd = gcd(espressoDose, espressoYield);
    const ratioArray = [espressoDose / gcd, espressoYield / gcd];
    return `${ratioArray[0]}:${ratioArray[1]}`;
  };

  return (
    <div style={{ display: 'flex', width: '100%', margin: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', marginRight: '50px' }}>
        <img src={shotDetails.image} alt="A shot of espresso" style={{ width: '400px' }} />
        <Link href={`/shots/edit/${id}`} passHref>
          <Button style={{ marginTop: '15px', marginBottom: '15px' }}>Edit Shot</Button>
        </Link>
        <Button onClick={deleteThisShot}>Delete Shot</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
        <h3>Shot pulled on {shotDate.toDateString()} at {(Number(shotDate.getHours()) < 12) ? shotDate.getHours() : (Number(shotDate.getHours()) - 12)}:{shotDate.getMinutes()} {(Number(shotDate.getHours()) < 12) ? 'am' : 'pm'}</h3>
        <p>Beans used: {shotBeans.brand} {shotBeans.name}</p>
        <p>Roast date: {shotDetails.bean_roast_date}</p>
        <p>Machine: {shotMachine.brand} {shotMachine.name}</p>
        <p>Grinder: {shotGrinder.brand} {shotGrinder.name}</p>
        <p>Pressure: {shotDetails.pressure} Bar</p>
        <p>Temperature: {shotDetails.temperature}&deg; Farenheight</p>
        <p>Prep notes: {shotDetails.prep}</p>
        <p>Dose: {shotDetails.dose}</p>
        <p>Yield: {shotDetails.yield}</p>
        <p>Ratio: {espressoRatio(shotDetails.dose, shotDetails.yield)}</p>
        <p>Shot Time: {shotDetails.shot_time} seconds</p>
        <p>Rating: {shotDetails.rating}</p>
      </div>
    </div>
  );
}
