import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/home/App.jsx';
import MapScreen from './pages/planejamentoPesca/App.jsx';
import SingIn from './pages/singIn/App.jsx';
import SingUp from './pages/singUp/App.jsx';
import App from './pages/teste/App.jsx';
import Forgot from './pages/forgotPassword/App.jsx';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SingIn">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="SingIn" component={SingIn} />
        <Stack.Screen name="SingUp" component={SingUp} />
        <Stack.Screen name="App" component={App} />
        <Stack.Screen name="Forgot" component={Forgot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}