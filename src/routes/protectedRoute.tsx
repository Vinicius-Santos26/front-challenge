import {
  Navigate, useLocation,
} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type ProtectedRouteProps = {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const {user} = useAuth();

  const location = useLocation();

  
  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location }}/>;
  }

  return children;
};