import {
  FAIL_CATEGORY,
  FAIL_COLORS,
  FAIL_TAGS,
  FETCH_CATEGORY,
  FETCH_COLORS,
  FETCH_TAGS,
  LOADING_CATEGORY,
  LOADING_COLORS,
  LOADING_TAGS,
} from "../assets/constants/standardConstants.js";
import makeRequesInstance from "../makeRequest.js";
const makeRequest = makeRequesInstance(null);
export const getCategory = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CATEGORY });
    const res = await makeRequest.get("/category");
    if (res.status === 200) {
      dispatch({ type: FETCH_CATEGORY, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: FAIL_CATEGORY, payload: error?.response?.data?.message });
  }
};

export const getColors = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_COLORS });
    const res = await makeRequest.get("/standard/getColors");
    if (res.status === 200) {
      dispatch({ type: FETCH_COLORS, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: FAIL_COLORS, payload: error?.response?.data?.message });
  }
};

export const getTags = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_TAGS });
    const res = await makeRequest.get("/standard/getTags");
    if (res.status === 200) {
      dispatch({ type: FETCH_TAGS, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: FAIL_TAGS, payload: error?.response?.data?.message });
  }
};
