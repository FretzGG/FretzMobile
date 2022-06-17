import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { UserContext } from "../../navigators/app-navigator";
import RequestList from "./components/request-list";
import UserHeader from "./components/user-header";

export default function HomeScreen() {
  const user = useContext(UserContext);

  return (
    <View style={styles.container}>
      <UserHeader userType={user.type} flex_size={1}/>
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