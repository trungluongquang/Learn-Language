import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const ExerciseList = ({ navigation }) => {
  return <>
    <Text>ExerciseList</Text>
    <Button
      title="Go To exerciseFlow"
      onPress={() => navigation.navigate('exerciseFlow')}
      />
  </>
}

const styles = StyleSheet.create({});

export default ExerciseList;
