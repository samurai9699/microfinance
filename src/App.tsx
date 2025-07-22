import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import UserProfile from './pages/UserProfile';
import BusinessPlanning from './pages/BusinessPlanning';
import LendingCircle from './pages/LendingCircle';
import Analytics from './pages/Analytics';
import Learning from './pages/Learning';
import LoginForm from './components/auth/LoginForm';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/onboarding/*" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/business-planning" element={<ProtectedRoute><BusinessPlanning /></ProtectedRoute>} />
          <Route path="/lending-circles" element={<ProtectedRoute><LendingCircle /></ProtectedRoute>} />
          <Route path="/learning" element={<ProtectedRoute><Learning /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/\" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;