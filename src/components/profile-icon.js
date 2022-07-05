import React from "react";
import { StyleSheet, View } from "react-native";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function ProfileIcon(props) {
  return (
    <View style={[styles.circle, {
      width: props.circleRadius,
      height: props.circleRadius,
      borderRadius: props.circleRadius/2,
      backgroundColor: props.circleColor
      }]}>
      <FontAwesomeIcon 
        icon={faUser}
        size={props.iconSize}
        color={props.iconColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  circle:{
    justifyContent: 'center',
    alignItems: 'center'
  }
});