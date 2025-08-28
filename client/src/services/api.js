import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const transformText = async (text, tone) => {
  try {
    const response = await axios.post(`${API_URL}/transform`, {
      text,
      tone,
    });
    return response.data.transformedText;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'An unexpected error occurred.';
    throw new Error(errorMessage);
  }
};
