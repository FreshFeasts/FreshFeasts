import React, { createContext, useState,useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const LogInScreenContext = createContext();
// Ignore Initial Values These are for input fields for log in process
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
  // Sate with all the user data
  const [userInitData, setUserInitData] = useState(null);
  // The rest of these states are for sign up process
  const [dietChoices, setDietChoices] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [createAccountComp, setCreateAccountComp] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(false);

  // Takes care of persistent  user login
  useEffect(() => {
    const fetchUserInitDataFromStorage = async() => {
      const storageUserInItData = await AsyncStorage.getItem('stringUserInItData');
      if(storageUserInItData) {
        setUserInitData(JSON.parse(storageUserInItData));
      }
    }

    fetchUserInitDataFromStorage();
  }, [])
  // More Variables used in sign up process
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
        dietChoices,
        setDietChoices,
        allergens,
        setAllergens,
        isSameAddress,
        setIsSameAddress,
        createUserData,
      }}
    >
      {children}
    </LogInScreenContext.Provider>
  );
};
