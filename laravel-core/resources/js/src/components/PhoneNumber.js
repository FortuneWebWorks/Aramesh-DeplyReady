import React, { useCallback, useState } from 'react';
import alertSession from "../sessions/alertSession";
import { alertsUpdate } from "../components/Alert";

const PhoneNumber = ({ title, onChange, value, disabled, setAlert }) => {

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [input, setInput] = useState(0);

  return (
    <div className='phone-number-container'>
      <div className='phone-number-input-container'>
        <div className='phone-number'>
          <label htmlFor='phone-number'>{title || 'شماره تماس'}</label>
          <input
            id='phone-number'
            type='number'
            name='phoneNumber'
            value={value}
            onChange={onChange}
            autoComplete='on'
            disabled={disabled}
          />
        </div>
        <input
          type='text'
          name='phoneNumber'
          id='def-number'
          value='+98'
          disabled
        />
      </div>
    </div>
  )
}

export default PhoneNumber
