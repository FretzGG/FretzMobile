import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../scenes/home";
import DeliveryRequestDetails from "../scenes/delivery-request-details";
import DeliveryRequestForm from "../scenes/delivery-request-form";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='Home'
        component={HomeScreen}
        options={{header: () => null}} 
      />
      <Stack.Screen
        name='Delivery Request Details'
        component={DeliveryRequestDetails}
        options={({route}) => ({
          title: route.params.title, 
          headerTintColor: '#DEB841',
          headerStyle: {
            backgroundColor: '#6D6A75',
          },
          headerTitleStyle: {
            color: '#E6E6E6'
          },
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name='Delivery Request Form'
        component={DeliveryRequestForm}
        options={({route}) => ({
          title: route.params.title,
          headerTintColor: '#DEB841',
          headerStyle: {
            backgroundColor: '#6D6A75',
          },
          headerTitleStyle: {
            color: '#E6E6E6'
          },
          headerTitleAlign: 'center'
        })}
      />
    </Stack.Navigator>
  );
}