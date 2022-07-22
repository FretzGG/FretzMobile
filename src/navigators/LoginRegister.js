import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../scenes/Login';
import Register from '../scenes/Register';
import PJRegister from '../scenes/PJRegister';
import ClientRegister from '../scenes/client-register';
import PFRegister from '../scenes/pf-register';
import DriverRegister from '../scenes/driver-register';

const Stack = createNativeStackNavigator();

export default function LoginRegister() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='ClientRegister' component={ClientRegister} />
      <Stack.Screen name='PJRegister' component={PJRegister} />
      <Stack.Screen name='PFRegister' component={PFRegister} />
      <Stack.Screen name='DriverRegister' component={DriverRegister} />
    </Stack.Navigator>
  );
}