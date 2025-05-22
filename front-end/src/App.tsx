import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import './App.css'
import StudentDashboard from './pages/StudentDashboard';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout><div></div></Layout>}/>
        <Route path='/login' element={<Layout><LoginPage /></Layout>}/>
        <Route path='/register' element={<Layout><SignUpPage /></Layout>}/>
        <Route path='/studentdashboard' element={<Layout><StudentDashboard/></Layout>}/>
      </Routes>
    </Router>

  )
}

export default App