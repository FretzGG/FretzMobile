import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import MaskInput, { Masks } from "react-native-mask-input";
import { server_url } from '../../../utils/utils';

export default function Centro() {
  const navigation = useNavigation();

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [email, setEmail] = useState('')
  const [telnumber, setTelnumber] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatedPassword, setRepeatedPassword] = useState('')

  const [ userInfo, setUserInfo ] = useState({});

  const createPJUser = () => {
    fetch(server_url + 'api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(resp => resp.json())
    .then(jsonResp => {
      fetch(server_url + 'auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })
      .then(resp => resp.json())
      .then(jsonResp => setUserInfo(jsonResp))
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  }
  
  useEffect(() => {
    Object.keys(userInfo).length > 0 && (
      fetch(server_url + 'api/profile/' + userInfo.id + '/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userInfo.token}`
        },
        body: JSON.stringify({
          user: userInfo.id,
          name: name,
          fantasy_name: name,
          address,
          cnpj,
          email,
          phone_number: telnumber,
          user_type: 'PJ'
        })
      })
      .then(resp => resp.json())
      .then(jsonResp => {
        alert('Usuário criado com sucesso!');
        navigation.navigate('Login')
      })
      .catch(error => console.log(error))
    )
  }, [ userInfo ])

  const checkInput = () => {
    if (!name){
      alert('O campo nome da empresa é obrigatório')
      return ;
    }
    if (!address){
      alert('O campo endereço é obrigatório')
      return ;
    }
    if (!cnpj){
      alert('O campo CNPJ é obrigatório')
      return ;
    }
    else{
      const numCNPJ = cnpj.split('.').join('').split('/').join('').split('-').join('')
      if(numCNPJ.length !== 14){
        alert('O campo CNPJ está inválido')
        return ;
      }
      setCnpj(numCNPJ)
    }
    if (!email){
      alert('O campo email é obrigatório')
      return ;
    }
    if (!telnumber){
      alert('O campo número de telefone é obrigatório')
      return ;
    }
    else{
      const numTel = telnumber.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')
      if(numTel.length !== 11){
        alert('O campo número de telefone está inválido')
        return ;
      }
      setTelnumber(numTel)
    }
    if (!username){
      alert('O campo nome de usuário é obrigatório')
      return ;
    }
    if (!password){
      alert('O campo senha é obrigatório')
      return ;
    }
    if (!repeatedPassword){
      alert('O campo repetir a senha é obrigatório')
      return ;
    }
    if(password !== repeatedPassword){
      alert('As senhas devem ser iguais')
      return ;
    }
    createPJUser();
  }

  return <View style={estilos.container}>
    <ScrollView>
      <View style={estilos.upContainer}>
        <Text style={estilos.fonteCadastro}>CADASTRO</Text>
      </View>
      <View style={estilos.downContainer}>
        <Text style={estilos.fonte}>Dados da Empresa</Text>
        <TextInput
          placeholder="Insira o nome da empresa"
          placeholderTextColor={'#6D6A75'}
          autoCapitalize="none"
          style={estilos.entrada}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Insira seu endereço"
          placeholderTextColor={'#6D6A75'}
          autoCapitalize="none"
          style={estilos.entrada}
          value={address}
          onChangeText={setAddress}
        />
        <MaskInput
          style={estilos.entrada}
          mask={Masks.BRL_CNPJ}
          placeholder="Insira CNPJ"
          placeholderTextColor={'#6D6A75'}
          keyboardType={'numeric'}
          value={cnpj}
          onChangeText={setCnpj}
        />
        <TextInput
          placeholder="Insira e-mail"
          placeholderTextColor={'#6D6A75'}
          autoCapitalize="none"
          style={estilos.entrada}
          value={email}
          onChangeText={setEmail}
        />
        <MaskInput
          style={estilos.entrada}
          mask={Masks.BRL_PHONE}
          placeholder="Insira n° telefone"
          placeholderTextColor={'#6D6A75'}
          keyboardType={'numeric'}
          value={telnumber}
          onChangeText={setTelnumber}
        />
        <Text style={estilos.fonte}>Credenciais</Text>
        <TextInput
          placeholder="Insira seu nome de usuário"
          placeholderTextColor={'#6D6A75'}
          autoCapitalize="none"
          style={estilos.entrada}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Insira sua senha"
          placeholderTextColor={'#6D6A75'}
          secureTextEntry={true}
          autoCapitalize="none"
          style={estilos.entrada}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Repita a senha"
          placeholderTextColor={'#6D6A75'}
          secureTextEntry={true}
          autoCapitalize="none"
          style={estilos.entrada}
          value={repeatedPassword}
          onChangeText={setRepeatedPassword}
        />
        <TouchableOpacity
          style={estilos.botao}
          onPress={() => { checkInput() }}
        >
          <Text style={estilos.textoBotao}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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

