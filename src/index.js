import React from "react";
import { SafeAreaView, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import LoginRegister from './navigators/LoginRegister'

export default function App() {
  return (
    <NavigationContainer style={{ flex: 1 }}>
      <LoginRegister />
    </NavigationContainer>
  );
}