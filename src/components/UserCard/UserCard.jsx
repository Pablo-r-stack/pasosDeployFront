import React, { useState } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { MdOutlineCheckCircle, MdOutlineLocationOn } from 'react-icons/md'
import UserTag from '../UserTag'
import Modal1 from '../Modals/Modal1';
import useModal from '../../hooks/useModal';
import { useNavigate } from 'react-router-dom';
import { rejectUserRequest } from '../../services/RequestService';
import PopUpAlert from '../Modals/PopUpAlert';
import useAlert from '../../hooks/useAlert';

export default function UserCard({ request }) {
    if (!request) return null;
    const navigate = useNavigate();
    const { name, lastName, province, socialWorkNumber, disabilityCertificateNumber } = request;
    const [action, setAction] = useState(null);
    console.log(request);
    const alerts = useAlert();
    const modal = useModal();

    const rejectRequest = () => {
        setAction(() => reject);
        modal.showAlert('Rechazar Solicitud', '¿Estás Seguro de querer rechazar? Una vez rechazada la solicitud se eliminará.');
    }

    const acceptRequest = () => {
        setAction(() => accept);
        modal.showAlert('¡Ya casi termina!', `Ponte en contacto con ${name} para coordinar la entrega.`);
    }

    const reject = async () => {
        try {
            const response = await rejectUserRequest(request.idRequest);
            if (response) alerts.showAlert('La solicitud fue rechazada', 'Serás reirigido al menu principal')
        } catch (error) {
            console.error();
        }
    }

    const redirect = () => navigate('/home')

    const accept = () => {
        console.log('Aceptando solicitud');
        navigate('/confirmRequest', { state: { request } })
        // Lógica para aceptar la solicitud
    }

    return (
        <>
            <div className='flex w-full flex-col gap-5 border-t-2 py-5 '>
                <div className='flex w-full items-center max-h-20 justify-between'>
                    <UserTag userName={name} userLastName={lastName} />
                    <div className='flex flex-col h-full'>
                        <span className='text-base font-semibold'>{name} {lastName}</span>
                        <div className='flex text-sm'>
                            <MdOutlineLocationOn className='w-5 h-5' />
                            <span>{province}</span>
                        </div>
                        {socialWorkNumber ?
                            <span className='text-sm'>Tiene Obra social</span>
                            :
                            <></>
                        }
                        {!disabilityCertificateNumber ?
                            <span className='text-sm'>Tiene CUD</span>
                            :
                            <></>
                        }
                    </div>
                    <div className='flex flex-col h-full'>
                        <IoMdCloseCircleOutline className='w-7 h-7 hover:cursor-pointer' onClick={rejectRequest} />
                        <MdOutlineCheckCircle className='w-7 h-7 hover:cursor-pointer' onClick={acceptRequest} />
                    </div>
                </div>
            </div>
            <Modal1
                title={modal.modalMessage.title}
                description={modal.modalMessage.description}
                isVisible={modal.isVisible}
                onClose={modal.closeAlert}
                textBtn={'confirmar'}
                onAction={action}
            />
            <PopUpAlert
                title={alerts.alertMessage.title}
                description={alerts.alertMessage.description}
                isVisible={alerts.isAlertVisible}
                onClose={redirect}
            />
        </>
    )
}
