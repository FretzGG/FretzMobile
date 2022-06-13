import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';


export default function Topo() {
  const navigation = useNavigation();
  
  return <View style = {estilos.container}>
    <View style = {estilos.upContainer}> 
      <Text style = {estilos.fonteCadastro}>CADASTRO</Text>
    </View>
    <View style = {estilos.downContainer}>
      <Text style = {estilos.fonte}>Dados da Empresa</Text>
      <TextInput
        placeholder="Insira o nome da empresa"
        autoCapitalize="none"
        style={estilos.entrada}
      />
      <TextInput
        placeholder="Insira CEP"
        autoCapitalize="none"
        style={estilos.entrada}
      />
      <TextInput
        placeholder="Insira endereço da empresa"
        autoCapitalize="none"
        style={estilos.entrada}
      />
      <TextInput
        placeholder="Insira CNPJ"
        autoCapitalize="none"
        style={estilos.entrada}
      />
      <TextInput
        placeholder="Insira e-mail"
        autoCapitalize="none"
        style={estilos.entrada}
      />
      <Text style = {estilos.fonte}>Senha</Text>
      <TextInput
        placeholder="Insira sua senha"
        autoCapitalize="none"
        style={estilos.entrada}
      />
      <TextInput
        placeholder="Repita a senha"
        autoCapitalize="none"
        style={estilos.entrada}
      />
      <TouchableOpacity 
      style={estilos.botao}
      onPress={ () => {}}
      >
        <Text style={estilos.textoBotao}>
          Cadastrar
        </Text>
      </TouchableOpacity>
    </View>
    </View>
}

const estilos = StyleSheet.create({
  fonteCadastro: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E6E6E6',
  },
  fonte: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E6E6E6',
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
  container: {
    backgroundColor: '#37323E',
    flex: 9,
  },
  botao: {
      backgroundColor: '#DEB841',
      marginTop: 20,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      width: '45%',
  },
  textoBotao: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#37323E',
  },
  entrada: {
      marginTop: 10,
      borderColor: '#E6E6E6',
      backgroundColor: '#E6E6E6',
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#37323E',
      borderRadius: 25,
      height: 40,
      width: '90%',
  },
});

