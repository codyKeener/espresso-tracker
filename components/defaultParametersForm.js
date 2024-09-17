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

export default function DefaultParametersForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [beans, setBeans] = useState([]);
  const [machines, setMachines] = useState([]);
  const [grinders, setGrinders] = useState([]);
  const [sideBar, setSideBar] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj);
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
      updateShot(payload).then(() => router.push('/profile'));
    } else {
      createShot(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateShot(patchPayload).then(() => {
          router.push('/profile');
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

  return (
    <>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', width: '100%',
        }}
        >
          <h3 style={{ margin: '12px', color: '#FFFFEA' }}>Set Defaults</h3>
          <Form onSubmit={handleSubmit} style={{ width: '60%' }}>
            <Accordion className="react-form" style={{ marginBottom: '5px' }}>
              <Accordion.Item eventKey="0" className="react-form">
                <Accordion.Header className="react-form">Beans</Accordion.Header>
                <Accordion.Body className="react-form">
                  <FloatingLabel controlId="floatingSelect1" label="Beans" style={{ marginBottom: '5px' }}>
                    <Form.Select
                      className="react-form"
                      placeholder="Choose your beans"
                      name="beans"
                      value={formInput.beans}
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
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '10px',
                  }}
                  >
                    <p>OR</p>
                    <div>
                      <Button className="form-submit-button" style={{ border: 'none' }} onClick={sideBarToggle}>Add New Beans</Button>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
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
            <div style={{ display: 'flex' }}>
              <Button
                className="form-submit-button"
                type="submit"
                style={{
                  marginLeft: 'auto', fontSize: '20px', border: 'none', color: '#FFFFEA',
                }}
              >{obj.firebaseKey ? 'Update' : 'Set'} Defaults
              </Button>
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

DefaultParametersForm.propTypes = {
  obj: PropTypes.shape({
    brewed_at: PropTypes.number,
    beans: PropTypes.string,
    machine: PropTypes.string,
    grinder: PropTypes.string,
    pressure: PropTypes.number,
    temperature: PropTypes.number,
    dose: PropTypes.number,
    prep: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

DefaultParametersForm.defaultProps = {
  obj: initialState,
};
