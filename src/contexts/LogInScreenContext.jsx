import React, { createContext, useState } from "react";
export const LogInScreenContext = createContext();
const initialValues = {
  signInEmail: "",
  signInPassword: "",
  createUserEmail: "",
  createUserPassword: "",
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  DOB: "",
  phone: "",
  ccNum: "",
  ccAddress1: "",
  ccAddress2: "",
  ccCity: "",
  ccState: "",
  ccZip: "",
  ccExp: "",
  ccCVV:'',
};

export const LogInScreenContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [dietChoices, setDietChoices] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [mealsRated, setMealsRated] = useState(null);
  const [currCart, setCurrCart] = useState(null);
  const [values, setValues] = useState(initialValues);
  const [createAccountComp, setCreateAccountComp] = useState(false);

  const onChangeHandler = (text, input) => {
    setValues({
      ...values,
      [input]: text,
    });
  };
  return (
    <LogInScreenContext.Provider
      value={{
        values,
        setValues,
        createAccountComp,
        setCreateAccountComp,
        onChangeHandler,
        userId,
        setUserId,
        authToken,
        setAuthToken,
        dietChoices,
        setDietChoices,
        allergens,
        setAllergens,
        darkTheme,
        setDarkTheme,
        mealsRated,
        setMealsRated,
        currCart,
        setCurrCart
      }}
    >
      {children}
    </LogInScreenContext.Provider>
  );
};
