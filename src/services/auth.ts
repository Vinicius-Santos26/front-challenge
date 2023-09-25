import { AuthDto } from '../types/auth';
import { SigninDto } from '../types/signin';
import api from './api';

export async function signIn(signin: SigninDto): Promise<AuthDto> {
  const { data } = await api.post<AuthDto>('/auth/signin', signin);

  return data;
}
