import axios from 'axios';
import { User } from '../types/User';

const API_URL = 'http://localhost:5000/api/auth/';

export const authenticate = async (username: string, password: string): Promise<User | null> => {
  try {
    const response = await axios.post(API_URL + 'login', { username, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Authentication failed', error);
    return null;
  }
};
