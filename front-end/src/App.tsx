import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import './App.css';
import MainPage from './pages/landingpage';
import StudentDashboard from './pages/StudentDashboard';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import AdminDashboard from './pages/AdminDashboard'
import UpdateProfile from './pages/UpdateProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Layout><LoginPage /></Layout>}/>
        <Route path='/register' element={<Layout><SignUpPage /></Layout>}/>
        <Route path='/' element={<Layout><MainPage /></Layout>}/>
        <Route path='/studentdashboard' element={<Layout><StudentDashboard/></Layout>}/>
        <Route path='/admindashboard' element={<Layout><AdminDashboard/></Layout>}/>
        <Route path='/profile' element={<Layout><UpdateProfile/></Layout>}/>
      </Routes>
    </Router>
  );
}

export default App;
