import createDataContext from './createDataContext';

const answeredQuestionReducer = (state, action) => {
  // TODO read the state again!
  switch(action.type){
    case 'get_answered_question':
      return state;
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
 * get the list of questions that we have already answered
 */
const getAnsweredQuestion = dispatch => () => {
  dispatch({ type: 'get_answered_question' });
};

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
  { getAnsweredQuestion, addAnsweredQuestion, clearAnsweredQuestion},
  { answeredQuestions: []}
);
