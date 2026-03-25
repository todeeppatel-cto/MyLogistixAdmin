import axios from "axios";
import { getRequest, getSuccess, getFailed, getError, updateSuccess } from "./planSlice";
import { API_BASE_URL } from "../../constants/apiBaseUrl";

// 🟢 Get All Plans (no id param here)
export const getAllPlans = () => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`${API_BASE_URL}/PlanList`);
    
    // ✅ Only treat as error if success is false or result.data.error exists
    if (result.data.success === false || result.data.error) {
      dispatch(getFailed(result.data.message || "Failed to fetch plans"));
    } else {
      dispatch(getSuccess(result.data)); // result.data must be array
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
  }
};


// 🟢 Create Plan
export const createPlan = (planData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.post(`${API_BASE_URL}/PlanCreate`, planData);
    if (result.data) {
      dispatch(getSuccess(result.data));
      return result.data; // Return created plan data if needed
    } else {
      dispatch(getFailed("Failed to create plan"));
      throw new Error("Failed to create plan");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
    throw new Error(errorMessage);
  }
};

// 🟢 Update Plan
export const updatePlan = (id, updatedData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.put(`${API_BASE_URL}/Plan/${id}`, updatedData);
    if (result.data) {
      dispatch(updateSuccess({ id, updatedData: result.data }));
      return result.data;  // return success data
    } else {
      dispatch(getFailed("Failed to update plan"));
      throw new Error("Failed to update plan");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
    throw new Error(errorMessage);
  }
};

// 🟢 Delete a Single Plan
export const deletePlan = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    await axios.delete(`${API_BASE_URL}/Plan/${id}`);
    dispatch(getSuccess("Plan deleted successfully!"));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
  }
};

// 🟢 Delete All Plans (no id param here)
export const deleteAllPlans = () => async (dispatch) => {
  dispatch(getRequest());
  try {
    await axios.delete(`${API_BASE_URL}/Plans`);
    dispatch(getSuccess("All plans deleted successfully!"));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
  }
};
