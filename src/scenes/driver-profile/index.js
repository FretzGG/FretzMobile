import React from "react";
import { StyleSheet, View } from "react-native";
import RatingBody from "./components/rating-body";
import RatingHeader from "./components/rating-header";

export default function DriverProfile() {
  return (
    <View style={styles.container}>
      <RatingHeader />
      <RatingBody />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E'
  }
})