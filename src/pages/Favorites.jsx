import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider';
import ProductCard from '../components/ProductCard';
import { getFavorites } from '../services/FavoritesService';

export default function Favorites() {
    const [favoritesList, setFavoritesList] = useState([]);
    const auth = useAuth();
    if(!auth.isAuthenticated) return null;
    // const {favoritesList} = auth.user
    useEffect(()=>{
        const getUserFavorites = async(id)=>{
            try {
                const favorites = await getFavorites(id);
                setFavoritesList(favorites);
            } catch (error) {
                console.error('Ocurrio un error al cargar favoritos');
            }
        }
        if(auth.isAuthenticated){
            getUserFavorites(auth.user.id_user);
        }
    },[])
    console.log('favoritos', favoritesList);

    return (
        <div className='flex flex-col w-full items-center p-4 mb-20'>
            <h1 className="text-lg self-start font-bold">Lista de Favoritos</h1>
            <div className='flex w-full h-screen flex-col gap-3 text-center'>
                {favoritesList && favoritesList.length > 0 ?
                favoritesList.map(favorite => ( <ProductCard key={favorite.id_favorites} product={favorite.product} favoriteId={favorite.id_favorites} /> ))
            :
            <h2>Aun no hay favoritos</h2>
                }
            </div>
        </div>
    )
}
