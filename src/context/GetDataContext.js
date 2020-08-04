import React, { useState } from 'react';

const Context = React.createContext();

export const Provider = ({ children }) => {
  const data = require('../../data/data.json')["data"];
  const levels = new Array(); // all levels name
  const topics = new Object();
  const exercisesList = new Object();

  for(let level in data){
    levels.push({title: level});

    topics[level] = new Array();
    exercisesList[level] = new Object();
    // get an array of topics
    for(let topic in data[level]){
      topics[level].push({title: topic});

      exercisesList[level][topic] = new Array();
      for(let exerciseName in data[level][topic]){
        exercisesList[level][topic].push({title: exerciseName});
      }
    }
  }


  return (
    <Context.Provider value ={{ data, levels, topics, exercisesList }}>{children}</Context.Provider>
  );
};

export default Context;
