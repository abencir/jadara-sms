import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import './App.css'
import StudentDashboard from './pages/StudentDashboard';

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout><div></div></Layout>}/>
        <Route path='/studentdashboard' element={<Layout><StudentDashboard/></Layout>}/>
      </Routes>
    </Router>

  )
}

export default App
