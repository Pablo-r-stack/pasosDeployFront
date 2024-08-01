import { API_URL } from "../context/apiurl";

// src/services/UserService.js
const BASE_URL = `${API_URL}/users`
const AUTH_URL = `${API_URL}/auth`
export const registerUser = async (formData) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to register: ${errorText}`);
  }

  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${AUTH_URL}/authenticate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (response.ok) {
    console.log('login exitoso!');
    return response.json();
  } else {
    const errorText = await response.text();
    throw new Error(`Failed to login: ${errorText}`);
  }
};


//Review endpoint auth
export const fetchUser = async (credentials) => {
  try {
    const response = await fetch(`${AUTH_URL}/getUser?jwt=${encodeURIComponent(credentials)}`);
    if (!response.ok) {
      throw new Error(`Error fetching user data status: ${response.status}`);
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error(error);
    throw error;
  }

}

export const editUser = async (id, formData) => {
  try {
    const response = await fetch(`${BASE_URL}/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update user: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; // Rethrow the error after logging it, if further handling is needed
  }
};
