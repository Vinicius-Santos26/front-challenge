import { createContext,  useState,  } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { SigninDto } from '../types/signin';
import { signIn } from '../services/auth';
import { Role } from '../types/role';
import * as api from '../services/api';
import { Recruiter } from '../types/recruiter';
import { User } from '../types/user';
import { getRecruiterByUserId } from '../services/recruiters';
import axios from 'axios';

type AuthContextData  = {
  user: User | null,
  role: Role | null,
  recruiter: Recruiter | null,
  onLogin(signin: SigninDto): Promise<void>,
  onLogout(): void
}

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState<Role | null>(null);
  const [user, setUser] = useState<User| null>(null);
  const [recruiter, setRecruiter] = useState<Recruiter| null>(null);

  const handleLogin = async (signin: SigninDto) => {
    const {accessToken, user} = await signIn(signin);
   
    sessionStorage.setItem("@App:token", accessToken);

    setUser(user);
    setRole(user.role);

    if(user.role === Role.RECRUITER){
      const recruiter = await getRecruiterByUserId(user.id);
      setRecruiter(recruiter);
    }

    const origin = location.state?.from?.pathname || '/dashboard';
    navigate(origin);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const value = {
    user,
    role,
    recruiter,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
