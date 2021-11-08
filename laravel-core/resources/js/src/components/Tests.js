import React, { useState, useEffect, useRef, useCallback } from 'react';
import TestOptions from './TestOptions';
import { Inertia } from "@inertiajs/inertia";
import Alert, { alertsUpdate } from './Alert';
import alertSession from '../sessions/alertSession';

const Tests = ({ data, dataLimit, testTaker }) => {
  const [pages] = useState(Math.ceil(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);
  const [userChoices, setUserChoices] = useState({});
  const [completePercent, setCompletePercent] = useState(
    (Object.keys(userChoices).length / Object.keys(data).length) * 100
  );
  const [nextBtnDisable, setNextBtnDisable] = useState(true);
  const refs = useRef([]);
  const [enabledQuestion, setEnabledQuestion] = useState(0);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const alerts = alertSession().getSession();

  useEffect(() => {
    console.log(userChoices)
    const title = document.querySelector('.container .title');
    if (currentPage > 1) {
      title.style.display = 'none';
    } else {
      title.style.display = 'flex';
    }

    if (
      enabledQuestion !== dataLimit &&
      enabledQuestion !== data.length - ((currentPage - 1) * dataLimit) &&
      Object.keys(userChoices).length !== data.length
    ) {
      refs.current[Number(enabledQuestion)].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    checkAnswers();
  });

  const sendData = (refactoredData) => {
      Inertia.visit(window.location.href, {
          method: 'post',
          data: {
              'testTaker': testTaker,
              'data': refactoredData
          }
      })
  }

  const resetActiveOptions = () => {
    const options = document.querySelectorAll('.active');
    options.forEach((option) => {
      option.classList.remove('active');
    });
  };

  const saveData = (e) => {
    const container =
      e.target.parentNode.parentNode.parentNode.parentNode.parentNode;

    setCompletePercent((percent) =>
      Math.round(
        (Object.keys(userChoices).length / Object.keys(data).length) * 100
      )
    );

    setEnabledQuestion(Number(container.id) + 1);

    setTimeout(() => {
      forceUpdate();
    }, 20);
  };

  const clearRadioBtns = () => {
    document.querySelectorAll('input[type=radio]:checked').forEach((item) => {
      item.checked = false;
    });
  };

  function goToNextPage(e) {
    removeAsterisks();
    if(Object.keys(userChoices).length === data.length) {
      const refactoredData = userDataRefactor();
      sendData(refactoredData);
    } else {
      if (!e.target.classList.contains('disabled')) {
        if (!nextBtnDisable) {
          clearRadioBtns();
          setCurrentPage((page) => page + 1);
          resetActiveOptions();
          setEnabledQuestion(0);
          forceUpdate();
        } else {
          e.preventDefault();
        }
      } else {
        alertSession().addAlert('لطفا به تمام سوالات پاسخ دهید');
        alertsUpdate(forceUpdate);
        notAnswered();
        forceUpdate();
      }
    }
  }

  function userDataRefactor() {
      let userData = {};
      for (const userChoice in userChoices) {
          userData[`q${userChoice}`] = userChoices[userChoice]
      }
      return userData;
  }

  function goToPreviousPage() {
    clearRadioBtns();
    setCurrentPage((page) => page - 1);
    resetActiveOptions();
    setEnabledQuestion(0);
    forceUpdate();
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const checkAnswers = () => {
    for (let i = 1; i < dataLimit + 1; i++) {
      if (
        (currentPage !== pages &&
          !userChoices[(currentPage - 1) * dataLimit + i]) ||
        (currentPage === pages &&
          !userChoices[(currentPage - 1) * dataLimit + i])
      ) {
        setNextBtnDisable(true);
        break;
      } else if (
        (currentPage !== pages &&
          i === dataLimit &&
          userChoices[(currentPage - 1) * dataLimit + i]) ||
        (currentPage === pages &&
          i === data.length - (currentPage - 1) * dataLimit &&
          userChoices[(currentPage - 1) * dataLimit + i] !== undefined)
      ) {
        setNextBtnDisable(false);
        break;
      }
    }
  };

  const removeAsterisks = () => {
    const asterisks = document.querySelectorAll('.empty-test-asterisk');
    asterisks.forEach((asterisk) => {
      asterisk.remove();
    });
  };

  const notAnswered = () => {
    for (let i = 1; i < dataLimit + 1; i++) {
      if (!userChoices[(currentPage - 1) * dataLimit + i]) {
        const element = document.createElement('span');
        element.appendChild(document.createTextNode('*'));
        element.classList.add('empty-test-asterisk');
        // element.style.alignmentBaseline = 'middle';
        refs.current[i - 1].children[0].children[0].appendChild(element);
      }
    }
  };

  return (
    <div>
      {/* Tests */}
      <div className="data-container">
        {getPaginatedData().map((question, index) => (
          <div
            key={index}
            ref={(node) => (refs.current[index] = node)}
            onChange={saveData}
            id={index}
            className={`test-container ${
              enabledQuestion === index ? 'active' : ''
            }`}
            tabIndex="-1"
          >
            <div className="test">
              <h3 className="title">{question.question}</h3>
              <TestOptions
                name={index}
                answer={
                  userChoices[(currentPage - 1) * dataLimit + Number(index) + 1]
                }
                setAnswer={setUserChoices}
                currentPage={currentPage}
                dataLimit={dataLimit}
              />
            </div>
          </div>
        ))}
      </div>

        {/* Alert */}
        {alerts && alerts.length > 0 ? (
          <Alert text={alerts[alerts.length - 1]}/>
        ) : (
          ''
        )}

      {/* Pagination */}
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
          style={{
            display:
              currentPage === pages &&
              Object.keys(userChoices).length === data.length
                ? 'none'
                : 'flex',
          }}
        >
          صفحه قبل
        </button>

        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${nextBtnDisable ? 'disabled' : ''}`}
          style={{
            width:
              currentPage === pages &&
              Object.keys(userChoices).length === data.length
                ? '70%'
                : '35%',
            fontSize:
              currentPage === pages &&
              Object.keys(userChoices).length === data.length
                ? '4vw'
                : '2vw',
          }}
        >
            {Object.keys(userChoices).length === data.length ? 'اتمام' : 'ادامه'} <span className="right-arrow">&rarr;</span>
        </button>
      </div>

      <div className="progressbar-container">
        <p>{completePercent}%</p>
        <div className="progressbar">
          <span
            className="progress"
            style={{ width: `${completePercent}%` }}
          ></span>
        </div>
        <p>100%</p>
      </div>
    </div>
  );
};

export default Tests;
