import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const TopicScreen = ({ navigation }) => {
  return <>
    <Text>Topic Screen {navigation.getParam('id')}</Text>
    <Button
      title="Go To ExerciseList"
      onPress={() => navigation.navigate('ExerciseList')}
      />
  </>
}

const styles = StyleSheet.create({});

export default TopicScreen;
