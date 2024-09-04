import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL SHOTS
const getShots = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/shots.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET ALL SHOTS MADE BY A SINGLE USER
const getShotsForSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/shots.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET A SINGLE SHOT
const getSingleShot = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/shots/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// CREATE SHOT
const createShot = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/shots.json`, {
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

// UPDATE SHOT
const updateShot = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/shots/${payload.firebaseKey}.json`, {
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

// DELETE SHOT
const deleteShot = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/shots/${firebaseKey}.json`, {
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
  getShots, getShotsForSingleUser, getSingleShot, createShot, updateShot, deleteShot,
};
