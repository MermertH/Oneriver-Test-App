import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const WalletScreen = () => {
  return (
    <View style={styles.scaffold}>
      <Text style={styles.text}>Wallet Screen</Text>
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

export default WalletScreen;
