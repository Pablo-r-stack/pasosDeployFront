// src/pages/Register.jsx
import '../styles/Styles.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editUser, registerUser } from '../services/AuthService';
import Onboarding from './Onboarding';
import { useAuth } from '../context/AuthProvider';
import useAlert from '../hooks/useAlert';
import PopUpAlert from '../components/Modals/PopUpAlert';

const EditUserData = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const { isAlertVisible, alertMessage, showAlert, closeAlert } = useAlert();

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        dni: '',
        email: '',
        password: '',
        birthday: '',
        phoneNumber: '',
        province: 'string',
        photoUser: '',
        socialWorkNumber: 0,
        disabilityCertificateNumber: 0,
        repeatedPassword: ''
    });

    useEffect(() => {
        if (auth.isAuthenticated) {
            const { name, lastName, dni, email, password, birthday, phoneNumber, province, photoUser, socialWorkNumber, disabilityCertificateNumber, repeatedPassword } = auth.user;
            setFormData({
                name: name || '',
                lastName: lastName || '',
                dni: dni || '',
                email: email || '',
                password: password || '',
                birthday: birthday ? new Date(birthday).toISOString().split('T')[0] : '',
                phoneNumber: phoneNumber || '',
                province: province || 'string',
                photoUser: photoUser || '',
                socialWorkNumber: socialWorkNumber || 0,
                disabilityCertificateNumber: disabilityCertificateNumber || 0,
                repeatedPassword: repeatedPassword || ''
            });
        }
    }, [auth]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Asegúrate de que todos los valores sean del tipo esperado y no sean undefined
        const sanitizedFormData = {
            ...formData,
            socialWorkNumber: formData.socialWorkNumber ? Number(formData.socialWorkNumber) : 0,
            disabilityCertificateNumber: formData.disabilityCertificateNumber ? Number(formData.disabilityCertificateNumber) : 0,
            birthday: formData.birthday || '', // asegúrate de que birthday no sea undefined
            name: formData.name || '',
            lastName: formData.lastName || '',
            dni: formData.dni || '',
            email: formData.email || '',
            password: formData.password || '',
            phoneNumber: formData.phoneNumber || '',
            province: formData.province || 'string',
            photoUser: formData.photoUser || '',
            repeatedPassword: formData.repeatedPassword || '',
        };

        try {
            await editUser(sanitizedFormData);
            showAlert('Datos modificados con éxito!', 'Por favor, inicia sesión nuevamente');
            auth.logOut();
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error("Error updating user:", error);
            showAlert('Error al actualizar', 'Por favor, verifica los datos e inténtalo nuevamente.');
        }
    };
    return (
        <div className="register-container min-h-screen flex flex-col justify-center items-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
                <div className="profile-header mb-4">
                    <div className="profile-pic"><img src="/img/logo.webp" alt="logo" /></div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="firstName" className="sr-only">Nombre</label>
                            <input
                                type="text"
                                id="firstName"
                                name="name"
                                autoComplete="given-name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Nombre"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="sr-only">Apellido</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                autoComplete="family-name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Apellido"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="birthday" className="sr-only">Fecha de Nacimiento</label>
                            <input
                                type="date"
                                id="birthday"
                                name="birthday"
                                autoComplete="bday"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Fecha de Nacimiento"
                                value={formData.birthday}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="sr-only">Número de Teléfono</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                autoComplete="tel"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Número de Teléfono"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="socialWorkNumber" className="sr-only">Número de Obra Social</label>
                            <input
                                type="number"
                                id="socialWorkNumber"
                                name="socialWorkNumber"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Número de Obra Social"
                                value={formData.socialWorkNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="disabilityCertificateNumber" className="sr-only">Número de Certificado de Discapacidad</label>
                            <input
                                type="number"
                                id="disabilityCertificateNumber"
                                name="disabilityCertificateNumber"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Número de Certificado de Discapacidad"
                                value={formData.disabilityCertificateNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="province" className="sr-only">Provincia</label>
                            <select
                                name="province"
                                id="province"
                                value={formData.province}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="" defaultValue>Elige tu provincia</option>
                                <option value="Buenos Aires">Buenos Aires</option>
                                <option value="Cordoba">Córdoba</option>
                                <option value="Mendoza">Mendoza</option>
                                <option value="Salta">Salta</option>
                                <option value="San Juan">San Juan</option>
                                <option value="Santa Fe">Santa Fe</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#679436] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Modificar
                        </button>
                    </div>
                    <div className="continue-without-registering text-xs text-center mt-4">
                        <span>Un perfil confiable tiene tantos datos como sea posible</span>
                    </div>
                </form>
            </div>
            <PopUpAlert
                title={alertMessage.title}
                description={alertMessage.description}
                isVisible={isAlertVisible}
                onClose={closeAlert}
            />
        </div>
    );
};

export default EditUserData;