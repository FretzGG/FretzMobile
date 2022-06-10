import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function UserHeader(props) {
  return (
    <View style={[styles.container, {flex: props.flex_size}]}>
      <View style={{flex:1}}>
        <Text>User Photo</Text>
      </View>
      <View style={{flex:1}}>
        <Text>User Name</Text>
      </View>
      <View style={{flex:1}}>
        <Text>Chat</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6D6A75'
  }
});