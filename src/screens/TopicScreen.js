import React, { useContext } from 'react';
import { View, StyleSheet, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import Context from '../context/GetDataContext';

const TopicScreen = ({ navigation }) => {
  const { topics } = useContext(Context);

  return (
    <>
      <Text>Topic Screen {navigation.getParam('level')}</Text>
      <FlatList
        data = {topics[navigation.getParam('level')]}
        keyExtractor = {topic => topic.title}
        renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('ExerciseList', {
                                                      topic: item.title,
                                                      level: navigation.getParam('level')
                                                    }
                                                  )}
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

export default TopicScreen;
