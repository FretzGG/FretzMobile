import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import CommentSection from "./components/comment-section";
import RateSelection from "./components/rate-section";

export default function RateDelivery() {
  const [stars, setStars] = useState(0)

  return (
    <KeyboardAvoidingView style={styles.container}>
        <RateSelection stars={stars} setStars={setStars} />
        <CommentSection stars={stars} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E'
  }
})