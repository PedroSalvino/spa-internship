import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/pages/Home';
import Ocupacao from './src/pages/Ocupacao';
import Atracacao from './src/pages/Atracacao';
import Chegada from './src/pages/Chegada';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const icons = {
  Home:{
    name: 'home',
  },
  Chegada:{
    name: 'door',
  },
  Atracacao:{
    name: 'stop',
  },
  Ocupacao:{
    name: 'stop',
  },
}


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={ ({route}) => ({
        tabBarIcon: ({ color, size }) => {
          const { name } = icons[route.name];
          return <FontAwesome name={name} color={color} size={size} />
        }
      }) }
 tabBarOptions={{
        style:{
          backgroundColor: '#6290C3',
          
        },
        inactiveTintColor: "#FFF",
        activeTintColor: '#FBFCFF',
      }}
 >
        <Tab.Screen name='Home' component={Home}  />
        <Tab.Screen name='Chegada' component={Chegada} />
        <Tab.Screen name='Atracacao' component={Atracacao} />
        <Tab.Screen name='Ocupacao' component={Ocupacao} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


