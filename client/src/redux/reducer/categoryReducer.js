import {
  CLEAR_ERROR,
  LOADING_CATEGORY,
  FETCH_CATEGORY,
  FAIL_CATEGORY,
} from "../../assets/constants/standardConstants";

const categoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case LOADING_CATEGORY:
      return {
        loading: true,
        categories: [],
      };
    case FETCH_CATEGORY:
      return {
        loading: false,
        categories: action.payload,
      };
    case FAIL_CATEGORY:
      return {
        loading: false,
        categories: [],
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

export default categoryReducer;
