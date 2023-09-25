import { AuthDto } from '../types/auth';

import api from './api';

export async function getUsers(): Promise<AuthDto> {
  const { data } = await api.get('/users');

  return data;
}
