import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from './src/screens/HomeScreen';
import TopicScreen from './src/screens/TopicScreen';
import ExerciseList from './src/screens/ExerciseList';
import ExerciseScreen from './src/screens/ExerciseScreen';
import ResultScreen from './src/screens/ResultScreen';
import { Provider as DataProvider } from './src/context/GetDataContext';
import { Provider as AnsweredQuestionProvider } from './src/context/AnsweredQuestionContext';

const stackNavigator = createStackNavigator({
  Home: HomeScreen,
  Topic: TopicScreen,
  ExerciseList: ExerciseList,
  exerciseFlow: createDrawerNavigator({
    Exercise: ExerciseScreen,
    Result: ResultScreen
  }),
});

const App = createAppContainer(stackNavigator);

export default () => {
  return (
    <DataProvider>
      <AnsweredQuestionProvider>
        <App />
      </AnsweredQuestionProvider>
    </DataProvider>
  );
};
