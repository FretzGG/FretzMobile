import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";

export default function Topo() {
  return <View style = {estilos.container}>
    <Text style = {estilos.fonte}>FRETZ</Text>
    <View style={estilos.icon}>
      <FontAwesomeIcon icon={faTruckFast} size={42} color={'#DEB841'}/>
    </View>
  </View>
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  fonte: {
    marginTop: 24,
    fontSize: 42,
    lineHeight: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E6E6E6',
  },
  icon: {
    paddingLeft: 5,
    paddingTop: 15
  }
});
