import {
  CLEAR_ERROR,
  FAIL_PRODUCTS,
  FETCH_PRODUCTS,
  LOADING_PRODUCTS,
} from "../../assets/constants/productConstants";

const initialState = {
  loading: false,
  products: [],
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTS:
      if (action.payload.page === 1) {
        return {
          ...state,
          loading: false,
          products: action.payload.data,
        };
      } else {
        return {
          ...state,
          loading: false,
          products: [...state.products, ...action.payload.data],
        };
      }
    case FAIL_PRODUCTS:
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

export default productReducer;
