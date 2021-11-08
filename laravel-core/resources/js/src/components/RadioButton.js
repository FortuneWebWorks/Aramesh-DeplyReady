import React from 'react'

export const RadioButtonContainer = (props) => {
  return <div className='radio-btns'>{props.children}</div>
}

const RadioButton = ({
  text,
  value,
  name,
  onClick,
  activeCondition,
  disabled,
  className,
}) => {
  return (
    <div className='radio-btn-container'>
      <input
        type='radio'
        value={value}
        name={name}
        onClick={onClick}
        disabled={disabled}
      />
      <p className={'radio-btn'}>{text}</p>
    </div>
  )
}

export default RadioButton
