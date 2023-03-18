import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Saved from '../screens/Saved';
import {NavigationContainer} from '@react-navigation/native';
import Story from '../screens/Story';
import Explore from '../screens/Explore';
import Category from '../screens/Category';
import AudioPlayer from '../screens/AudioPlayer';
import AllCategories from '../screens/AllCategories';

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
        <Stack.Screen name="Story" component={Story} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Audio Player" component={AudioPlayer} />
        <Stack.Screen name="All Categories" component={AllCategories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
