import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DefaultParametersForm from '../components/defaultParametersForm';
import { useAuth } from '../utils/context/authContext';
import { getProfileForSingleUser } from '../api/profileData';
import ProfileForm from '../components/profileForm';
import { getDefaultForSingleUser } from '../api/defaultData';
import { getSingleBean } from '../api/beanData';
import { getSingleMachine } from '../api/machineData';
import { getSingleGrinder } from '../api/grinderData';

export default function UserProfile() {
  const [profileData, setProfileData] = useState({});
  const [editText, setEditText] = useState('');
  const [editActive, setEditActive] = useState(false);
  const [defaultData, setDefaultData] = useState({});
  const [defaultBeans, setDefaultBeans] = useState({});
  const [defaultMachine, setDefaultMachine] = useState({});
  const [defaultGrinder, setDefaultGrinder] = useState({});
  const [defaultFormDiv, setDefaultFormDiv] = useState('');
  const [defaultFormActive, setDefaultFormActive] = useState(false);
  const { user } = useAuth();

  const getTheProfile = () => {
    getProfileForSingleUser(user.uid).then((profile) => {
      if (profile.length > 0) {
        setProfileData(profile[0]);
      }
    });
    setEditActive(false);
  };

  const getTheDefaults = () => {
    getDefaultForSingleUser(user.uid).then((defaults) => {
      if (defaults.length > 0) {
        setDefaultData(defaults[0]);
      }
    });
  };

  const getTheDefaultsAgain = () => {
    getDefaultForSingleUser(user.uid).then((defaults) => {
      if (defaults.length > 0) {
        setDefaultData(defaults[0]);
      }
    });
    setDefaultFormActive(false);
    setDefaultFormDiv('');
  };

  useEffect(() => {
    getTheProfile();
  }, []);

  useEffect(() => {
    getTheDefaults();
  });

  useEffect(() => {
    getDefaultForSingleUser(user.uid).then((defaults) => {
      getSingleBean(defaults[0].beans).then(setDefaultBeans);
      getSingleMachine(defaults[0].machine).then(setDefaultMachine);
      getSingleGrinder(defaults[0].grinder).then(setDefaultGrinder);
    });
  }, []);

  const handleCancel = () => {
    setEditActive(false);
  };

  const editProfile = () => {
    setEditActive(true);
    setEditText(<ProfileForm obj={profileData} onUpdate={getTheProfile} onCancel={handleCancel} />);
  };

  const editDefaults = () => {
    setDefaultFormActive(true);
    setDefaultFormDiv(<DefaultParametersForm obj={defaultData} onUpdate={getTheDefaultsAgain} />);
  };

  return (
    <>
      <div style={{ display: 'flex', margin: '20px' }}>
        <div style={{ width: '40%', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ color: '#FFFFEA', marginBottom: '10px' }}>{user.displayName}</h3>
          <img src={profileData.image || '/blank-profile-picture.png'} alt="profile" style={{ maxWidth: '300px' }} />
          {profileData.bio === undefined ? <p style={{ fontSize: '20px', color: '#FFFFEA', marginTop: '10px' }}>No bio yet</p> : <p style={{ fontSize: '20px', color: '#FFFFEA', marginTop: '10px' }}>Bio: {profileData.bio}</p>}
          {editActive ? editText : <Button onClick={editProfile} className="card-button" style={{ width: '300px' }}>Edit Profile</Button>}
        </div>
        <div style={{ width: '60%' }}>
          <div style={{ color: '#FFFFEA' }}>
            <h3>Default Shot Parameters</h3>
            <p>Beans: {defaultData.beans !== undefined && defaultData.beans !== '' ? `${defaultBeans.brand} ${defaultBeans.name}` : 'Default Beans not set'}</p>
            <p>Machine: {defaultMachine ? `${defaultMachine.brand} ${defaultMachine.name}` : 'Default Machine not set'}</p>
            <p>Grinder: {defaultGrinder ? `${defaultGrinder.brand} ${defaultGrinder.name}` : 'Default Grinder not set'}</p>
            <p>Pressure: {defaultData.pressure !== undefined && defaultData.pressure !== '' ? `${defaultData.pressure} Bar` : 'Default Pressure not set'}</p>
            <p>Temperature: {defaultData.temperature !== undefined && defaultData.temperature !== '' ? `${defaultData.temperature}° Fahrenheit` : 'Default Temperature not set'}</p>
            <p>Prep notes: {defaultData.prep !== undefined && defaultData.prep !== '' ? defaultData.prep : 'Default Prep Notes not set'}</p>
            <p>Dose: {defaultData.dose !== undefined && defaultData.dose !== '' ? defaultData.dose : 'Default Dose not set'}</p>
          </div>
          {defaultFormActive === false ? <Button onClick={editDefaults} className="card-button">Set Defaults</Button> : ''}
          <div>
            {defaultFormDiv}
          </div>
        </div>
      </div>
    </>
  );
}
