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
    getDefaultForSingleUser(user.uid).then((defaults) => {
      getSingleBean(defaults[0].beans).then(setDefaultBeans);
      getSingleMachine(defaults[0].machine).then(setDefaultMachine);
      getSingleGrinder(defaults[0].grinder).then(setDefaultGrinder);
    });
  }, []);

  useEffect(() => {
    getTheProfile();
  }, []);

  useEffect(() => {
    getTheDefaults();
  });

  const handleCancel = () => {
    setEditActive(false);
  };

  const editProfile = () => {
    setEditActive(true);
    setEditText(<ProfileForm obj={profileData} onUpdate={getTheProfile} onCancel={handleCancel} />);
  };

  const handleDefaultsCancel = () => {
    setDefaultFormActive(false);
    setDefaultFormDiv('');
  };

  const editDefaults = () => {
    setDefaultFormActive(true);
    setDefaultFormDiv(<DefaultParametersForm obj={defaultData} onUpdate={getTheDefaultsAgain} onCancel={handleDefaultsCancel} />);
  };

  return (
    <>
      <div style={{ display: 'flex', margin: '20px', justifyContent: 'space-between' }}>
        <div style={{ minWidth: '400px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ color: '#E9EBE8', marginBottom: '10px' }}>{user.displayName}</h2>
          <img src={profileData.image || '/blank-profile-picture.png'} alt="profile" style={{ maxWidth: '300px' }} />
          {profileData.bio === undefined ? <p style={{ fontSize: '20px', color: '#E9EBE8', marginTop: '10px' }}>No bio yet</p> : <p style={{ fontSize: '20px', color: '#E9EBE8', marginTop: '10px' }}>Bio: {profileData.bio}</p>}
          {editActive ? editText : <Button onClick={editProfile} className="card-button" style={{ width: '300px' }}>Edit Profile</Button>}
        </div>
        <div style={{ minWidth: '600px' }}>
          <div style={{
            border: '2px solid #E9EBE8', borderRadius: '10px', padding: '10px', fontSize: '18px',
          }}
          >
            <div style={{ color: '#E9EBE8' }}>
              <h3>Default Shot Parameters</h3>
              <p><strong>Beans:</strong> {defaultData.beans !== undefined && defaultData.beans !== '' ? `${defaultBeans.brand} ${defaultBeans.name}` : 'Default Beans not set'}</p>
              <p><strong>Machine:</strong> {defaultMachine ? `${defaultMachine.brand} ${defaultMachine.name}` : 'Default Machine not set'}</p>
              <p><strong>Grinder:</strong> {defaultGrinder ? `${defaultGrinder.brand} ${defaultGrinder.name}` : 'Default Grinder not set'}</p>
              <p><strong>Pressure:</strong> {defaultData.pressure !== undefined && defaultData.pressure !== '' ? `${defaultData.pressure} Bar` : 'Default Pressure not set'}</p>
              <p><strong>Temperature:</strong> {defaultData.temperature !== undefined && defaultData.temperature !== '' ? `${defaultData.temperature}° Fahrenheit` : 'Default Temperature not set'}</p>
              <p><strong>Dose:</strong> {defaultData.dose !== undefined && defaultData.dose !== '' ? defaultData.dose : 'Default Dose not set'}</p>
              <p><strong>Grind size:</strong> {defaultData.grind_size !== undefined && defaultData.grind_size !== '' ? defaultData.grind_size : 'Default Grind Size not set'}</p>
              <p><strong>Prep notes:</strong> {defaultData.prep !== undefined && defaultData.prep !== '' ? defaultData.prep : 'Default Prep Notes not set'}</p>
            </div>
            {defaultFormActive === false ? <Button onClick={editDefaults} className="card-button">Set Defaults</Button> : ''}
            <div>
              {defaultFormDiv}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
