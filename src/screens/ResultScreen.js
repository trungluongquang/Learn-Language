import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import { Context as AnsweredQuestionContext } from '../context/AnsweredQuestionContext';

const ResultScreen = ({ navigation }) => {
  // TODO button to move user to the next exercise in the same topic?
  const { state, clearAnsweredQuestion } = useContext(AnsweredQuestionContext);
  const answeredQuestions = transformAnswerQuestionForFlatList(state.answeredQuestions);

  /**
   * TODO
   * show question --> component
   * button to review
   * button to redo the test
   */

  return (
    <>
      <Text>Your Result</Text>
      <Text>{countCorrectAnswer(answeredQuestions)}/{answeredQuestions.length}</Text>
      <FlatList
        data={ answeredQuestions }
        keyExtractor={option => option["id"]}
        renderItem={({ item }) => {
          return(<View>
            <Text>{item["question"]}</Text>
            {showOptions(item, item["userAnswer"])}
            <Text>{item["explanation"]}</Text>
          </View>)
        }}
      />

      <Button
        style={styles.button}
        onPress={() => {
          clearAnsweredQuestion();
          navigation.goBack();
        }}
        title="Retake"
      />
    </>
  );
}

/**
 * transform the AnswerQuestionContext to the required format
 */
function transformAnswerQuestionForFlatList(answeredQuestions){
  let result = new Array();
  for(let i = 0; i < answeredQuestions.length; i++){
    let tmp = answeredQuestions[i]["question"];
    tmp["id"] = i.toString();
    tmp["userAnswer"] = answeredQuestions[i]["userAnswer"];
    result.push(tmp);
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

/**
 * count number of correct answer
 */
function countCorrectAnswer(answeredQuestions){
  let result = 0;
  for(let i = 0; i < answeredQuestions.length; i++){
    if((parseInt(answeredQuestions[i]["answer"]) - 1) == answeredQuestions[i]["userAnswer"]){
      result += 1;
    }
  }
  return result;
}

/**
 * show the options in each multiple choice question. After the user has given his answer, we mark the right option with green and wrong with red
 * @param {Number} answer the answer index given by the user. The index starts from 0
 */
function showOptions(question, answer){
  let result = <FlatList
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
  return result;
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

export default ResultScreen;
