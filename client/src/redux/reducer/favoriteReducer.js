import {
    CLEAR_ERROR,
    FAIL_FAVORITES,
    FETCH_FAVORITES,
    LOADING_FAVORITES,
  } from "../../assets/constants/productConstants.js";
  
  const favoriteReducer = (state = { favorites: [] }, action) => {
    switch (action.type) {
      case LOADING_FAVORITES:
        return {
          loading: true,
          favorites: [],
        };
      case FETCH_FAVORITES:
        return {
          loading: false,
          favorites: action.payload,
        };
      case FAIL_FAVORITES:
        return {
          loading: false,
          favorites: [],
          error: action.payload,
        };
      case CLEAR_ERROR:
        return{
          ...state,
          error:null
        }
      default:
        return state;
    }
  };
  
  export default favoriteReducer;
  