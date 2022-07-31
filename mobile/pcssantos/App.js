import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/pages/Home';
import Ocupacao from './src/pages/Ocupacao';
import Atracacao from './src/pages/Atracacao';
import Chegada from './src/pages/Chegada';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
        style:{
          backgroundColor: '#FD7E35',
          
        },
        inactiveTintColor: "#FFF",
        activeTintColor: '#FBFCFF',
      }}
 >
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Chegada' component={Chegada} />
        <Tab.Screen name='Atracacao' component={Atracacao} />
        <Tab.Screen name='Ocupacao' component={Ocupacao} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


