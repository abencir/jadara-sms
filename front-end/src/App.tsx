import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/shared/Layout'
import './App.css'
import MainPage from './pages/landingpage'
import StudentDashboard from './pages/StudentDashboard'
import LoginPage from './pages/login'
import SignUpPage from './pages/signup'
import CourseCrudPage from './components/CourseCrudPage'
import UpdateProfile from './pages/UpdateProfile'
import EventPage from './pages/EventPage'
import AdminDashboard from './pages/AdminDashboard'
import Unauthorized from './pages/Unauthorized'
import PrivateRoute from './components/PravateRoute'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Layout><MainPage /></Layout>} />
        <Route path='/login' element={<Layout><LoginPage /></Layout>} />
        <Route path='/register' element={<Layout><SignUpPage /></Layout>} />
        <Route path='/unauthorized' element={<Layout><Unauthorized /></Layout>} />

        {/* Protected routes */}
        <Route 
          path='/studentdashboard'
          element={
            <PrivateRoute allowedRoles={['Student']}>
              <Layout><StudentDashboard /></Layout>
            </PrivateRoute>
          }
        />

        <Route 
          path='/course'
          element={
            <PrivateRoute allowedRoles={['Admin']}>
              <Layout><CourseCrudPage /></Layout>
            </PrivateRoute>
          }
        />

        <Route 
          path='/updateprofile'
          element={
            <PrivateRoute>
              <Layout><UpdateProfile /></Layout>
            </PrivateRoute>
          }
        />

        <Route 
          path='/eventpage'
          element={
            <PrivateRoute>
              <Layout><EventPage /></Layout>
            </PrivateRoute>
          }
        />

        <Route 
          path='/admindashboard'
          element={
            <PrivateRoute allowedRoles={['Admin']}>
              <Layout><AdminDashboard /></Layout>
            </PrivateRoute>
          }
        />

        <Route 
          path='/profile'
          element={
            <PrivateRoute>
              <Layout><UpdateProfile /></Layout>
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  )
}

export default App
