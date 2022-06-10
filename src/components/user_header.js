import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function UserHeader(props) {
  return (
    <View style={[styles.container, {flex: props.flex_size}]}>
      <Text>I am User Header from Home Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6D6A75'
  }
});