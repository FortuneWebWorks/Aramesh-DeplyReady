import React, {useState, createContext} from 'react'

export const RegisterContext = createContext();

const RegisterContextProvider = (props) => {
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [servantClinic, setServantClinic] = useState();
  const [advisor, setAdvisor] = useState();
  const [familyNum, setFamilyNum] = useState();
  const [sonsNum, setSonsNum] = useState();
  const [daughterNum, setDaughterNum] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [familyData, setFamilyData] = useState([]);

  return (
    <RegisterContext.Provider 
    value={{
      name, setName,
      city, setCity,
      servantClinic, setServantClinic,
      advisor, setAdvisor,
      familyNum, setFamilyNum,
      sonsNum, setSonsNum,
      daughterNum, setDaughterNum,
      phoneNumber, setPhoneNumber,
      familyData, setFamilyData
    }}>
      {props.children}
    </RegisterContext.Provider>
  )
}

export default RegisterContextProvider;
