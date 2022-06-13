import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import LoginRegister from './navigators/LoginRegister'

export default function App() {
  return (
    <NavigationContainer style={{ flex: 1 }}>
      <LoginRegister />
    </NavigationContainer>
  );
}