import axios from 'axios';
import { invoiceRequest, invoiceSuccess, invoiceFail } from './invoiceSlice';
import { API_BASE_URL } from '../../constants/apiBaseUrl';

export const generateCourierInvoices = (from, to) => async (dispatch) => {
  try {
    dispatch(invoiceRequest());

    const response = await axios.get(`${API_BASE_URL}/generate-invoices?from=${from}&to=${to}`);
    dispatch(invoiceSuccess(response.data.invoices));
  } catch (error) {
    dispatch(invoiceFail(
      error.response?.data?.msg || "Failed to generate invoices"
    ));
  }
};
