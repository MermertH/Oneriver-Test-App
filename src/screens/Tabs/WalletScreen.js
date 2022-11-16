import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

const WalletScreen = ({navigation}) => {
  const [filterValue, setFilterValue] = useState('All');
  const currentWalletItemList = useSelector(state => state.item.value);

  const getFilteredList = (list, value) => {
    let filteredList = [];
    for (let index = 0; index < list.length; index++) {
      if (list[index].type === value || value === 'All') {
        filteredList.push(list[index]);
      }
    }
    return filteredList;
  };

  const getCorrectIcon = name => {
    switch (name) {
      case 'BTC':
        return require('OneriverApp/src/images/crypto-currency/btc_icon.png');
      case 'ETH':
        return require('OneriverApp/src/images/crypto-currency/eth_icon.png');
      case 'BNB':
        return require('OneriverApp/src/images/crypto-currency/bnb_icon.png');
      case 'XRP':
        return require('OneriverApp/src/images/crypto-currency/xrp_icon.png');
      case 'USDT':
        return require('OneriverApp/src/images/crypto-currency/usdt_icon.png');
      case 'TRY':
        return require('OneriverApp/src/images/crypto-currency/try_icon.png');
      default:
        return require('OneriverApp/src/images/crypto-currency/btc_icon.png');
    }
  };

  const checkIfSelected = (value, type) => {
    return value === type ? styles.buttonTextSelected : styles.buttonTextNormal;
  };

  return (
    <View style={styles.scaffold}>
      <View style={styles.appBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Image source={require('OneriverApp/src/images/drawer_icon.png')} />
        </TouchableOpacity>
        <Image source={require('OneriverApp/src/images/search_icon.png')} />
      </View>
      <View style={styles.titleTextArea}>
        <Text style={styles.titleTextMy}>
          My
          <Text style={styles.titleTextWallet}> Wallet</Text>
        </Text>
      </View>
      <View style={styles.filterButtonsArea}>
        <TouchableOpacity
          style={styles.filterButtons}
          onPress={() => {
            setFilterValue('All');
          }}>
          <Text style={checkIfSelected(filterValue, 'All')}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButtons}
          onPress={() => {
            setFilterValue('Crypto');
          }}>
          <Text style={checkIfSelected(filterValue, 'Crypto')}>Crypto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButtons}
          onPress={() => {
            setFilterValue('Currency');
          }}>
          <Text style={checkIfSelected(filterValue, 'Currency')}>Currency</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listArea}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={getFilteredList(currentWalletItemList, filterValue)}
          renderItem={({item}) => (
            <View style={styles.listItemStyle}>
              <View style={styles.iconAndNameView}>
                <Image
                  style={styles.listIconStyle}
                  source={getCorrectIcon(item.name)}
                />
                <Text style={styles.listItemNameText}>{item.name}</Text>
              </View>
              <View style={styles.listItemNumberView}>
                <Text style={styles.listItemAmountText}>{item.amount}</Text>
                <Text style={styles.listItemValueText}>
                  {'$ ' + item.value}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scaffold: {
    backgroundColor: 'white',
    flex: 1,
  },
  appBar: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 31,
    paddingHorizontal: 27,
  },
  titleTextArea: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 15,
    paddingLeft: 27,
  },
  titleTextMy: {
    color: '#1A4184',
    fontSize: 32,
    fontWeight: 'bold',
  },
  titleTextWallet: {
    color: '#1E1E1E',
    fontSize: 32,
    fontWeight: 'bold',
  },
  filterButtonsArea: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 30,
  },
  filterButtons: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#EBF3FF',
    marginHorizontal: 10,
  },
  buttonTextNormal: {
    color: '#000000',
    opacity: 0.63,
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 6,
  },
  buttonTextSelected: {
    color: '#1A4184',
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 6,
  },
  listArea: {
    flex: 12,
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 20,
  },
  listItemStyle: {
    borderRadius: 10,
    backgroundColor: '#E7E7E7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 8,
  },
  listItemNameText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  listIconStyle: {
    marginEnd: 15,
  },
  iconAndNameView: {
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  listItemNumberView: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  listItemAmountText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItemValueText: {
    color: '#1E1E1E',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.7,
  },
});

export default WalletScreen;
