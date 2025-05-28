import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import './App.css';
import MainPage from './pages/landingpage';
import StudentDashboard from './pages/StudentDashboard';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import CourseCrudPage from './components/CourseCrudPage';
import './App.css'
import UpdateProfile from './pages/UpdateProfile';
import EventPage from './pages/EventPage';


import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout><MainPage /></Layout>} />
        <Route path='/login' element={<Layout><LoginPage /></Layout>} />
        <Route path='/register' element={<Layout><SignUpPage /></Layout>} />
        <Route path='/studentdashboard' element={<Layout><StudentDashboard /></Layout>} />
        <Route path='/course' element={<Layout><CourseCrudPage /></Layout>} />
        <Route path='/updateprofile' element={<Layout><UpdateProfile /></Layout>} />
        <Route path='/eventpage' element={<Layout><EventPage /></Layout>} />
        <Route path='/' element={<Layout><MainPage /></Layout>}/>
        <Route path='/admindashboard' element={<Layout><AdminDashboard/></Layout>}/>
      </Routes>
    </Router>
  );
}

export default App;
