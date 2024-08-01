import { API_URL } from "../context/apiurl";

const BASE_URL = `${API_URL}/request`;

export const newRequest = async(productId, userId)=>{
    try {
        const response = await fetch(`${BASE_URL}/product/${productId}/user/${userId}`,{
            method:'POST',
        });
        if(response.ok){
            console.log('Producto pedido con exito');
        }
    } catch (error) {
        console.error('Ocurrio un error al solicitar el producto');
    }
}

//replace with request id method later
export const getRequest = async(id) =>{
    try {
        const response = await fetch(`${BASE_URL}/user/${id}`)
        if(response.ok){
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Ocurrio un error al obtener la solicitud');
    }
}

export const confirmUserRequest = async(requestId)=>{
    try {
        const response = await fetch(`${BASE_URL}/confirm-delivery/${requestId}`,{
            method:'POST',
        });
        if(response.ok){
            console.log('Producto dado de alta con éxito!');
            return response;
        }
    } catch (error) {
        console.error('Ocurrio un error al confirmar tu entrega');
    }
}

export const rejectUserRequest = async(requestId)=>{
    try {
        const response = await fetch(`${BASE_URL}/delete/${requestId}`,{
            method:'DELETE',
        });
        if(response.ok){
            console.log('Solicitud rechazada con éxito!');
            return response;
        }
    } catch (error) {
        console.error('Ocurrio un error al rechazar');
    }
}
