import { useContext, useState } from "react";
import { Text, View, StatusBar, TouchableHighlight } from "react-native";
import UserRegisterInfo from "./Pages/UserRegisterInfo";
import PersonalInfoComponent from "./Pages/PersonalInfoComponent";
import CardInfoComponent from "./Pages/CardInfoComponent";
import DietTypeAndAllergen from "./Pages/DietTypeAndAllergen.jsx";
// import { LogInScreenContext } from "../../../contexts/LogInScreenContext";
const CreateAccountProcess = ({setLoggedIn}) => {
  const [pageOne, setPageOne] = useState(true);
  const [pageTwo, setPageTwo] = useState(false);
  const [pageThree, setPageThree] = useState(false);
  const [pageFour, setPageFour] = useState(false);
  // const onCreateAccountHandler = async () => {
  //   console.log("Values", values);
  //   const { createUserEmail, createUserPassword } = values;
  //   console.log(values.createUserEmail, values.createUserPassword);
  //   try {
  //     const { user } = await createAuthUserWithEmailAndPassword(
  //       createUserEmail,
  //       createUserPassword
  //     );
  //     console.log(user);
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  //};
  /**
   * ! Need a preferred day
   * !Date of birth calendar picker
   */

  return (
    <>
      {pageOne && (
        <UserRegisterInfo setPageOne={setPageOne} setPageTwo={setPageTwo} />
      )}

      {pageTwo && (
        <DietTypeAndAllergen
          setPageOne={setPageOne}
          setPageTwo={setPageTwo}
          setPageThree={setPageThree}
        />
      )}
      {pageThree && (
        <PersonalInfoComponent
          setPageFour={setPageFour}
          setPageTwo={setPageTwo}
          setPageThree={setPageThree}
        />
      )}
      {pageFour && (
        <CardInfoComponent
          setPageThree={setPageThree}
          setPageFour={setPageFour}
          setLoggedIn={setLoggedIn}
        />
      )}
    </>
  );
};

export default CreateAccountProcess;
