import { JobType } from '../types/jobType';

import api from './api';

export async function getJobTypes(): Promise<JobType[]> {
  const { data } = await api.get('/job-types');

  return data;
}
