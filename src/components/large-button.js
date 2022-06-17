import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default function LargeButton(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={props.onPress}
      >
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button:{
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    backgroundColor: '#DEB841',
    padding: 10,
    width: '45%',
    borderRadius: 25,
  },
  text:{
    color: '#37323E',
    fontWeight: 'bold'
  }
});