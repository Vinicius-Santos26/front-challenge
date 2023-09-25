
import { SocialVulnerability } from '../types/socialVulnerability';
import api from './api';

export async function getSocialVulnerabilities(): Promise<SocialVulnerability[]> {
  const { data } = await api.get('/social-vulnerabilities');

  return data;
}
