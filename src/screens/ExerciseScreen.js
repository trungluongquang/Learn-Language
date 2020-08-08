import React, { useContext } from 'react';
import { View, StyleSheet, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import Context from '../context/GetDataContext';
import { Context as AnsweredQuestionContext } from '../context/AnsweredQuestionContext';

const ExerciseScreen = ({ navigation }) => {
  const { data } = useContext(Context);
  const { addAnsweredQuestion, getAnsweredQuestion } = useContext(AnsweredQuestionContext);

  return <>
    <Text>ExerciseScreen</Text>
    <Text>{navigation.getParam('level')} - {navigation.getParam('topic')} - {navigation.getParam('exercise')}</Text>

    <Button
      title="Go To Result"
      onPress={() => navigation.navigate('Result')}
      />

    <TouchableOpacity
      onPress={() => addAnsweredQuestion("xxx")}
      >
      <View style={styles.button}>
        <Text>Add</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => console.log(getAnsweredQuestion)}
      >
      <View style={styles.button}>
        <Text>Get</Text>
      </View>
    </TouchableOpacity>
  </>
}

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
