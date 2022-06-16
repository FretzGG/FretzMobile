import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginRegister from "./LoginRegister";
import AppNavigator from "./app-navigator";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen 
          name="LoginRegister"
          component={LoginRegister}
        />
        <Stack.Screen 
          name="AppNavigator"
          component={AppNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}