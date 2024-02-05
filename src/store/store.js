import { createStore, action,thunk } from 'easy-peasy';
import api from './api';

const store = createStore({
  auth: {
    isAuthenticated: false,
    user: 'ityftf',
    login: thunk(async (state, payload) => {

        const response = await api.post('/login', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.data;
        console.log(data)
        state.user = data;  
        state.isAuthenticated = true; 
        console.log(state)
  
    }),
  },
});

export default store;
