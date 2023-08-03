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
  ccCVV: "",
};

// useEffect to grab users info on login
export const LogInScreenContextProvider = ({ children }) => {
  const [userInitData, setUserInitData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [dietChoices, setDietChoices] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [mealsRated, setMealsRated] = useState(null);
  const [currCart, setCurrCart] = useState(null);
  const [values, setValues] = useState(initialValues);
  const [createAccountComp, setCreateAccountComp] = useState(false);
  const [email, setEmail] = useState(null);
  const [isSameAddress, setIsSameAddress] = useState(false);
  let addressInfo = {
    address1: values.address1,
    address2: values.address2,
    city: values.city,
    state: values.state,
    zip: values.zip,
  };
  let cardAddressInfo = null;
  if (isSameAddress) {
    cardAddressInfo = addressInfo;
  } else {
    cardAddressInfo = {
      address1: values.ccAddress1,
      address2: values.ccAddress2,
      city: values.ccCity,
      state: values.ccState,
      zip: values.ccZip,
    };
  }
  const test = "HI";
  const createUserData = {
    user: {
      email: values.createUserEmail,
      password: values.createUserPassword,
      firstName: values.firstName,
      lastName: values.lastName,
      dietChoice: dietChoices,
      allergens: allergens,
      preferredDay: 0,
    },
    info: {
      deliveryAddress: addressInfo,
      DOB: values.DOB,
      phone: values.phone,
    },
    paymentInfo: {
      ccNum: values.ccNum,
      ccDetails: cardAddressInfo,
      ccExp: {
        month: values.ccExp.split("/")[0],
        year: values.ccExp.split("/")[1],
      },
    },
  };

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
        userInitData,
        setUserInitData,
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
        setCurrCart,
        isSameAddress,
        setIsSameAddress,
        createUserData,
      }}
    >
      {children}
    </LogInScreenContext.Provider>
  );
};
