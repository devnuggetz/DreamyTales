import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Saved from '../screens/Saved';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Saved" component={Saved} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
