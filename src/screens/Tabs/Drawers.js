import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Tabs from './Tabs';

const Drawers = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Tabs"
        component={Tabs}
        options={{headerShown: false, }}
      />
    </Drawer.Navigator>
  );
};

export default Drawers;
