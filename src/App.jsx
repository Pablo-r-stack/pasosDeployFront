// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ArticlePage from './pages/ArticlePage';
import UserProfilePage from './pages/UserProfilePage';
import Footer from './components/Footer';
import ArticleForm from './components/ArticleForm';
import MobileNav from './components/MobileNav';
import HeaderNav from './components/HeaderNav';
import Onboarding from './pages/Onboarding';
import UserArticles from './pages/UserArticles';
import { AuthProvider } from './context/AuthProvider';
import Favorites from './pages/Favorites';
import ProtectedNode from './components/ProtectedNode/ProtectedNode';
import ErrorPage from './pages/ErrorPage';
import DonationRequestForm from './components/DonateForm';
import PopUpAlert from './components/Modals/PopUpAlert';
import Modal1 from './components/Modals/Modal1';
import Confirmed from './pages/Confirmed';
import Requests from './pages/Requests';
import ConfirmRequest from './pages/ConfirmRequest';
import { ProductsProvider } from './context/ProductsProvider';
import EditUserData from './pages/EditUserData';

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <Router>
          <AppContent />
        </Router>
      </ProductsProvider >
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  //add routes wich wont render Header or Nav components.
  const showHeaderNav = !['/login', '/register', '/profile', '/onboarding', '/notFound'].includes(location.pathname);

  return (
    <>
      {showHeaderNav && <HeaderNav />}
      <Routes>
        {/* Public Routes*/}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="*" element={<Navigate to="notFound" />} />
        <Route path={"/notFound"} element={<ErrorPage />} />
        <Route path={'/confirmRequest'} element={<ConfirmRequest />} />
        <Route path='/confirmed' element={<Confirmed />} />
        {/* Protected Routes */}
        <Route element={<ProtectedNode />}>
          <Route path='/editUserData/:id' element={<EditUserData />} />
          <Route path='/update/:id' element={<ArticleForm />} />
          <Route path="/upload" element={<ArticleForm />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path='/userArticles' element={<UserArticles />} />
          <Route path="/donate" element={<DonationRequestForm />} />
          <Route path='/request' element={<Requests />} />
        </Route>
      </Routes>
      <MobileNav />
    </>
  );
}

export default App;