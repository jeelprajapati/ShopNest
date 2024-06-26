import {
  CLEAR_ERROR,
  FAIL_SINGLE_PRODUCT,
  FETCH_SINGLE_PRODUCT,
  LOADING_SINGLE_PRODUCT,
} from "../../assets/constants/productConstants";

const initialState = {
  loading: false,
  product: {},
  error: null,
};

const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SINGLE_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SINGLE_PRODUCT:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case FAIL_SINGLE_PRODUCT:
      return {
        ...state,
        loading: false,
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

export default singleProductReducer;
