// src/pages/UserProfilePage.jsx
import '../styles/Styles.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const UserProfilePage = () => {

  const auth = useAuth();
  const {name, lastName, id_user} = auth.user;
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logOut();
    navigate('/login');
  };

  return (
    <div className="mb-5 profile-container">
      <div className="profile-header">
        <div className="profile-pic"><img src="/img/logo.webp" alt="logo" /></div>
        <div className="profile-name">{name} {lastName}</div>
      </div>
      <div className="profile-options">
        <div>
        <Link to={'/userArticles'}>Mis Productos</Link>
        </div>
        {/* <div>Valoraciones</div> */}
        {/* <div>Mensajes</div> */}
        <div>
          {/* <Link to={`/editUserData/${id_user}`}>Editar Datos</Link> */}
        </div>
        <div>Privacidad</div>
        <div>Ayuda</div>
        <div>
        <Link to={'/onboarding'}>Acerca de</Link>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default UserProfilePage;

