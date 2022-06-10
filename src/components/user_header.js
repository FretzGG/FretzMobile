import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import UserIcon from "./user_icon";

export default function UserHeader(props) {
  return (
    <SafeAreaView style={[styles.container, {flex: props.flex_size}]}>
      <View style={{flex:2, justifyContent: 'center', alignItems: 'center'}}>
        <UserIcon />
      </View>
      <View style={{flex:3}}>
        <Text>User Name</Text>
      </View>
      <View style={{flex:2}}>
        <Text>Chat</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6D6A75'
  },
});