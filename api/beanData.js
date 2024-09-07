import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL BEANS
const getBeans = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/beans.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET ALL BEANS MADE BY A SINGLE USER
const getBeansForSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/beans.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET A SINGLE BEAN
const getSingleBean = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/beans/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// CREATE BEAN
const createBean = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/beans.json`, {
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

// UPDATE BEAN
const updateBean = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/beans/${payload.firebaseKey}.json`, {
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

// DELETE BEAN
const deleteBean = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/beans/${firebaseKey}`, {
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
  getBeans, getBeansForSingleUser, getSingleBean, createBean, updateBean, deleteBean,
};
