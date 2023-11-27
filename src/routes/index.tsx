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
  Signup,
  Users,
} from '../pages';
import { Layout } from '../components/Layout';
import { ProtectedRoute } from './protectedRoute';
import { JobDetail } from '../pages/jobDetail';
import { Applications } from '../pages/applications';
import { ApplicationDetail } from '../pages/applicationDetail';
import { RecruitmentFlows } from '../pages/recruitmentFlows';
import { JobRecruitment } from '../pages/jobRecruitment';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
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
           <Route
            path="/dashboard/jobs/:jobId"
            element={
              <ProtectedRoute>
                <JobDetail />
              </ProtectedRoute>
            }
            handle={{
              crumb: (pathName: string) => ({
                text: 'Detalhe da vaga',
                to: pathName,
              }),
            }}
          />
          <Route
            path="/dashboard/jobs/recruitment/:jobId"
            element={
              <ProtectedRoute>
                <JobRecruitment />
              </ProtectedRoute>
            }
            handle={{
              crumb: (pathName: string) => ({
                text: 'Recrutamento da vaga',
                to: pathName,
              }),
            }}
          />
        </Route>
        <Route
          path="/dashboard/applications"
          handle={{
            crumb: (pathName: string) => ({ text: 'Aplicações', to: pathName }),
          }}
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            }
          />
          
           <Route
            path="/dashboard/applications/:applicationId"
            element={
              <ProtectedRoute>
                <ApplicationDetail />
              </ProtectedRoute>
            }
            handle={{
              crumb: (pathName: string) => ({
                text: 'Detalhe da aplicação',
                to: pathName,
              }),
            }}
          />
        </Route>
        <Route
          path="/dashboard/recruitment-flows"
          element={
            <ProtectedRoute>
              <RecruitmentFlows />
            </ProtectedRoute>
          }
          handle={{
            crumb: (pathName: string) => ({ text: 'Fluxos de Recrutamento', to: pathName }),
          }}
        />
      </Route>
    </Route>
  )
);
