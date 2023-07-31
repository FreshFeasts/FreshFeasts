import axios from 'axios';

export const getMeals = async () => {
  try {
    //update urls after confirmation from backend team
    const meals = await axios.get('/meals');
    return meals.data;
  } catch (error) {
    console.error('Error fetching meals: ', error);
    throw error;
  }
};

export const addMeal = async (mealId) => {
  try {
    //update urls after confirmation from backend team
    await axios.put(`/users/cart?mealId=${mealId}`);
    return true; //TBD what to return based on next action
  } catch (error) {
    console.error('Error adding meal to cart: ', error);
    throw error;
  }
};