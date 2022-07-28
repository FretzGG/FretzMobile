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

  useEffect(() => {
    const readToken = async () => {
      try {
        const token = await AsyncStorage.getItem('FRETZ_TOKEN');
        if(token){
          setUserToken(token);
        }
      }
      catch (error) {
        console.log(error)
      }
    };
    readToken()
      .then(() => {
        setInterval(() => setIsLoading(false), 1000)
      })
  }, []);

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('FRETZ_TOKEN', token)
      setUserToken(token);
    }
    catch (error) {
      console.log(error)
    }
  };

  const authContext = useMemo(() => ({
    signIn: async (data) => {
      fetch('http://10.0.2.2:8000/auth/', {
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
          storeToken(jsonResp.token);
        }
      })
      .catch(error => console.log(error))
    },
    signOut: async () => { await AsyncStorage.removeItem('FRETZ_TOKEN'); setUserToken(null) },
    userToken: userToken
  }), [userToken]);

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