// src/pages/HomePage.jsx
import React, { useContext, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthProvider';
import ProductsContext from '../context/ProductsProvider';

const HomePage = () => {
  const auth = useAuth();
  // const { showList, loading } = useProducts();
  const { productList, showList, filterProducts, loading } = useContext(ProductsContext);
  const [favorites, setFavorites] = useState([]);

  if(!showList) return null;

  useEffect(() => {
    if (auth.isAuthenticated) {
      setFavorites(auth.user.favoritesList);
    }
  }, [auth]);

  useEffect(() => {
    console.log('Current ShowList in HomePage:', showList);
  }, [showList]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='flex flex-col w-full items-center p-4 mb-20'>
      {showList.length > 0 ?
        <>
          <h1 className="text-lg self-start font-bold">Más buscados</h1>
          <div className='flex w-full flex-col gap-3'>
            {showList.map(product => {
              const favorite = favorites.find(fav => fav.product.idProduct === product.idProduct);
              const favoriteId = favorite ? favorite.id_favorites : null;

              return (
                <ProductCard
                  key={product.idProduct}
                  product={product}
                  favoriteId={favoriteId}
                />
              );
            })}
          </div>
        </>
        :
        <h1 className='mt-32 text-xl self-center font-bold text-blueSecond'>No se encontraron Elementos para mostrar</h1>
      }
    </div>

  );
};

export default HomePage;