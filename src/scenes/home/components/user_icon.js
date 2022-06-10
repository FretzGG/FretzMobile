import React from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function UserIcon() {
  return(
    // TODO: Adicionar o circulo com o tipo do usuário
    <View style={styles.circle}>
      <FontAwesomeIcon icon={ faUser } color={ '#DEB841'} size={60} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 85,
    height: 85,
    borderRadius: 45,
    backgroundColor: '#37323E',
    justifyContent: 'center',
    alignItems: 'center'
  }
});