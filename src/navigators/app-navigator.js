import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import HomeScreen from "../scenes/home";
import DeliveryRequestDetails from "../scenes/delivery-request-details.js";

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
          headerRight: () => (
            <TouchableOpacity>
              <FontAwesomeIcon 
                icon={faPenToSquare}
                color='#DEB841'
                size={25}
              />
            </TouchableOpacity>
          )
        })}
      />
    </Stack.Navigator>
  );
}