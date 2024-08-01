import React from 'react'
import PopUpAlert from '../components/Modals/PopUpAlert'
import { useNavigate } from 'react-router-dom'

export default function Confirmed() {
    const navigate = useNavigate();
    const redirect = (e) => {
        e.preventDefault();
        navigate('/home');
    }
    return (
        <PopUpAlert title={'Tu pedido fue enviado!'}
            description={'El dueño evaluará tu solicitud y se pondra en contacto a la brevedad'}
            isVisible={true}
            onClose={redirect}
        />
    )
}
