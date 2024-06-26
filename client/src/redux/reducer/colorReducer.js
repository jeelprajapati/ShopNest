import {
  CLEAR_ERROR,
  FAIL_COLORS,
  FETCH_COLORS,
  LOADING_COLORS,
} from "../../assets/constants/standardConstants";

const colorReducer = (state = { colors: [] }, action) => {
  switch (action.type) {
    case LOADING_COLORS:
      return {
        loading: true,
        colors: [],
      };
    case FETCH_COLORS:
      return {
        loading: false,
        colors: action.payload,
      };
    case FAIL_COLORS:
      return {
        loading: false,
        colors: [],
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

export default colorReducer;
