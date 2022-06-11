import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function DeliveryRequestDetails(props) {
  const title = props.route.params.title;

  return (
    <ScrollView style={styles.container}>
      <View >
        <Text>Teste</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E'
  }
});