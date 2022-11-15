import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.scaffold}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scaffold: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#1A4184',
    fontSize: 24,
  },
});

export default HomeScreen;
