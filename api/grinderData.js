import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL GRINDERS
const getGrinders = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/grinders.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET ALL GRINDERS MADE BY A SINGLE USER
const getGrindersForSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/grinders.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET A SINGLE GRINDER
const getSingleGrinder = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/grinders/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// CREATE GRINDER
const createGrinder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/grinders.json`, {
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

// UPDATE GRINDER
const updateGrinder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/grinders.json/${payload.id}`, {
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

// DELETE GRINDER
const deleteGrinder = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/grinders/${firebaseKey}`, {
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
  getGrinders, getGrindersForSingleUser, getSingleGrinder, createGrinder, updateGrinder, deleteGrinder,
};
