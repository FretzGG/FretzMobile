import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Messages () {
  return (
    <View style={styles.container}>
      <Text>Mensagens</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#37323E'
  }
})