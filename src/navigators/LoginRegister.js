import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../scenes/Login';
import Register from '../scenes/Register';
import PJRegister from '../scenes/PJRegister';

const Stack = createNativeStackNavigator();

export default function LoginRegister() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='PJRegister' component={PJRegister} />
    </Stack.Navigator>
  );
}