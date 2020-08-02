import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const ExerciseScreen = ({ navigation }) => {
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
