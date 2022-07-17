import React from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import CommentSection from "./components/comment-section";
import RateSelection from "./components/rate-section";

export default function RateDelivery() {
  return (
    <KeyboardAvoidingView style={styles.container}>
        <RateSelection />
        <CommentSection />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E'
  }
})