import {
  CLEAR_ERROR,
  FAIL_ORDERS,
  FETCH_ORDERS,
  LOADING_ORDERS,
} from "../../assets/constants/orderConstants.js";

const orderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case LOADING_ORDERS:
      return {
        loading: true,
        orders: [],
      };
    case FETCH_ORDERS:
      return {
        loading: false,
        orders: action.payload,
      };
    case FAIL_ORDERS:
      return {
        loading: false,
        orders: [],
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

export default orderReducer;
