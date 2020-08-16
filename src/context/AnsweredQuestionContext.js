import createDataContext from './createDataContext';

const answeredQuestionReducer = (state, action) => {
  switch(action.type){
    case 'add_answered_question':
      return {...state, answeredQuestions: [...state.answeredQuestions, action.payload] };
    case 'clear_answered_question':
      return { ...state, answeredQuestions: [] };
    default:
      return state;
  }
};
/**
  * TODO:
  * function 1: create an array that store all answered questions this time
  * function 2: clear the array made by function 1 when we perform the action that removes this context
*/

/**
 * add an answered question to the list
 */
const addAnsweredQuestion = dispatch => (question) => {
  dispatch({ type: 'add_answered_question', payload: question });
};

const clearAnsweredQuestion = dispatch => () => {
  dispatch({ type: 'clear_answered_question' });
};

export const { Context, Provider } = createDataContext(
  answeredQuestionReducer,
  { addAnsweredQuestion, clearAnsweredQuestion},
  { answeredQuestions: [], correctAnswer: 0}
);
