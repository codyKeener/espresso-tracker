import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL MACHINES
const getMachines = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/machines.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET ALL MACHINES MADE BY A SINGLE USER
const getMachinesForSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/machines.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET A SINGLE MACHINE
const getSingleMachine = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/machines/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// CREATE MACHINE
const createMachine = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/machines.json`, {
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

// UPDATE MACHINE
const updateMachine = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/machines.json/${payload.id}`, {
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

// DELETE MACHINE
const deleteMachine = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/machines/${firebaseKey}`, {
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
  getMachines, getMachinesForSingleUser, getSingleMachine, createMachine, updateMachine, deleteMachine,
};
