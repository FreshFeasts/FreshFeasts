import React, { createContext, useState } from "react";
export const LogInScreenContext = createContext();
const initialValues = {
  signInEmail: "",
  signInPassword: "",
  createUserEmail: "",
  createUserPassword: "",
};

export const LogInScreenContextProvider = ({ children }) => {
  const [values, setValues] = useState(initialValues);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return (
    <LogInScreenContext.Provider value={{ values, setValues }}>
      {children}
    </LogInScreenContext.Provider>
  );
};
