import React, { useEffect } from 'react';
import alertSession from '../sessions/alertSession';

export const alertsUpdate = (forceUpdate) => {
  forceUpdate();
  setTimeout(() => {
    forceUpdate();
  } , 5100);
}


const Alert = ({text, bgColor}) => {

  useEffect(() => {
    setTimeout(() => {
      disapear()
    }, 5000)
  })

  const disapear = () => {
    alertSession().setSession([]);
  }

  return (
    <div className="alert alert-danger" style={{backgroundColor: bgColor}}>
      <p style={{color: bgColor === '#eccd65' ? '#2b2b2b' : '#fff'}}>{text}</p>
    </div>
  )
}

export default Alert
