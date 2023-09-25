import { Job } from '../types/job';
import { NewJobDto } from '../types/newJob';
import api from './api';

export async function createJob(newJob: NewJobDto) {
  const { data } = await api.post('/jobs', newJob );

  return data;
}

export async function getJobs(companyId:string): Promise<Job[]> {
  const { data } = await api.get(`/jobs/${companyId}`);

  return data;
}
