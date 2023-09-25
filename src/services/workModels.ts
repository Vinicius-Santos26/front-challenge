
import { WorkModel } from '../types/workModel';
import api from './api';

export async function getWorkModels(): Promise<WorkModel[]> {
  const { data } = await api.get('/work-models');

  return data;
}
