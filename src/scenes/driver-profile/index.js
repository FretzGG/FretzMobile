import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DriverProfile() {
  return (
    <View style={styles.container}>
      <Text>
        Perfil do motorista
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E'
  }
})