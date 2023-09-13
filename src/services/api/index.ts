import { mockAPI } from './base';

export const mockSignIn = async (email: string, password: string) => {
  try {
    const response = await mockAPI.post('auth/signin', { email, password });
    return response?.data;
  } catch (e) {
    console.log(e);
  }
};
