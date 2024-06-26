import makeRequesInstance from "../makeRequest.js";
import {
  FAIL_ORDERS,
  FETCH_ORDERS,
  LOADING_ORDERS,
} from "../assets/constants/orderConstants.js";

export const getOrders = (token) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_ORDERS });
    const makeRequest = makeRequesInstance(token);
    const res = await makeRequest.get("/order/getOrderByUserId");
    if (res.status === 200) {
      dispatch({ type: FETCH_ORDERS, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: FAIL_ORDERS, payload: error?.response?.data?.message });
  }
};
