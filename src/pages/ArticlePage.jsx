// src/pages/ArticlePage.jsx
import '../styles/Styles.css';
import React, { useEffect, useState } from 'react';
import { MdOutlineLocationOn } from "react-icons/md";
import Button1 from '../components/Buttons/Button1';
import Button2 from '../components/Buttons/Button2';
import Carousel from '../components/Carousel';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getArticleDetails, requestArticle } from '../services/ArticleService';
import UserTag from '../components/UserTag';
import { useAuth } from '../context/AuthProvider';
import useModal from './../hooks/useModal';
import Modal1 from '../components/Modals/Modal1';
import { newRequest } from '../services/RequestService';

const ArticlePage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null)
  const { isVisible, modalMessage, showAlert, closeAlert, } = useModal();

  useEffect(() => {
    const getProductId = async () => {
      try {
        const product = await getArticleDetails(id);
        console.log(product);
        setProduct(product);
      } catch (error) {
        console.error('Error al obtener el producto', error);
      }
    };

    getProductId();
  }, [id]);

  const requestProduct = () => {
    showAlert('¿Solicitar este producto?', 'Recuerda que hasta que concretes la transacción se recomienda no solicitar otro producto.')
  };

  const confirmRequest = async () => {
    try {
      if (auth.isAuthenticated) {
         await newRequest(id, auth.user.id_user);
        navigate('/confirmed');
      }  
    } catch (error) {
      console.error(error);
    }
  }


  const checkOwner = (idOwner, idAuth) => {
    return idOwner == idAuth;
  }

  if (!product) return null;

  const { name, description, creationDate, available, state, categoryId, imageURL, userName, userLastName, userProvince, idUser } = product;

  const items = [imageURL, imageURL, imageURL];
  return (
    <>
      <div className='flex flex-col gap-4 mb-20'>
        <Carousel items={items} />
        <div className='flex flex-col gap-5 p-6 text-lg text-blueSecond'>
          <div className='flex justify-between items-center text-xl font-bold'>
            <h2>{name}</h2>
            <UserTag userName={userName} userLastName={userLastName} />
          </div>
          <div className='flex gap-2 items-center text-base'>
            <MdOutlineLocationOn className='w-5 h-5' />
            <span>{userProvince}</span>
          </div>
          <ul className='font-semibold flex flex-col gap-3'>
            <li>Descripción: <br /> <span className='font-normal text-base'>{description}</span></li>
            <li>Categoría: <span className='font-normal text-base'>{categoryId}</span></li>
            <li>Estado: <span className='font-normal text-base'>{state}</span></li>
            <li>Disponibilidad: <span className='font-normal text-base'>{available ? 'Disponible' : 'No Disponible'}</span></li>
          </ul>
          {auth.isAuthenticated && !checkOwner(idUser, auth.user.id_user) ? <Button2 onClick={requestProduct} name='Solicitar' /> :
            <></>
          }
          {!auth.isAuthenticated ?
            <Link to='/login' className='text-base rounded-lg text-center p-2.5 bg-greenAccent text-white  font-normal drop-shadow-md'>Inicia sesión para ver más detalles</Link>
            : <></>}

        </div>
      </div>
      <Modal1
        title={modalMessage.title}
        description={modalMessage.description}
        isVisible={isVisible}
        onClose={closeAlert}
        textBtn={'Solicitar'}
        onAction={confirmRequest}
      />
    </>
  );
};

export default ArticlePage;
