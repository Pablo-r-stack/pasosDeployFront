import React from 'react'
import UserDetailCard from '../components/UserCard/UserDetailCard'
import Button2 from '../components/Buttons/Button2'
import Button3 from '../components/Buttons/Button3'
import BackButton from '../components/Buttons/BackButton'
import { useLocation, useNavigate } from 'react-router-dom'
import {  confirmUserRequest } from '../services/RequestService'
import PopUpAlert from '../components/Modals/PopUpAlert'
import useAlert from '../hooks/useAlert'

export default function ConfirmRequest() {
    const location = useLocation();
    const alerts = useAlert();
    const navigate = useNavigate();
    const { request } = location.state || {};
    if(!request) return null;

    const redirect = ()=> navigate('/home');

    const confirm = async()=>{
        console.log(request);
        try {
            const response = await confirmUserRequest(request.idRequest);
            if(response){
                alerts.showAlert('¡Felicitaciones!', 'Gracias por formar parte de nuestra red!')
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className='flex flex-col w-full items-center gap-5 p-4 mb-40 text-blueSecond'>
            <div className='self-start'>
                <BackButton direction={'/home'} />
            </div>
            <h1 className="text-2xl self-start font-bold">Confirmar Solicitud</h1>
            <h2 className='text-xl self-start'>Usuario Confirmado</h2>
            <UserDetailCard request={request} />
            <h3>¿Pudiste entregar tu artículo?</h3>
            <div className='flex items-center justify-center w-full gap-4 px-3'>
                <Button3 onClick={redirect} name={'No'} />
                <Button2 onClick={confirm} name={'Si'} />
            </div>
            <PopUpAlert
                title={alerts.alertMessage.title}
                description={alerts.alertMessage.description}
                isVisible={alerts.isAlertVisible}
                onClose={redirect}
            />
        </section>
    )
}
