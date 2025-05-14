import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/common/ThemeProvider';
import { Toaster } from './components/common/Toaster';
import { AuthProvider } from './components/auth/AuthProvider';
import { Home } from './pages/Home';
import { TherapySession } from './pages/TherapySession';
import { Resources } from './pages/Resources';
import { Profile } from './pages/Profile';
import { Layout } from './components/common/Layout';

// Add future flags for React Router v7 compatibility
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router future={router.future}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/session" element={<TherapySession />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
