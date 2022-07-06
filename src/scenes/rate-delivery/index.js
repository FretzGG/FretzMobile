import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import CommentSection from "./components/comment-section";
import RateSelection from "./components/rate-section";

export default function RateDelivery() {
  return (
    <ScrollView style={styles.container}>
      <RateSelection />
      <CommentSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E',
  }
})