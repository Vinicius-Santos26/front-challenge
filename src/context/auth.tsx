import { createContext,  useState,  } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { SigninDto } from '../types/signin';
import { signIn, signUp } from '../services/auth';
import { Role } from '../types/role';
import { Recruiter } from '../types/recruiter';
import { User } from '../types/user';
import { getRecruiterByUserId } from '../services/recruiters';
import { SignupDto } from '../types/signup';
import { Candidate } from '../types/candidate';
import { getCandidateByUserId } from '../services/candidates';

type AuthContextData  = {
  user: User | null,
  role: Role | null,
  recruiter: Recruiter | null,
  candidate: Candidate | null,
  onLogin(signin: SigninDto): Promise<void>,
  onSignUp(signupu: SignupDto): Promise<void>,
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
  const [candidate, setCandidate] = useState<Candidate| null>(null);

  const handleLogin = async (signin: SigninDto) => {
    const {accessToken, user} = await signIn(signin);
   
    sessionStorage.setItem("@App:token", accessToken);

    setUser(user);
    setRole(user.role);

    if(user.role === Role.RECRUITER){
      const recruiter = await getRecruiterByUserId(user.id);
      setRecruiter(recruiter);
    } else if( user.role === Role.CANDIDATE){
      const candidate = await getCandidateByUserId(user.id);
      setCandidate(candidate);
    }

    const origin = location.state?.from?.pathname || '/dashboard';
    navigate(origin);
  };

  const handleSignUp = async (signup : SignupDto) => {
    const {accessToken, user} = await signUp(signup);
   
    sessionStorage.setItem("@App:token", accessToken);

    setUser(user);
    setRole(user.role);

    if(user.role === Role.RECRUITER){
      const recruiter = await getRecruiterByUserId(user.id);
      setRecruiter(recruiter);
    }else if( user.role === Role.CANDIDATE){
      const candidate = await getCandidateByUserId(user.id);
      setCandidate(candidate);
    }

    const origin = location.state?.from?.pathname || '/dashboard';
    navigate(origin);
  }

  const handleLogout = () => {
    setUser(null);
  };

  const value = {
    user,
    role,
    recruiter,
    candidate,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onSignUp: handleSignUp
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
