import React, {useState, createContext} from 'react'
import {questionsCollection} from '../data'

export const QuestionsContext = createContext();

const QuestionsContextProvider = (props) => {

  const [questions] = useState(questionsCollection);
  const [data, setData] = useState(questionsCollection.children);

  return (
    <QuestionsContext.Provider value={{questions, data, setData}}>
      {props.children}
    </QuestionsContext.Provider>
  )
}

export default QuestionsContextProvider;
