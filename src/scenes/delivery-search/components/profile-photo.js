import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ProfilePhoto() {
  return (
    <View style={styles.circle}>
      <FontAwesomeIcon 
        icon={faUser}
        size={30}
        color={'#37323E'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  circle:{
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DEB841',
    justifyContent: 'center',
    alignItems: 'center'
  }
});