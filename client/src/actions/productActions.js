import toast from "react-hot-toast";
import {
  FAIL_FAVORITES,
  FAIL_PRODUCTS,
  FAIL_SINGLE_PRODUCT,
  FETCH_FAVORITES,
  FETCH_PRODUCTS,
  FETCH_SINGLE_PRODUCT,
  LOADING_FAVORITES,
  LOADING_PRODUCTS,
  LOADING_SINGLE_PRODUCT,
} from "../assets/constants/productConstants.js";
import makeRequesInstance from "../makeRequest.js";
export const getFavorite = (token) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_FAVORITES });
    const makeRequest = makeRequesInstance(token);
    const res = await makeRequest.get("/product/getFavoriteByUserid");
    if (res.status === 200) {
      dispatch({ type: FETCH_FAVORITES, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: FAIL_FAVORITES, payload: error?.response?.data?.message });
  }
};

export const getProducts = (url, values) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_PRODUCTS });
    const makeRequest = makeRequesInstance(null);
    const res = await makeRequest.post(url, {
      ...values,
    });
    if (res.status === 200) {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: { data: res.data, page: values.page },
      });
    }
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTS, payload: error?.response?.data?.message });
  }
};

export const addInFavorite = async (productId, token, callback) => {
  try {
    const makeRequest = makeRequesInstance(token);
    const res = await makeRequest.put(`/product/addInFavorite/${productId}`);
    if (res.status === 201) {
      toast.success(res.data);
      callback();
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_SINGLE_PRODUCT });
    const makeRequest = makeRequesInstance(null);
    const res = await makeRequest.get(`/product/single/${id}`);
    if (res.status === 200) {
      dispatch({ type: FETCH_SINGLE_PRODUCT, payload: res.data });
    }
  } catch (error) {
    dispatch({
      type: FAIL_SINGLE_PRODUCT,
      payload: error?.response?.data?.message,
    });
  }
};

export const getProductBySearch=(values)=>async(dispatch)=>{
  try {
    dispatch({ type: LOADING_PRODUCTS });
    const makeRequest = makeRequesInstance(null);
    const res = await makeRequest.post("/product/search", {
      ...values,
    });
    if (res.status === 200) {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: { data: res.data, page: values.page },
      });
    }
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTS, payload: error?.response?.data?.message });
  }
}