import axios from 'axios';

// const API_BASE_URL = 'http://www.mypress.jp:3003'; // json-server用
const API_BASE_URL = 'http://127.0.0.1:8000/'; // Django用

const client = axios.create({  
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

export function signup(params) {
  return client.post('signup/',params);
}

export function fetchTimer(params) {   
  return client.post('login/', params);
}

export function putTimer(params) {
  return client.put(`login/`, params);
}
