import { AuthDto } from '../types/auth';
import { SigninDto } from '../types/signin';
import { SignupDto } from '../types/signup';
import api from './api';

export async function signIn(signin: SigninDto): Promise<AuthDto> {
  const { data } = await api.post<AuthDto>('/auth/signin', signin);

  return data;
}

export async function signUp(signup: SignupDto): Promise<AuthDto> {
  const { data } = await api.post<AuthDto>('/auth/signup', signup);

  return data;
}
