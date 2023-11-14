import { User } from '../types/user';

import api from './api';

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get('/users');

  return data;
}

export async function InactiveUser(userId: string): Promise<void> {
  await api.delete(`/users/${userId}`);
}
