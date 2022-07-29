import React, { createContext, useContext, useMemo, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./root-navigator";
import HomeScreen from "../scenes/home";
import DeliverySearch from "../scenes/delivery-search";
import DeliveryRequestDetails from "../scenes/delivery-request-details";
import DeliveryRequestForm from "../scenes/delivery-request-form";
import DriverProfile from "../scenes/driver-profile";
import RateDelivery from "../scenes/rate-delivery";
import ChatList from "../scenes/chat-list";
import Chat from "../scenes/chat";

export const UserContext = createContext();

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { userToken, userID } = useContext(AuthContext);

  const [ user, setUser ] = useState({});

  useMemo(() => {
    fetch('http://10.0.2.2:8000/api/profile/' + userID, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${userToken}`
      }
    })
    .then(resp => resp.json())
    .then(jsonResp => setUser(jsonResp))
    .catch(error => console.log(error))
  }, [])

  return (
    <UserContext.Provider value={user}>
      <Stack.Navigator 
        screenOptions={{
          headerTintColor: '#DEB841',
          headerStyle: {
            backgroundColor: '#6D6A75',
          },
          headerTitleStyle: {
            color: '#E6E6E6'
          },
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Group 
          screenOptions={{
            header: () => null
          }}
        >
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Driver Profile' component={DriverProfile} />
        </Stack.Group>

        <Stack.Group 
          screenOptions={({route}) => ({
            title: route.params.title, 
          })}
        >
          <Stack.Screen name='Delivery Search' component={DeliverySearch} />
          <Stack.Screen name='Delivery Request Details' component={DeliveryRequestDetails} />
          <Stack.Screen name='Delivery Request Form' component={DeliveryRequestForm} />
          <Stack.Screen name='Chat List' component={ChatList} />
          <Stack.Screen name='Chat' component={Chat} />
        </Stack.Group>
        <Stack.Screen
          name='Rate Delivery'
          component={RateDelivery}
          options={{
            title: 'Como foi seu FRETZ?'
          }} 
        />
      </Stack.Navigator>
    </UserContext.Provider>
  );
}