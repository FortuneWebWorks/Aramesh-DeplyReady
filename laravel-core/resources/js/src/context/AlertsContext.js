import React, {useState, createContext } from 'react'

export const AlertsContext = createContext();

const AlertsContextProvider = (props) => {
  const [alerts, setAlerts] = useState([]);
  const [colors, ] = useState({
    danger: 'ec6666',
    sucess: '#14d68d',
    warning: '#eccd65'
  })

  return (
    <AlertsContext.Provider value={{alerts, setAlerts, colors}}>
      {props.children}
    </AlertsContext.Provider>
  )
}

export default AlertsContextProvider
