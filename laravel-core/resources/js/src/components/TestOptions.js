import React from 'react';
import '../css/styles.css';
import check from '../svg/check.svg';

const TestOptions = ({ name, answer, setAnswer, currentPage, dataLimit }) => {
  const onchangeHandler = (e) => {
    const container =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode;

    setAnswer((userChoice) => {
      userChoice[(currentPage - 1) * dataLimit + Number(container.id) + 1] =
        Number(e.target.value);
      return userChoice;
    });
  };

  return (
    <div className="options-container">
      <div className="radio-btns-container">
        <div className="radio-btn-container">
          <input
            type="radio"
            value={5}
            name={name}
            checked={answer === 5}
            onChange={onchangeHandler}
          />
          <span className="radio-control">
            <img src={check} alt="Check icon" className="check-icon" />
          </span>
        </div>
        <div className="radio-btn-container">
          <input
            type="radio"
            value={4}
            name={name}
            checked={answer === 4}
            onChange={onchangeHandler}
          />
          <span className="radio-control">
            <img src={check} alt="Check icon" className="check-icon" />
          </span>
        </div>
        <div className="radio-btn-container">
          <input
            type="radio"
            value={3}
            name={name}
            checked={answer === 3}
            onChange={onchangeHandler}
          />
          <span className="radio-control">
            <img src={check} alt="Check icon" className="check-icon" />
          </span>
        </div>
        <div className="radio-btn-container">
          <input
            type="radio"
            value={2}
            name={name}
            checked={answer === 2}
            onChange={onchangeHandler}
          />
          <span className="radio-control">
            <img src={check} alt="Check icon" className="check-icon" />
          </span>
        </div>
        <div className="radio-btn-container">
          <input
            type="radio"
            value={1}
            name={name}
            checked={answer === 1}
            onChange={onchangeHandler}
          />
          <span className="radio-control">
            <img src={check} alt="Check icon" className="check-icon" />
          </span>
        </div>
      </div>

      <div className="texts-container">
        <p className="radio-text">کاملا موافقم</p>
        <p className="radio-text">موافقم</p>
        <p className="radio-text">نظری ندارم</p>
        <p className="radio-text">مخالفم</p>
        <p className="radio-text">کاملا مخالفم</p>
      </div>
    </div>
  );
};

export default TestOptions;
