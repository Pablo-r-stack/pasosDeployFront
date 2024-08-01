import { API_URL } from "../context/apiurl";

const BASE_URL = `${API_URL}/products`

export const getArticleDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (response.ok) {
      const data = await response.json(); // Agrega await aquí
      return data;
    } else { response.status === '404' } {
      throw new Error('No se encontro el producto deseado');
    }
  } catch (error) {
    console.error('Ocurrió un error al obtener el producto indicado', error);
    throw new Error('Ocurrió un error al obtener el producto indicado');
  }
};

export const getAllArticles = async () => {
  try {
    const response = await fetch(`${BASE_URL}/get`);
    if (response.ok) {
      const data = await response.json(); // Agrega await aquí
      return data;
    }
    throw new Error('No se pudo obtener la lista de productos');
  } catch (error) {
    console.error('Ocurrió un error al obtener la lista de productos', error);
    throw new Error('Ocurrió un error al obtener la lista de productos');
  }
};

export const createArticle = async(article) => {
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
      console.log('Exito al subir');
      return data;
    }
  } catch (error) {
    console.error('Ocurrio un errror al registrar el producto', error);
    throw error;
  }
};

export const updateArticle = async(id, updatedArticle) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedArticle)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Modificado con exito!');
      return data;
    }
  } catch (error) {
    console.error('Ocurrio un error al actualizar el producto', error);
    throw error;
  }
};

export const deleteArticle = async(id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`,{
      method: 'DELETE'
    })
  } catch (error) {
    console.error('Ocurrio un errror al borrar el producto', error);
    throw error;
  }
};


export const getUserArticles = async(id) =>{
  try {
    const response = await fetch(`${BASE_URL}/user/${id}`);
    if(response.ok){
      const data  = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Ocurrio un error al obtener articulos del usuario');
  }
}

export const requestArticle = async(request) => {
  try {
    const response = await fetch(`${BASE_URL}/request`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    })
    if(response.ok){
      return 'Pedido con exito';
    }
  } catch (error) {
    console.error('Ocurrio un error al pedir el producto', error);
  }
}