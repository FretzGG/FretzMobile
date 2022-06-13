import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Topo() {
  return <View style = {estilos.container}>
    <Text style = {estilos.fonte}>FRETZ</Text>
  </View>
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fonte: {
    marginTop: 24,
    fontSize: 42,
    lineHeight: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E6E6E6',
  }
});
