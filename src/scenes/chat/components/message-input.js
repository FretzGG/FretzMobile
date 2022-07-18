import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MessageInput () {
  return (
    <View style={styles.container}>
      <Text>Input</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2
  }
})