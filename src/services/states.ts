import { State } from '../types/state';

import api from './api';

export async function getStates(): Promise<State[]> {
  const { data } = await api.get('/states');

  return data;
}
