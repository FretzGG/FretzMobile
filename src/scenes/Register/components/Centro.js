import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function Topo() {
  const navigation = useNavigation();

  return (
    <View style = {estilos.container} >
      <View style = {estilos.upContainer}> 
        <Text style = {estilos.fonte}>CADASTRO</Text>
      </View>
      <View style = {estilos.downContainer}>
        <TouchableOpacity style={estilos.botao}>
          <Text style={estilos.textoBotao}>
            Pessoa Física
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={estilos.botao}
        onPress={ () => {
          navigation.navigate('PJRegister')
        }}
        >
          <Text style={estilos.textoBotao}>
            Pessoa Jurídica
          </Text>
        </TouchableOpacity>
        <Text style = {estilos.fonteEsqueciASenha}>
          O cadastro de pessoa jurídica está disponível apenas para aqueles que foram utilizar do aplcativo como cliente
        </Text>
      </View>
    </View>

  );
}

const estilos = StyleSheet.create({
  fonte: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E6E6E6',
  },
  container: {
    backgroundColor: '#37323E',
    flex: 9,
  },
  upContainer: {
    backgroundColor: '#37323E',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  downContainer: {
    backgroundColor: '#37323E',
    alignItems: 'center',
    flex: 8,
  },
  botao: {
      backgroundColor: '#DEB841',
      marginTop: 90,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      width: '50%',
  },
  textoBotao: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#37323E',
  },
  fonteEsqueciASenha: {
    marginTop: 10,
    textDecorationLine: 'underline',
    color: '#E6E6E6',
  },
});

