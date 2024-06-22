import { User } from '@/types/User';

const API_URL = 'http://localhost:5000/api/auth/';

export const authenticate = async (username: string, password: string): Promise<User | null> => {
  try {
    const response = await fetch(API_URL + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    }
    return null;
  } catch (error) {
    console.error('Authentication failed', error);
    return null;
  }
};
