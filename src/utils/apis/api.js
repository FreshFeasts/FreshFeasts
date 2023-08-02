import axios from 'axios';

const headers = { headers: { "Authorization" : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM5NmRiMzIzYmZjYmQ0YTcxNTkyMDkiLCJlbWFpbCI6IkVuaWQuSm9obnNAeWFob28uY29tIiwiaWF0IjoxNjkwOTI2NTcxfQ.qNQaXsXDKeLU7CFuAVGIS9sdgLVEuyxBtxTGySaUsII' }}

export const getMeals = async () => {
  try {
    const meals = await axios.get('http://localhost:3000/api/meals?count=20', headers);
    return meals.data;
  } catch (error) {
    console.error('Error fetching meals: ', error);
    throw error;
  }
};

export const getOrders = async (userId) => {
  try {
    const orders = await axios.get(`http://localhost:3000/api/orders/user/${userId}`, headers);
    return orders.data;
  } catch (error) {
    console.error('Error fetching orders: ', error);
    throw error;
  }
};

export const updateCart = async (body) => {
  try {
    let cart = await axios.put('http://localhost:3000/api/users/cart', body, headers);
    return true;
  } catch (error) {
    console.error('Error adding meal to cart: ', error);
    throw error;
  }
};

export const postCart = async (body) => {
  try {
    let cart = await axios.post('http://localhost:3000/api/users/cart', body, headers);
    return true;
  } catch (error) {
    console.error('Error adding meal to cart: ', error);
    throw error;
  }
};

export const rateMeal = async (mealId, userId, rating) => {
  try {
    const body = { mealId, userId, rating }
    await axios.post('http://localhost:3000/api/meals/add-rating', body, headers);
    return true;
  } catch (error) {
    console.error('Error adding rating: ', error);
    throw error;
  }
};

export const reviewMeal = async (mealId, userId,firstName, reviewText ) => {
  try {
    const body = { mealId, userId,firstName, reviewText }
    await axios.post('http://localhost:3000/api/meals/add-review', body, headers);
    return true;
  } catch (error) {
    console.error('Error adding written review: ', error);
    throw error;
  }
};

export const getUser = async (email) => {
  try {
    const user = await axios.get(`http://localhost:3000/api/users/${email}`, headers);
    return user.data;
  } catch (error) {
    console.error('Error getting user: ', error);
    throw error;
  }
};

export const getUserContact = async (userId) => {
  try {
    let user = await axios.get(`http://localhost:3000/api/info/${userId}`, headers);
    return user.data;
  } catch (error) {
    console.error('Error getting user: ', error);
    throw error;
  }
};

export const getPayment = async (userId) => {
  try {
    let user = await axios.get(`http://localhost:3000/api/cc/user/${userId}`, headers);
    return user.data;
  } catch (error) {
    console.error('Error getting user: ', error);
    throw error;
  }
};