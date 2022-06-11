import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../scenes/home";
import DeliveryRequestDetails from "../scenes/delivery-request-details.js";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} options={{header: () => null}} />
      <Stack.Screen name='Delivery Request' component={DeliveryRequestDetails} />
    </Stack.Navigator>
  );
}