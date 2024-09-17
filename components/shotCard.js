import { Button, ButtonGroup, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSingleBean } from '../api/beanData';
import { deleteShot } from '../api/shotData';

export default function ShotCard({ shotObj, onUpdate }) {
  const [shotBeans, setShotBeans] = useState({});

  const newDate = new Date(shotObj.brewed_at);
  let shotDate;
  if (Number(newDate.getFullYear()) < 2024) {
    shotDate = new Date(shotObj.brewed_at * 1000);
  } else {
    shotDate = new Date(shotObj.brewed_at);
  }

  useEffect(() => {
    getSingleBean(shotObj.beans).then(setShotBeans);
  }, [shotObj.beans]);

  const deleteThisShot = () => {
    if (window.confirm('Delete this shot?')) {
      deleteShot(shotObj.firebaseKey).then(onUpdate);
    }
  };

  return (
    <Card style={{ width: '300px', backgroundColor: '#FFFFFE' }}>
      <Card.Img variant="top" src={shotObj.image} style={{ height: '280px' }} />
      <Card.Body>
        <Card.Title>{shotDate.toDateString()} at {(Number(shotDate.getHours()) < 13) ? shotDate.getHours() : (Number(shotDate.getHours()) - 12)}:{shotDate.getMinutes()} {(Number(shotDate.getHours()) < 12) ? 'am' : 'pm'}</Card.Title>
        <Card.Text>
          <p style={{ marginBottom: '0' }}>Beans: {shotBeans.name}</p>
          <p>Rating: {shotObj.rating}</p>
        </Card.Text>
        <ButtonGroup style={{ width: '100%', display: 'flex', alignItems: 'bottom' }}>
          <Link href={`/shots/${shotObj.firebaseKey}`} passHref>
            <Button className="card-button">View</Button>
          </Link>
          <Link href={`/shots/edit/${shotObj.firebaseKey}`} passHref>
            <Button className="card-button">Edit</Button>
          </Link>
          <Button className="card-delete-button" onClick={deleteThisShot}>Delete</Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}

ShotCard.propTypes = {
  shotObj: PropTypes.shape({
    brewed_at: PropTypes.number,
    beans: PropTypes.string,
    bean_roast_date: PropTypes.string,
    machine: PropTypes.string,
    grinder: PropTypes.string,
    pressure: PropTypes.number,
    temperature: PropTypes.number,
    dose: PropTypes.number,
    prep: PropTypes.string,
    shot_time: PropTypes.number,
    yield: PropTypes.number,
    rating: PropTypes.number,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
