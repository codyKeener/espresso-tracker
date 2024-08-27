import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getBeans } from '../api/beanData';
import { getMachines } from '../api/machineData';
import { getGrinders } from '../api/grinderData';
import { createShot, updateShot } from '../api/shotData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  beans: '',
  bean_roast_date: '',
  machine: '',
  grinder: '',
  pressure: '',
  temperature: '',
  dose: '',
  prep: '',
  shot_time: '',
  yield: '',
  rating: '',
  image: '',
};

export default function ShotForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [beans, setBeans] = useState([]);
  const [machines, setMachines] = useState([]);
  const [grinders, setGrinders] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        ...obj,
      });
    }
  }, [obj]);

  useEffect(() => {
    getBeans().then(setBeans);
  }, []);

  useEffect(() => {
    getMachines().then(setMachines);
  }, []);

  useEffect(() => {
    getGrinders().then(setGrinders);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formInput,
      uid: user.uid,
    };

    if (obj.firebaseKey) {
      updateShot(payload).then(() => router.push('/past-shots'));
    } else {
      createShot(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateShot(patchPayload).then(() => {
          router.push('/past-shots');
        });
      });
    }
  };

  return (
    <>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px',
      }}
      >
        <h1 style={{ margin: '12px' }}>What&apos;s Brewing?</h1>
        <Form onSubmit={handleSubmit} style={{ width: '80%' }}>
          <FloatingLabel controlId="floatingSelect1" label="Beans">
            <Form.Select
              type="text"
              placeholder="Choose your beans"
              name="beans"
              value={obj.beans.firebaseKey}
              onChange={handleChange}
              required
            >
              <option value="">Choose your beans</option>
              {
                beans.map((bean) => (
                  <option
                    key={bean.firebaseKey}
                    value={bean.firebaseKey}
                  >
                    {bean.brand} {bean.name}
                  </option>
                ))
              }
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput1" label="Bean roast date">
            <Form.Control
              type="text"
              placeholder="Roast Date"
              name="bean_roast_date"
              value={formInput.bean_roast_date}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingSelect2" label="Machine">
            <Form.Select
              placeholder="Espresso Machine"
              name="machine"
              value={obj.machine.firebaseKey}
              onChange={handleChange}
              required
            >
              <option value="">Choose your Espresso Machine</option>
              {
                machines.map((machine) => (
                  <option
                    key={machine.firebaseKey}
                    value={machine.firebaseKey}
                  >
                    {machine.brand} {machine.name}
                  </option>
                ))
              }
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel controlId="floatingSelect3" label="Grinder">
            <Form.Select
              placeholder="Grinder"
              name="grinder"
              value={obj.grinder.firebaseKey}
              onChange={handleChange}
              required
            >
              <option value="">Choose your Grinder</option>
              {
                grinders.map((grinder) => (
                  <option
                    key={grinder.firebaseKey}
                    value={grinder.firebaseKey}
                  >
                    {grinder.brand} {grinder.name}
                  </option>
                ))
              }
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput2" label="Pressure">
            <Form.Control
              type="number"
              min="0"
              placeholder="Pressure in Bars"
              name="pressure"
              value={formInput.pressure}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput3" label="Temperature">
            <Form.Control
              type="number"
              min="0"
              placeholder="Temperature in Farenheight"
              name="temperature"
              value={formInput.temperature}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput4" label="Dose">
            <Form.Control
              type="number"
              min="0"
              step="0.1"
              placeholder="Dose in grams"
              name="dose"
              value={formInput.dose}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput5" label="Prep">
            <Form.Control
              type="textarea"
              placeholder="Puck prep"
              name="prep"
              value={formInput.prep}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput6" label="Shot time">
            <Form.Control
              type="number"
              min="0"
              placeholder="Shot time in seconds"
              name="shot_time"
              value={formInput.shot_time}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput7" label="Yield">
            <Form.Control
              type="number"
              min="0"
              step="0.1"
              placeholder="Yield in grams"
              name="yield"
              value={formInput.yield}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput8" label="Rating">
            <Form.Control
              type="text"
              placeholder="Rating"
              name="rating"
              value={formInput.rating}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput9" label="Image">
            <Form.Control
              type="url"
              placeholder="Image"
              name="image"
              value={formInput.image}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Shot</Button>
        </Form>
      </div>
    </>
  );
}

ShotForm.propTypes = {
  obj: PropTypes.shape({
    beans: PropTypes.string,
    bean_roast_date: PropTypes.string,
    machine: PropTypes.string,
    grinder: PropTypes.string,
    pressure: PropTypes.number,
    temperature: PropTypes.number,
    dose: PropTypes.number,
    prep: PropTypes.string,
    shot_time: PropTypes.string,
    yield: PropTypes.number,
    rating: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ShotForm.defaultProps = {
  obj: initialState,
};
