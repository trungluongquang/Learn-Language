import React, { useContext } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import Context from '../context/GetDataContext';

/**
  * TODO
  * header: setting, IAP
  * Topic
  * rate us, share button
*/
const HomeScreen = ({ navigation }) => {
  const { levels } = useContext(Context);

  return (
    <>
      <Text>HomeScreen</Text>
      <FlatList
        data={ levels }
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Topic', { level: item.title })}
            >
              <View style={styles.button}>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
        keyExtractor={level => level.title}
      />
    </>
  );
};

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
