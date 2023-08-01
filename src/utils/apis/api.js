import axios from 'axios';

const headers = { headers: { "Authorization" : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM5NmRiMzIzYmZjYmQ0YTcxNTkyMDkiLCJlbWFpbCI6IkVuaWQuSm9obnNAeWFob28uY29tIiwiaWF0IjoxNjkwOTI2NTcxfQ.qNQaXsXDKeLU7CFuAVGIS9sdgLVEuyxBtxTGySaUsII' }}

export const getMeals = async () => {
  try {
    const meals = await axios.get('http://localhost:3000/api/meals', headers);
    console.log(meals.data);
    return meals.data;
  } catch (error) {
    console.error('Error fetching meals: ', error);
    throw error;
  }
};

export const getOrders = async (userId) => {
  try {
    const orders = await axios.get(`http://localhost:3000/api/orders/user/${userId}`, headers);
    console.log(orders);
    return orders;
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
    console.log(cart);
    return true;
  } catch (error) {
    console.error('Error adding meal to cart: ', error);
    throw error;
  }
};

export const rateMeal = async (rating) => {
  try {
    //update urls after confirmation from backend team,
    // await axios.put(`/orders/user/${userId}/${mealId}`, rating);
    // return true; //TBD what to return based on next action
  } catch (error) {
    console.error('Error adding meal to cart: ', error);
    throw error;
  }
};

export const getUser = async (email) => {
  try {
    let user = await axios.get(`http://localhost:3000/api/users/${email}`, headers);
    return user.data;
  } catch (error) {
    console.error('Error getting user: ', error);
    throw error;
  }
};