import { createStore, action, thunk } from "easy-peasy";
import api from "./api";

const store = createStore({
  auth: {
    isAuthenticated: null,
    user: null,
    error: false, 

    login: thunk(async (actions, payload) => {
      try {
        const response = await api.post("/login", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status !== 200) {
          actions.setError("Login failed. Please check your credentials.");

          actions.setUser({ user: null, isAuthenticated: false });

        }

        const data = await response.data.user.email;
        actions.setUser({ user: data, isAuthenticated: true });
      } catch (error) {
 
        console.error("Login failed:", error.message);

 
        actions.setError("Login failed. Please check your credentials.");

        actions.setUser({ user: null, isAuthenticated: false });
      }
    }),

    setUser: action((state, payload) => {
      state.user = payload.user;
      state.isAuthenticated = payload.isAuthenticated;
      state.error = null; 
    }),

    setError: action((state, payload) => {
      state.error = payload;
    }),
  },
});

export default store;
