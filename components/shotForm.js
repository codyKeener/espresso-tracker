import React, { useEffect, useState } from 'react';
import {
  Accordion, Button, FloatingLabel, Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getBeans } from '../api/beanData';
import { getMachines } from '../api/machineData';
import { getGrinders } from '../api/grinderData';
import { createShot, updateShot } from '../api/shotData';
import { useAuth } from '../utils/context/authContext';
import BeanForm from './beanForm';

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
  const [sideBar, setSideBar] = useState(null);
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
      brewed_at: Date.now(),
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

  const beanFormSubmit = () => {
    getBeans().then(setBeans);
    setSideBar(null);
  };

  const sideBarToggle = () => {
    if (sideBar === null) {
      setSideBar(
        <>
          <div style={{
            minWidth: '350px', marginTop: '64px', border: '2px solid white', borderRadius: '5px',
          }}
          >
            <BeanForm onUpdate={beanFormSubmit} />
          </div>
        </>,
      );
    } else {
      setSideBar(null);
    }
  };

  // GET TODAY'S DATE TO LIMIT THE ROAST DATE CALENDAR
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  return (
    <>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', width: '100%',
        }}
        >
          <h1 style={{ margin: '12px' }}>What&apos;s Brewing?</h1>
          <Form onSubmit={handleSubmit} style={{ width: '60%' }}>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Beans</Accordion.Header>
                <Accordion.Body>
                  <FloatingLabel controlId="floatingSelect1" label="Beans" style={{ marginBottom: '5px', color: '#FFFFFF' }}>
                    <Form.Select
                      placeholder="Choose your beans"
                      name="beans"
                      value={formInput.beans}
                      onChange={handleChange}
                      required
                      // style={{ color: '#FFFFFF', backgroundColor: '#D9D9D9' }}
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
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '10px',
                  }}
                  >
                    <p>OR</p>
                    <div>
                      <Button onClick={sideBarToggle}>Add New Beans</Button>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <FloatingLabel controlId="floatingInput1" label="Bean roast date" style={{ marginBottom: '5px', marginTop: '5px' }}>
              <Form.Control
                type="date"
                max={today}
                placeholder="Roast Date"
                name="bean_roast_date"
                value={formInput.bean_roast_date}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingSelect2" label="Machine" style={{ marginBottom: '5px' }}>
              <Form.Select
                type="text"
                placeholder="Espresso Machine"
                name="machine"
                value={formInput.machine}
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
            <FloatingLabel controlId="floatingSelect3" label="Grinder" style={{ marginBottom: '5px' }}>
              <Form.Select
                type="text"
                placeholder="Grinder"
                name="grinder"
                value={formInput.grinder}
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
            <FloatingLabel controlId="floatingInput2" label="Pressure (Bar)" style={{ marginBottom: '5px' }}>
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
            <FloatingLabel controlId="floatingInput3" label="Temperature (&deg;F)" style={{ marginBottom: '5px' }}>
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
            <FloatingLabel controlId="floatingInput4" label="Dose (g)" style={{ marginBottom: '5px' }}>
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
            <FloatingLabel controlId="floatingInput5" label="Prep Notes" style={{ marginBottom: '5px' }}>
              <Form.Control
                type="textarea"
                placeholder="Prep Notes"
                name="prep"
                value={formInput.prep}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput6" label="Shot time (seconds)" style={{ marginBottom: '5px' }}>
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
            <FloatingLabel controlId="floatingInput7" label="Yield (g)" style={{ marginBottom: '5px' }}>
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
            <FloatingLabel controlId="floatingInput8" label="Rating (out of 10)" style={{ marginBottom: '5px' }}>
              <Form.Control
                type="number"
                step=".1"
                max="10"
                placeholder="Rating"
                name="rating"
                value={formInput.rating}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput9" label="Image" style={{ marginBottom: '5px' }}>
              <Form.Control
                type="url"
                placeholder="Image"
                name="image"
                value={formInput.image}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <div style={{ display: 'flex' }}>
              <Button type="submit" style={{ marginLeft: 'auto', fontSize: '20px' }}>{obj.firebaseKey ? 'Update' : 'Create'} Shot</Button>
            </div>
          </Form>
        </div>
        <div id="bean-form-div">
          {sideBar}
        </div>
      </div>
    </>
  );
}

ShotForm.propTypes = {
  obj: PropTypes.shape({
    brewed_at: PropTypes.number,
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
    rating: PropTypes.number,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ShotForm.defaultProps = {
  obj: initialState,
};
