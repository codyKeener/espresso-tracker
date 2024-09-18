import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL DEFAULTS
const getDefaults = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/defaults.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET ALL DEFAULTS MADE BY A SINGLE USER
const getDefaultForSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/defaults.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET A SINGLE DEFAULT
const getSingleDefault = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/defaults/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// CREATE DEFAULT
const createDefault = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/defaults.json`, {
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

// UPDATE DEFAULT
const updateDefault = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/defaults/${payload.firebaseKey}.json`, {
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

// DELETE DEFAULT
const deleteDefault = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/defaults/${firebaseKey}.json`, {
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
  getDefaults, getDefaultForSingleUser, getSingleDefault, createDefault, updateDefault, deleteDefault,
};
