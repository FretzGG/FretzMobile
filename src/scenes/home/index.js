import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import RequestList from "./components/request-list";
import UserHeader from "./components/user-header";

export default function HomeScreen() {
  const [userType, setUserType] = useState(2);

  const user_types = ['ClientePF', 'ClientePJ', 'Motorista']

  return (
    <View style={styles.container}>
      <UserHeader userType={user_types[userType]} flex_size={1}/>
      <RequestList flex_size={5}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E'
  }
})