import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createProfile, updateProfile } from '../api/profileData';

const initialState = {
  image: '',
  bio: '',
};

export default function ProfileForm({ obj, onUpdate, onCancel }) {
  const [formInput, setFormInput] = useState(initialState);
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
      updateProfile(payload).then(onUpdate);
    } else {
      createProfile(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateProfile(patchPayload).then(onUpdate);
      });
    }
  };

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput1" label="Image" style={{ marginBottom: '5px' }}>
            <Form.Control
              type="url"
              placeholder="Image"
              name="image"
              value={formInput.image}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput2" label="Bio" style={{ marginBottom: '5px' }}>
            <Form.Control
              type="text"
              placeholder="Bio"
              name="bio"
              value={formInput.bio}
              onChange={handleChange}
            />
          </FloatingLabel>
          <div style={{ display: 'flex' }}>
            <Button onClick={onCancel} className="card-delete-button">Cancel</Button>
            <Button className="card-button" type="submit" style={{ marginLeft: 'auto', fontSize: '20px' }}>{obj.firebaseKey ? 'Update' : 'Edit'} Profile</Button>
          </div>
        </Form>
      </div>
    </>
  );
}

ProfileForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    bio: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

ProfileForm.defaultProps = {
  obj: initialState,
};
