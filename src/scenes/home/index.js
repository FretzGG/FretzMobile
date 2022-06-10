import React from "react";
import { View } from "react-native";
import RequestList from "../../components/request_list";
import UserHeader from "../../components/user_header";

export default function HomeScreen() {
  return (
    <View>
      <UserHeader />
      <RequestList />
    </View>
  );
}