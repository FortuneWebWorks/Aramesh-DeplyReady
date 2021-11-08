import React from 'react';

const Button = ({ text, onClick, bgColor, value, secondary }) => {
  return (
    <button
      onClick={onClick}
      className="btn"
      value={value}
      style={{
        backgroundColor: bgColor || secondary ? '#cfcfcf' : '',
        color: secondary ? '#000' : '',
      }}
    >
      {' '}
      {<span>&rarr;</span>} {text}
    </button>
  );
};

export default Button;
