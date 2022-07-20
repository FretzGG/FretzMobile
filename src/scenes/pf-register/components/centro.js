import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import MaskInput, { Masks } from "react-native-mask-input";


export default function Centro() {
  const navigation = useNavigation();

  const [name, setName] = useState('')
  const [cep, setCep] = useState('')
  const [address, setAddress] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [telnumber, setTelnumber] = useState('')

  return <View style={estilos.container}>
    <ScrollView>
      <View style={estilos.upContainer}>
        <Text style={estilos.fonteCadastro}>CADASTRO</Text>
      </View>
      <View style={estilos.downContainer}>
        <Text style={estilos.fonte}>Dados do Cliente</Text>
        <TextInput
          placeholder="Insira seu nome"
          autoCapitalize="none"
          style={estilos.entrada}
          value={name}
          onChangeText={setName}
        />
        <MaskInput
          style={estilos.entrada}
          mask={Masks.ZIP_CODE}
          placeholder="Insira CEP"
          placeholderTextColor={'#37323E'}
          keyboardType={'numeric'}
          value={cep}
          onChangeText={setCep}
        />
        <TextInput
          placeholder="Insira seu endereço"
          autoCapitalize="none"
          style={estilos.entrada}
          value={address}
          onChangeText={setAddress}
        />
        <MaskInput
          style={estilos.entrada}
          mask={Masks.BRL_CPF}
          placeholder="Insira CPF"
          placeholderTextColor={'#37323E'}
          keyboardType={'numeric'}
          value={cpf}
          onChangeText={setCpf}
        />
        <TextInput
          placeholder="Insira e-mail"
          autoCapitalize="none"
          style={estilos.entrada}
          value={email}
          onChangeText={setEmail}
        />
        <MaskInput
          style={estilos.entrada}
          mask={Masks.BRL_PHONE}
          placeholder="Insira n° telefone"
          placeholderTextColor={'#37323E'}
          keyboardType={'numeric'}
          value={telnumber}
          onChangeText={setTelnumber}
        />
        <Text style={estilos.fonte}>Senha</Text>
        <TextInput
          placeholder="Insira sua senha"
          secureTextEntry={true}
          autoCapitalize="none"
          style={estilos.entrada}
        />
        <TextInput
          placeholder="Repita a senha"
          secureTextEntry={true}
          autoCapitalize="none"
          style={estilos.entrada}
        />
        <TouchableOpacity
          style={estilos.botao}
          onPress={() => { }}
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

