// userReducer.js
import { LOGOUT_USER, SET_INFO } from "../constant/user";

let initialState = {
  user: JSON.parse(localStorage.getItem("USER_INFO")) || null,
};


export let userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null, 
      };
    default:
      return state;
  }
};
