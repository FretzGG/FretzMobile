import React from "react";
import { StyleSheet, View } from "react-native";
import RateSelection from "./components/rate-section";

export default function RateDelivery() {
  return (
    <View style={styles.container}>
      <RateSelection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E'
  }
})