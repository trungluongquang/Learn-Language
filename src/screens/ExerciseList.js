import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import Context from '../context/GetDataContext';
import { Context as AnsweredQuestionContext } from '../context/AnsweredQuestionContext';

const ExerciseList = ({ navigation }) => {
  const { exercisesList } = useContext(Context);
  const { clearAnsweredQuestion } = useContext(AnsweredQuestionContext);

  return (
    <>
      <Text>ExerciseList {navigation.getParam('level')} - {navigation.getParam('topic')}</Text>
      <FlatList
        data = {exercisesList[navigation.getParam('level')][navigation.getParam('topic')]}
        keyExtractor = {topic => topic.title}
        renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  clearAnsweredQuestion();
                  navigation.navigate('exerciseFlow', {
                                                        exercise: item.title,
                                                        level: navigation.getParam('level'),
                                                        topic: navigation.getParam('topic')
                                                      }
                                                    )}
                }
              >
                <View style={styles.button}>
                  <Text>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )
          }
        }
      />
    </>
  );
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

export default ExerciseList;
