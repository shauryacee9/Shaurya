import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Home from './pages/Home.tsx';
import ProfileSelection from './pages/ProfileSelection.tsx';
import MovieDetail from './pages/MovieDetail.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import Navbar from './pages/Navbar.tsx';
import Footer from './components/Footer.tsx';
import ListingPage from './pages/ListingPage.tsx';
import Search from './pages/Search.tsx';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return token ? <>{children}</> : <Navigate to="/login" />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user && user.role === 'admin' ? <>{children}</> : <Navigate to="/" />;
};

const ProfileRoute = ({ children }: { children: React.ReactNode }) => {
  const { selectedProfile } = useAuth();
  return selectedProfile ? <>{children}</> : <Navigate to="/profile-selection" />;
};

const AppContent = () => {
  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans selection:bg-red-600 selection:text-white">
      <Navbar />
      <main className="pb-20">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/profile-selection" element={
            <ProtectedRoute>
              <ProfileSelection />
            </ProtectedRoute>
          } />

          <Route path="/" element={
            <ProtectedRoute>
              <ProfileRoute>
                <Home />
              </ProfileRoute>
            </ProtectedRoute>
          } />

          <Route path="/tvshows" element={<ListingPage type="TV Show" />} />
          <Route path="/movies" element={<ListingPage type="Movie" />} />
          <Route path="/anime" element={<ListingPage type="Anime" />} />
          <Route path="/search" element={
            <ProtectedRoute>
              <ProfileRoute>
                <Search />
              </ProfileRoute>
            </ProtectedRoute>
          } />

          <Route path="/movie/:id" element={
            <ProtectedRoute>
              <ProfileRoute>
                <MovieDetail />
              </ProfileRoute>
            </ProtectedRoute>
          } />

          <Route path="/admin-dashboard" element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
