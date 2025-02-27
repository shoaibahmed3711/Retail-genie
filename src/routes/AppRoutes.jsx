import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = React.lazy(() => import('../auth/login/login'));
const Register = React.lazy(() => import('../auth/sign-up/sign-up'));
const VerifyEmail = React.lazy(() => import('../auth/VerifyEmail/VerifyEmail'));
const ForgotPassword = React.lazy(() => import('../auth/ForgotPassword/ForgotPassword'));
const ResetPassword = React.lazy(() => import('../auth/ResetPassword/ResetPassword'));

const AdminDashboard = React.lazy(() => import('../pages/ownerPanel/overview/overview'));
const BuyerDashboard = React.lazy(() => import('../pages/panels/buyer/overview/overview'));
const BrandOwnerDashboard = React.lazy(() => import('../pages/ownerPanel/overview/overview'));
const BrandManagerDashboard = React.lazy(() => import('../pages/panels/brand-manager/dashboard/dashboard'));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
  </div>
);

// Protected route wrapper
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (!currentUser.isEmailVerified && window.location.pathname !== '/verify-email') {
    return <Navigate to="/verify-email" replace />;
  }
  
  if (requiredRole && currentUser.role !== requiredRole) {
    const dashboardRoutes = {
      ADMIN: '/admin-dashboard',
      BUYER: '/buyer-dashboard',
      BRAND_OWNER: '/brand-owner-dashboard',
      BRAND_MANAGER: '/brand-manager-dashboard'
    };
    return <Navigate to={dashboardRoutes[currentUser.role] || '/dashboard'} replace />;
  }
  
  return children;
};

// Public route wrapper
const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (currentUser?.isEmailVerified) {
    const dashboardRoutes = {
      ADMIN: '/admin-dashboard',
      BUYER: '/buyer-dashboard',
      BRAND_OWNER: '/brand-owner-dashboard',
      BRAND_MANAGER: '/brand-manager-dashboard'
    };
    return <Navigate to={dashboardRoutes[currentUser.role] || '/dashboard'} replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="/forgot-password" element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        } />
        <Route path="/reset-password" element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        } />

        {/* Email Verification Route */}
        <Route path="/verify-email" element={
          <ProtectedRoute>
            <VerifyEmail />
          </ProtectedRoute>
        } />

        {/* Protected Dashboard Routes */}
        <Route path="/admin-dashboard/*" element={
          <ProtectedRoute requiredRole="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/buyer-dashboard/*" element={
          <ProtectedRoute requiredRole="BUYER">
            <BuyerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/brand-owner-dashboard/*" element={
          <ProtectedRoute requiredRole="BRAND_OWNER">
            <BrandOwnerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/brand-manager-dashboard/*" element={
          <ProtectedRoute requiredRole="BRAND_MANAGER">
            <BrandManagerDashboard />
          </ProtectedRoute>
        } />

        {/* Default Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;