import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import Context from '../context/GetDataContext';
import { Context as AnsweredQuestionContext } from '../context/AnsweredQuestionContext';

const ExerciseScreen = ({ navigation }) => {
  const { data } = useContext(Context);
  const { state, addAnsweredQuestion } = useContext(AnsweredQuestionContext);

  const [ answer, setAnswer ] = useState(null);
  const [ question, setQuestion ] = useState(data[navigation.getParam('level')][navigation.getParam('topic')][navigation.getParam('exercise')][0]);

  useEffect(() => {
    if(state.answeredQuestions.length == 0){
      // when we retake the exercise
      setAnswer(null);
    }

    if(state.answeredQuestions.length < data[navigation.getParam('level')][navigation.getParam('topic')][navigation.getParam('exercise')].length){
      setQuestion(data[navigation.getParam('level')][navigation.getParam('topic')][navigation.getParam('exercise')][state.answeredQuestions.length]);
    }
  },[state.answeredQuestions.length]);
  /**
   * todo
   * case with android when we use back button! --> test
   */
  return <>

    <Text>{navigation.getParam('level')} - {navigation.getParam('topic')} - {navigation.getParam('exercise')}</Text>
    <Text>{question["task"]}</Text>
    <Text>{question["question"]}</Text>
    {showOptions(question, answer, setAnswer, addAnsweredQuestion)}
    {answer == null ? null : <Text>{question["explanation"]}</Text>}
    {showBottomButton(navigation, data, answer, setAnswer, state.answeredQuestions.length)}
  </>
}

/**
 * show the options in each multiple choice question. After the user has given his answer, we mark the right option with green and wrong with red
 * @param {Number} answer the answer index given by the user. The index starts from 0
 */
function showOptions(question, answer, setAnswer, addAnsweredQuestion){
  let result = <FlatList
    data={ question["options"] }
    renderItem={({ item, index }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setAnswer(index);
            addAnsweredQuestion({question, userAnswer: index});
          }}
        >
          <View style={colorOption(index, null, null)}>
            <Text>{item}</Text>
          </View>
        </TouchableOpacity>
      )
    }}
    keyExtractor={option => option}
  />;

  if(answer != null){
    result = <FlatList
      data={ question["options"] }
      renderItem={({ item, index }) => {
        return (
            <View style={colorOption(index, parseInt(question["answer"]) - 1, answer)}>
              <Text>{item}</Text>
            </View>
        )
      }}
      keyExtractor={option => option}
    />;
  }
  return result;
};

/**
 * @param {Navigation} navigation
 * @param {Context} data
 * @param {Number} answer
 */
function showBottomButton(navigation, data, answer, setAnswer, noOfAnsweredQuestions){
  let result = null;

  if(noOfAnsweredQuestions == data[navigation.getParam('level')][navigation.getParam('topic')][navigation.getParam('exercise')].length){
    result = <Button
        style={styles.button}
        onPress={() => {
          navigation.navigate('Result', {
                                          exercise: navigation.getParam('exercise'),
                                          level: navigation.getParam('level'),
                                          topic: navigation.getParam('topic')
                                        })
        }}
        title="Result"
      />;
  } else {
    if(answer != null){
      result = <Button
        style={styles.button}
        title="Next"
        onPress={() => {
          setAnswer(null);
        }}
      />
    }
  }
  return result;
}

/**
 * color the optionif it's a wrong or correct answer or just an untapped option
 * @param {Number} index the row index
 * @param {Number} correctOptionIndex this is taken from the JSON file and index starts from 1
 * @param {Number} userAnswerIndex index of the option that the user selected
 */
function colorOption(index, correctOptionIndex, userAnswerIndex){
  let color = 'transparent';
  if(index == correctOptionIndex){
    color = 'green';
  } else if (index == userAnswerIndex){
    color = 'red';
  }

  return {
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
    backgroundColor: color
  };
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
  }
});

export default ExerciseScreen;
