import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { CircularProgress, Stack } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import LandingPage from './pages/client/LandingPage';

const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const ClientDashboard = lazy(() => import('./pages/client/ClientDashboard'));
const MarketExplorer = lazy(() => import('./pages/client/MarketExplorer'));
const OrdersPage = lazy(() => import('./pages/client/OrdersPage'));
const PortfolioPage = lazy(() => import('./pages/client/PortfolioPage'));
const WalletPage = lazy(() => import('./pages/client/WalletPage'));
const WatchlistsPage = lazy(() => import('./pages/client/WatchlistsPage'));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'));
const AdminInstrumentsPage = lazy(() => import('./pages/admin/AdminInstrumentsPage'));
const AdminWalletPage = lazy(() => import('./pages/admin/AdminWalletPage'));
const AdminSystemPage = lazy(() => import('./pages/admin/AdminSystemPage'));
const AdminAccessTokensPage = lazy(() => import('./pages/admin/AdminAccessTokensPage'));

const Loader = () => (
  <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '60vh' }}>
    <CircularProgress color="primary" />
  </Stack>
);

const AuthenticatedRoute = ({ children }: { children: JSX.Element }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { token, user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!token || !user?.roles.includes('admin')) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/app"
            element={
              <AuthenticatedRoute>
                <MainLayout />
              </AuthenticatedRoute>
            }
          >
            <Route index element={<ClientDashboard />} />
            <Route path="market" element={<MarketExplorer />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="watchlists" element={<WatchlistsPage />} />
          </Route>

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminUsersPage />} />
            <Route path="instruments" element={<AdminInstrumentsPage />} />
            <Route path="wallet" element={<AdminWalletPage />} />
            <Route path="system" element={<AdminSystemPage />} />
            <Route path="access-tokens" element={<AdminAccessTokensPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
