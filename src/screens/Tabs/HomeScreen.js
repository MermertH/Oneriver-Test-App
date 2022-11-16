import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {add, increaseAmount} from 'OneriverApp/src/config/addItemSlice';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import listData from 'OneriverApp/data.json';

const HomeScreen = ({navigation}) => {
  const [filterValue, setFilterValue] = useState('All');
  const dispatch = useDispatch();
  const currentWalletItemList = useSelector(state => state.item.value);

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  });

  const invokeAction = aquiredItem => {
    let itemExist = false;
    for (let index = 0; index < currentWalletItemList.length; index++) {
      if (currentWalletItemList[index].name === aquiredItem.name) {
        itemExist = true;
        break;
      }
    }
    if (itemExist) {
      dispatch(increaseAmount(aquiredItem));
    } else {
      aquiredItem.amount = 1;
      dispatch(add(aquiredItem));
    }
  };

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

  const checkOverralIncrease = bool => {
    return bool
      ? styles.listItemPercentangeTextRise
      : styles.listItemPercentangeTextDown;
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
        <Text style={styles.titleTextOneriver}>
          Oneriver
          <Text style={styles.titleTextTrade}> Trade</Text>
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
          data={getFilteredList(listData, filterValue)}
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
                <Text style={styles.listItemValueText}>
                  {'$ ' + item.value}
                </Text>
                <Text style={checkOverralIncrease(item.rise)}>
                  {item.percentage}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.buyButtonStyle}
                onPress={() =>
                  invokeAction({
                    name: item.name,
                    value: item.value,
                    type: item.type,
                  })
                }>
                <Text style={styles.buyButtonTextStyle}>Buy</Text>
              </TouchableOpacity>
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
  titleTextOneriver: {
    color: '#1A4184',
    fontSize: 32,
    fontWeight: 'bold',
  },
  titleTextTrade: {
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
    justifyContent: 'space-evenly',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemNumberView: {
    width: 120,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  listItemValueText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItemPercentangeTextRise: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  listItemPercentangeTextDown: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  buyButtonStyle: {
    borderRadius: 10,
    backgroundColor: 'rgba(40,222,10,0.2)',
    marginLeft: 10,
  },
  buyButtonTextStyle: {
    color: '#1DBA04',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});

export default HomeScreen;
