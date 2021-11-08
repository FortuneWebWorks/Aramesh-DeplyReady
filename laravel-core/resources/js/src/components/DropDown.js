import React, { useState } from 'react'

const DropDown = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);


  const onOptionClicked = value => () => {
    setSelectedOption(typeof value !== 'object' ? value : value.name);
    setIsOpen(false);
    props.onChange ? props.onChange(value) : '';
};

  return (
    <div className="dropdown-container" onChange={props.onChange}>
      <div className="dropdown-header" onClick={toggling} value={selectedOption || props.title}>{selectedOption || props.title}</div>
    {isOpen && (
      <div className="dropdown-list-container">
        <div className="dropdown-list">
        {props.data.map(option => (
          <div className="list-item" onClick={onOptionClicked(option)} key={Math.random()}>{typeof option !== 'object' ? option : option.name}</div>
        ))}
        </div>
      </div>
    )}
    </div>
  )
}

export default DropDown;