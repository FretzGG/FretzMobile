import React, { createContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginRegister from "./LoginRegister";
import AppNavigator from "./app-navigator";
import LoadingScreen from "../scenes/loading";

const Stack = createNativeStackNavigator();

export const AuthContext = createContext();

export default function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userID, setuserID] = useState(null);

  useEffect(() => {
    const readUserInfo = async () => {
      try {
        await AsyncStorage.multiGet(['FRETZ_TOKEN', 'USER_ID'], (err, user) => {
          if (user.token){
            setUserToken(user.token);
          }
          if (user.id){
            setuserID(id);
          }
          if(err != null)
            console.log(err)
        })
      }
      catch (error) {
        console.log(error)
      }
    };
    readUserInfo()
      .then(() => {
        setInterval(() => setIsLoading(false), 1000)
      })
  }, []);

  const storeUserInfo = async (user) => {
    try {
      await AsyncStorage.multiSet([['FRETZ_TOKEN', user.token], ['USER_ID', toString(user.id)]], () => {
        setUserToken(user.token);
        setuserID(user.id)
      })
    }
    catch (error) {
      console.log(error)
    }
  };

  const authContext = useMemo(() => ({
    signIn: async (data) => {
      fetch('http://10.0.2.2:8000/api/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password
        })
      })
      .then(resp => resp.json())
      .then(jsonResp => {
        if (jsonResp.token === null || jsonResp.token === undefined) {
          alert('Nome de usuário e/ou senha erradas!')
        }
        else {
          storeUserInfo(jsonResp)
        }
      })
      .catch(error => console.log(error))
    },
    signOut: async () => {
      await AsyncStorage.multiRemove(['FRETZ_TOKEN', 'USER_ID'], () => {
        setUserToken(null);
        setuserID(null);
      })
    },
    userToken: userToken,
    userID: userID
  }), [userToken, userID]);

  if (isLoading) {
    return <LoadingScreen />
  }
  
  return (
    <AuthContext.Provider value={authContext} >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          {userToken ? (
            <Stack.Screen name="AppNavigator" component={AppNavigator} />
          ) : (
            <Stack.Screen name="LoginRegister" component={LoginRegister} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}