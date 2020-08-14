import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import Context from '../context/GetDataContext';
import { Context as AnsweredQuestionContext } from '../context/AnsweredQuestionContext';

const ExerciseScreen = ({ navigation }) => {
  const { data } = useContext(Context);
  const { state, addAnsweredQuestion } = useContext(AnsweredQuestionContext);

  const [ answer, setAnswer ] = useState(null);
  const [ counter, setCounter ] = useState(1);
  const [ question, setQuestion ] = useState(data[navigation.getParam('level')][navigation.getParam('topic')][navigation.getParam('exercise')][0]);

  useEffect(() => {
    setQuestion(data[navigation.getParam('level')][navigation.getParam('topic')][navigation.getParam('exercise')][state.answeredQuestions.length]);
  },[counter]);

  const options = showOptions(question, answer, setAnswer, addAnsweredQuestion);

  /**
   * todo
   * show if wrong, exact
   * show explanation with styles
   */
  return <>

    <Text>{navigation.getParam('level')} - {navigation.getParam('topic')} - {navigation.getParam('exercise')}</Text>
    <Text>{question["task"]}</Text>
    <Text>{question["question"]}</Text>
    {answer != null ? <Text>{answer}</Text> : null}
    {/*TODO we don't need this. We need to color the wrong and right option!*/}
    {options}

    {answer == null ? null : <Text>{question["explanation"]}</Text>}
    {counter == data[navigation.getParam('level')][navigation.getParam('topic')][navigation.getParam('exercise')].length ?
    <Button
      style={styles.button}
      onPress={() => {
        navigation.navigate('Result')
      }}
      title="Result"
    />
    :
    <Button
      style={styles.button}
      title="Next"
      onPress={() => {
        setCounter(counter + 1);
        setAnswer(null);
      }}
    />
  }
  </>
}

/**
 * show the options in each multiple choice question. After the user has given his answer, we mark the right option with green and wrong with red
 */
function showOptions(question, answer, setAnswer, addAnsweredQuestion){
  let result = <FlatList
    data={ question["options"] }
    renderItem={({ item, index }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setAnswer(index);
            addAnsweredQuestion({question, userAnswer: item});
          }}
        >
          <View style={colorOption(null, null, null)}>
            <Text>{item}</Text>
          </View>
        </TouchableOpacity>
      )
    }}
    keyExtractor={option => option}
  />;

  if(answer != null){
    result = <Text>We have answer</Text>
  }
  return result;
};

/**
 * color the optionif it's a wrong or correct answer or just an untapped option
 * @param {Number} index the row index
 * @param {Number} correctOptionIndex this is taken from the JSON file and index starts from 1
 * @param {Number} userAnswerIndex index of the option that the user selected
 */
function colorOption(index, correctOptionIndex, userAnswerIndex){
  let result = 'green';

  return {
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
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
