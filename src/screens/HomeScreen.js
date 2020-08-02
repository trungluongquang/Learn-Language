import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

/**
  * TODO
  * header: setting, IAP
  * Topic
  * rate us, share button
*/
const HomeScreen = ({ navigation }) => {
  const [levels, setLevels] = useState([]);

  // TODO move this to a context so that we load data only once!
  useEffect(() => {
    setLevels(require('../../data/levels.json')["data"]);
  }, []);

  return (
    <View>
      <Text>HomeScreen</Text>
      <FlatList
        data={levels}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Topic', { id: item.id })}
            >
              <View style={styles.button}>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
        keyExtractor={level => level.id}
      />
    </View>
  )
}

// TODO adjust color / design
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
  }
});

export default HomeScreen;
