import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RatingHeader() {
  return (
    <View style={styles.container}>
      <Text>
        Header
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6D6A75'
  }
})