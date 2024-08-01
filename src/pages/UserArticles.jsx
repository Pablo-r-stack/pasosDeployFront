import React, { useEffect, useState } from 'react'
import { getAllArticles, getUserArticles } from '../services/ArticleService';
import UpdateArticleCard from '../components/UpdateArticleCard';
import { useAuth } from '../context/AuthProvider';
import useAlert from '../hooks/useAlert';
import PopUpAlert from '../components/Modals/PopUpAlert';

export default function UserArticles() {
    
    const auth = useAuth();

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const getUserProducts = async () => {
            if(auth.isAuthenticated){
            const products = await getUserArticles(auth.user.id_user);
            setProductList(products);
        }
        }
        getUserProducts();
        // if(auth.isAuthenticated){
        //     const userProducts = auth.user.productList;
        //     setProductList(userProducts);
        // }
    }, []);

    if(!auth.isAuthenticated) return null;
    
    if (!productList) return null;
    

    console.log('Productos usuario id: ', auth.user.id_user, productList);
    return (<section className='flex flex-col w-full items-center p-4 mb-40'>
        {
            productList.length > 0 ? (
            <>
                <h1 className="text-lg self-start font-bold">Tus articulos</h1>
                <div className='flex w-full flex-col gap-3'>
                    {productList.map(product => (<UpdateArticleCard key={product.idProduct} product={product} />))}
                </div>
            </>
            )
                : (
                    <h1 className="text-xl self-center font-bold">Aun no tienes publicaciones</h1>
                )

        }
    </section>);
}
