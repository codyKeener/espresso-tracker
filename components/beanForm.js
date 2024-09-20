import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createBean, updateBean } from '../api/beanData';

const initialState = {
  name: '',
  brand: '',
  roast_level: '',
  origin: '',
  tasting_notes: '',
  ounces: '',
  price: '',
};

export default function BeanForm({ obj, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        ...obj,
      });
    }
  }, [obj]);

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
      updateBean(payload).then(() => router.push('/my-shots'));
    } else {
      createBean(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateBean(patchPayload).then(onUpdate);
      });
    }
  };

  return (
    <>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px',
      }}
      >
        <h2 style={{ marginTop: '10px', color: '#E9EBE8' }}>Add New Beans</h2>
        <Form onSubmit={handleSubmit} style={{ width: '90%' }}>
          <FloatingLabel controlId="beanFloatingInput1" label="Brand" style={{ marginBottom: '5px' }}>
            <Form.Control
              type="text"
              placeholder="Brand"
              name="brand"
              value={formInput.brand}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="beanFloatingInput2" label="Name" style={{ marginBottom: '5px' }}>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={formInput.name}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="beanFloatingInput3" label="Roast Level" style={{ marginBottom: '5px' }}>
            <Form.Control
              type="text"
              placeholder="Roast Level"
              name="roast_level"
              value={formInput.roast_level}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="beanFloatingInput4" label="Origin" style={{ marginBottom: '5px' }}>
            <Form.Control
              type="text"
              placeholder="Origin"
              name="origin"
              value={formInput.origin}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="beanFloatingInput5" label="Tasting Notes" style={{ marginBottom: '5px' }}>
            <Form.Control
              type="textarea"
              placeholder="Tasting Notes"
              name="tasting_notes"
              value={formInput.tasting_notes}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="beanFloatingInput6" label="Ounces" style={{ marginBottom: '5px' }}>
            <Form.Control
              type="number"
              min="0"
              step="0.1"
              placeholder="Ounces"
              name="ounces"
              value={formInput.ounces}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="beanFloatingInput7" label="Price ($)" style={{ marginBottom: '5px' }}>
            <Form.Control
              type="number"
              min="0"
              step="0.01"
              placeholder="Price"
              name="price"
              value={formInput.price}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <div style={{ display: 'flex' }}>
            <Button type="submit" style={{ marginLeft: 'auto', fontSize: '20px' }}>{obj.firebaseKey ? 'Update' : 'Add'} Beans</Button>
          </div>
        </Form>
      </div>
    </>
  );
}

BeanForm.propTypes = {
  obj: PropTypes.shape({
    brand: PropTypes.string,
    name: PropTypes.string,
    roast_level: PropTypes.string,
    origin: PropTypes.string,
    tasting_notes: PropTypes.string,
    ounces: PropTypes.string,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

BeanForm.defaultProps = {
  obj: initialState,
};
