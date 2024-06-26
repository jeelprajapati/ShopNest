import {
    CLEAR_ERROR,
    FAIL_TAGS,
    FETCH_TAGS,
    LOADING_TAGS,
  } from "../../assets/constants/standardConstants";
  
  const tagReducer = (state = { tags: [] }, action) => {
    switch (action.type) {
      case LOADING_TAGS:
        return {
          loading: true,
          tags: [],
        };
      case FETCH_TAGS:
        return {
          loading: false,
          tags: action.payload,
        };
      case FAIL_TAGS:
        return {
          loading: false,
          tags: [],
          error: action.payload,
        };
      case CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default tagReducer;
  