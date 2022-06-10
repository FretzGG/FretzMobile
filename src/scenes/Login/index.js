import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Topo from '../../components/Topo';
import Centro from './components/Centro';

export default function Login () {
  return (
    <View style = {estilos.container}>
      <Topo />
      <Centro />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E',
  },
}); 