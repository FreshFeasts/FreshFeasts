import axios from 'axios';
import config from '../../../config.js';

export const getMeals = async (token) => {
  try {
    const headers = { headers: { "Authorization" : `Bearer ${token}` }};
    const meals = await axios.get(`${config.SERVER_URL}/api/meals?count=20`, headers);
    return meals.data;
  } catch (error) {
    console.error('Error fetching meals: ', error);
    throw error;
  }
};

export const getOrders = async (userId, token) => {
  try {
    const headers = { headers: { "Authorization" : `Bearer ${token}` }};
    const orders = await axios.get(`${config.SERVER_URL}/api/orders/user/${userId}`, headers);
    return orders.data;
  } catch (error) {
    console.error('Error fetching orders: ', error);
    throw error;
  }
};

export const updateCart = async (userId, currentCart, token) => {
  try {
    let body = {userId, currentCart}
    const headers = { headers: { "Authorization" : `Bearer ${token}` }};
    let cart = await axios.put(`${config.SERVER_URL}/api/users/cart`, body, headers);
    return true;
  } catch (error) {
    console.error('Error adding meal to cart: ', error);
    throw error;
  }
};

export const postCart = async (body, token) => {
  try {
    const headers = { headers: { "Authorization" : `Bearer ${token}` }};
    let cart = await axios.post(`${config.SERVER_URL}/api/users/cart`, body, headers);
    return true;
  } catch (error) {
    console.error('Error adding meal to cart: ', error);
    throw error;
  }
};

export const createUser = async (bodyObject) => {
  try{
    const response = await axios.post('http://localhost:3000/register', bodyObject);
    return response;
  } catch(err){
    console.log(err);
    throw err;
  }
}

export const signInUser = async (signInObj) => {
  try{
    const response = await axios.post('http://localhost:3000/login', signInObj);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export const getUserData = async(userId, token) => {
  try{
    const response = await axios.get(`http://localhost:3000/api/initdata/${userId}`, {
      headers: {Authorization:`Bearer ${token}` }
    });
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const rateMeal = async (mealId, userId, rating, token) => {
  try {
    const body = { mealId, userId, rating }
    const headers = { headers: { "Authorization" : `Bearer ${token}` }};
    await axios.post(`${config.SERVER_URL}/api/meals/add-rating`, body, headers);
    return true;
  } catch (error) {
    console.error('Error adding rating: ', error);
    throw error;
  }
};

export const reviewMeal = async (mealId, userId,firstName, reviewText, token ) => {
  try {
    const body = { mealId, userId,firstName, reviewText };
    const headers = { headers: { "Authorization" : `Bearer ${token}` }};
    await axios.post(`${config.SERVER_URL}/api/meals/add-review`, body, headers);
    return true;
  } catch (error) {
    console.error('Error adding written review: ', error);
    throw error;
  }
};

export const getUser = async (email, token) => {
  try {
    const headers = { headers: { "Authorization" : `Bearer ${token}` }};
    const user = await axios.get(`${config.SERVER_URL}/api/users/${email}`, headers);
    return user.data;
  } catch (error) {
    console.error('Error getting user: ', error);
    throw error;
  }
};

export const getUserContact = async (userId, token) => {
  try {
    const headers = { headers: { "Authorization" : `Bearer ${token}` }};
    let user = await axios.get(`${config.SERVER_URL}/api/info/${userId}`, headers);
    return user.data;
  } catch (error) {
    console.error('Error getting user: ', error);
    throw error;
  }
};

export const getPayment = async (userId, token) => {
  try {
    const headers = { headers: { "Authorization" : `Bearer ${token}` }};
    let user = await axios.get(`${config.SERVER_URL}/api/cc/user/${userId}`, headers);
    return user.data;
  } catch (error) {
    console.error('Error getting user: ', error);
    throw error;
  }
};

export const updateDeliveryDate = async (token ,userId) => {
  try {
    const body = { orderId, userId, orderDate, deliveryDate }
    const headers = { headers: { "Authorization" : `Bearer ${token}` }};
    let user = await axios.put(`${config.SERVER_URL}/api/update-delivery`,body, headers);
    return true;
  } catch (error) {
    console.error('Error updating delivery date: ', error);
    throw error;
  }
}
