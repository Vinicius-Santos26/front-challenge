import { JobLevel } from '../types/jobLevel';

import api from './api';

export async function getJobLevels(): Promise<JobLevel[]> {
  const { data } = await api.get('/job-levels');

  return data;
}
