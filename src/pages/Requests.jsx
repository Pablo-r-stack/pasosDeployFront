import React from 'react'
import UserCard from '../components/UserCard/UserCard';
import { useLocation } from 'react-router-dom';

export default function Requests() {

    const location = useLocation();
    const { requestList } = location.state || { requestList: [] };
    console.log(requestList);

    return (
        <section className='flex flex-col w-full items-center gap-5 p-4 mb-40 text-blueSecond'>
            <h1 className="text-2xl self-start font-bold">Solicitudes</h1>

            <h2 className='text-xl self-start'>Usuarios Interesados</h2>
            {requestList.length > 0 ? (requestList.map(request =>
                <UserCard key={request.idRequest} request={request} />

            )) :
                <>
                    <h3 className='text-2xl font-bold'>No hay solicitudes para este producto</h3>
                </>
            }



        </section>
    )
}
