import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import {
  Companies,
  Dashboard,
  Fields,
  Home,
  Jobs,
  NewJob,
  Signin,
  Users,
} from '../pages';
import { Layout } from '../components/Layout';
import { ProtectedRoute } from './protectedRoute';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/dashboard"
        handle={{
          crumb: (pathName: string) => ({ text: 'Dashboard', to: pathName }),
        }}
      >
        <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
          handle={{
            crumb: (pathName: string) => ({ text: 'Usuários', to: pathName }),
          }}
        />
        <Route
          path="/dashboard/companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
          handle={{
            crumb: (pathName: string) => ({ text: 'Empresas', to: pathName }),
          }}
        />
        <Route
          path="/dashboard/fields"
          element={
            <ProtectedRoute>
              <Fields />
            </ProtectedRoute>
          }
          handle={{
            crumb: (pathName: string) => ({ text: 'Campos', to: pathName }),
          }}
        />
        <Route
          path="/dashboard/jobs"
          handle={{
            crumb: (pathName: string) => ({ text: 'Vagas', to: pathName }),
          }}
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/jobs/new"
            element={
              <ProtectedRoute>
                <NewJob />
              </ProtectedRoute>
            }
            handle={{
              crumb: (pathName: string) => ({
                text: 'Nova vaga',
                to: pathName,
              }),
            }}
          />
        </Route>
      </Route>
    </Route>
  )
);
