import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <div className="page-container">
      <Header />
      <div className="page-content">
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/*' element={sessionStorage.getItem("userId") !== null ? <HomePage /> : <LoginPage />} />
          {sessionStorage.getItem("userId") !== null &&
            <> { /*Protected routes */}
              <Route path='/' element={<HomePage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/profile/:id' element={<ProfilePage />} />
            </>
          }
        </Routes>
      </div>
      <Footer />
    </div>
  );
}