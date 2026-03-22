import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import CitizenForm from './pages/citizen/CitizenForm';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import CollectorDashboard from './pages/collector/CollectorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/citizen" element={
                <ProtectedRoute allowedRoles={['CITIZEN']}><CitizenDashboard /></ProtectedRoute>
              } />
              <Route path="/citizen/new" element={
                <ProtectedRoute allowedRoles={['CITIZEN']}><CitizenForm /></ProtectedRoute>
              } />
              <Route path="/manager" element={
                <ProtectedRoute allowedRoles={['MANAGER']}><ManagerDashboard /></ProtectedRoute>
              } />
              <Route path="/collector" element={
                <ProtectedRoute allowedRoles={['COLLECTOR']}><CollectorDashboard /></ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;