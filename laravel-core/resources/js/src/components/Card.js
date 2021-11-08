import React from 'react';
import { AlertsContext } from '../context/AlertsContext';
import alertSession from '../sessions/alertSession';

const Card = (props) => {

  const alerts = alertSession().getSession();

  return (
    <div className="card bg-light" style={{border: (alerts && alerts.length > 0) || (props.errors && props.errors[0]) ? '1px solid #ec6666' : ''}}>
      {props.children}
    </div>
  )
}

export default Card;
