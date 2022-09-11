import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserRegister from './components/user/UserRegister'
import Dashboard from './components/user/Dashboard'
import Header from './components/headerFooter/Header';
import Footer from './components/headerFooter/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/register' element={<UserRegister />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
