import { API_URL } from "../context/apiurl";

const BASE_URL = `${API_URL}/favorites`

export const addFavorite = async(article)=>{
    try {
        const response = await fetch(`${BASE_URL}/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(article)
        });
    
        if (response) {
          const data = await response.json();
          console.log('Producto agregado a favoritos!');
          return data;
        }
      } catch (error) {
        console.error('Ocurrio un errror, no se agrego a la lista de favoritos', error);
        throw error;
      }
}

export const deleteFavorite = async(id)=>{
    try {
        const response = await fetch(`${BASE_URL}/delete/${id}`, {
            method: 'DELETE'
        });
        if(response){
            console.log('Este articulo ya no pertenece a favoritos');
        }
    } catch (error) {
        console.log('Hubo un problema al sacar el articulo de favoritos');
    }
}

export const getFavorites = async(id) =>{
  try {
    const response = await fetch(`${BASE_URL}/get/${id}`);
    if(response.ok){
      const data  = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Ocurrio un error al mostrar favoritos');
  }
}