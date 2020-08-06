import React, { useReducer } from 'react';

const Context = React.createContext();

const answeredQuestionReducer = (state, action) => {
  switch(action.type){
    case 'get_answered_question':
      return state;
    case 'add_answered_question':
    // TODO work here
      //return [...state, { action.payload }];
      return [...state, { title:"zzzz" }];
    case 'clear_answered_question':
      return [];
    default:
      return state;
  }
};
/**
  * TODO:
  * function 1: create an array that store all answered questions this time
  * function 2: clear the array made by function 1 when we perform the action that removes this context
*/

export const AnsweredQuestionProvider = ({ children }) => {
  const [answeredQuestions, dispatch] = useReducer(answeredQuestionReducer, []);
  const getAnsweredQuestion = () => {
    return () => {
      dispatch({ type: get_answered_question });
    };
  };

  const addAnsweredQuestion = () => {
    return (question) => {
      dispatch({ type: 'add_answered_question', payload: question });
    };
  };

  const clearAnsweredQuestion = () => {
    return () => {
      dispatch({ type: 'clear_answered_question' });
    };
  };

  return (
    <Context.Provider value={{ addAnsweredQuestion, getAnsweredQuestion }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
