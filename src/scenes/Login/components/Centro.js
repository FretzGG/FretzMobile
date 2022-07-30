import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../navigators/root-navigator';

export default function Centro() {
  const navigation = useNavigation();
  const { signIn } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  return <View style = {estilos.container}>
    <Text style = {estilos.fonte} >LOG IN</Text>
    <TextInput
      placeholder="Nome do usuário"
      placeholderTextColor={'#6D6A75'}
      autoCapitalize="none"
      onChangeText={setUsername}
      value={username}
      style={estilos.entrada}
    />
    <TextInput
      placeholder="Senha"
      placeholderTextColor={'#6D6A75'}
      autoCapitalize="none"
      secureTextEntry={true}
      onChangeText={setPassword}
      value={password}
      style={estilos.entrada}
    />
    <TouchableOpacity 
      style={estilos.botao}
      onPress={() => signIn({username, password})}
    >
      <Text style={estilos.textoBotao}>
        Login
      </Text>
    </TouchableOpacity>
    <TouchableOpacity 
    style={estilos.botaoregistro}
    onPress={ () => {
      navigation.navigate('Register')
    }}
    >
      <Text style={estilos.textoBotao}>
        Registrar
      </Text>
    </TouchableOpacity>
    {/* <Text onPress={ () =>
      {alert('Esqueci a senha');}}
      style = {estilos.fonteEsqueciASenha}>
      Esqueci a senha
    </Text>  */}
  </View>
}

const estilos = StyleSheet.create({
  fonte: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E6E6E6',
  },
  container: {
    backgroundColor: '#37323E',
    alignItems: 'center',
    justifyContent: 'center',
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
  botaoregistro: {
    backgroundColor: '#AEAEAE',
    marginTop: 10,
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
      borderWidth: 2,
      borderColor: '#E6E6E6',
      backgroundColor: '#E6E6E6',
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#37323E',
      marginTop: 20,
      borderRadius: 25,
      height: 44,
      width: '90%',
  },
  fonteEsqueciASenha: {
    marginTop: 10,
    textDecorationLine: 'underline',
    color: '#E6E6E6',
  },
});

