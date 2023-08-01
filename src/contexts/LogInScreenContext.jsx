import React, { createContext, useState } from "react";
export const LogInScreenContext = createContext();
const initialValues = {
  signInEmail: "",
  signInPassword: "",
  createUserEmail: "",
  createUserPassword: "",
  firstName:'',
  lastName: '',
  address1:'',
  address2:'',
  city:'',
  state:'',
  zip:'',
  DOB:'',
  phone:'',

};

export const LogInScreenContextProvider = ({ children }) => {
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
      }}
    >
      {children}
    </LogInScreenContext.Provider>
  );
};
