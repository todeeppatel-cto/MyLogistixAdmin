import axios from "axios";
import { getRequest, getSuccess, getFailed, getError, updateSuccess } from "./noticeSlice";
import { API_BASE_URL } from "../../constants/apiBaseUrl";

// 🟢 Get All Notices
export const getAllNotices = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(
      `${API_BASE_URL}/${address}List/${id}`
    );
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
  }
};

// 🟢 Update Notice
export const updateNotice = (id, updatedData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.put(
      `${API_BASE_URL}/Notice/${id}`,
      updatedData
    );
    if (result.data) {
      dispatch(updateSuccess({ id, updatedData: result.data }));
    } else {
      dispatch(getFailed("Failed to update notice"));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
  }
};
