import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL PROFILES
const getProfiles = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET ALL PROFILES MADE BY A SINGLE USER
const getProfileForSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET A SINGLE PROFILE
const getSingleProfile = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// CREATE PROFILE
const createProfile = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE PROFILE
const updateProfile = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE PROFILE
const deleteProfile = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getProfiles, getProfileForSingleUser, getSingleProfile, createProfile, updateProfile, deleteProfile,
};
