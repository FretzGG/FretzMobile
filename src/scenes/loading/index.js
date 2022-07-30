import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";

export default function LoadingScreen () {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faTruckFast} size={100} color={'#DEB841'}/>
      <Text style = {styles.name}>FRETZ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#E6E6E6',
  }
})