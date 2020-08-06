import React, { useContext } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Context } from '../context/GetDataContext';

const ExerciseScreen = ({ navigation }) => {
  const { data } = useContext(Context);
  //const { addAnsweredQuestion, getAnsweredQuestion } = useContext(AnsweredQuestionContext);

  console.log(data[navigation.getParam('level')][navigation.getParam('topic')][navigation.getParam('exercise')]);
  /**
   * TODO
   * Context --> get exercise list of questions
   *
   */

   /*
   <TouchableOpacity
     onPress={() => addAnsweredQuestion("xxx")}
     >
     <Text>Add</Text>
   </TouchableOpacity>
   <TouchableOpacity
     onPress={() => console.log(getAnsweredQuestion)}
     >
     <Text>Get</Text>
   </TouchableOpacity>
   */
   /*
   <Text>{navigation.getParam('level')} - {navigation.getParam('topic')} - {navigation.getParam('exercise')}</Text>
   */

  return <>
    <Text>ExerciseScreen</Text>

    <Button
      title="Go To Result"
      onPress={() => navigation.navigate('Result')}
      />
  </>
}

const styles = StyleSheet.create({});

export default ExerciseScreen;
