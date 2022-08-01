import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import ModalDropdown from "react-native-modal-dropdown";
import MaskInput, { Masks } from "react-native-mask-input";
import { server_url } from '../../../utils/utils';

export default function Centro() {
  const navigation = useNavigation();

  //valores do tipo de frete e combustível
  const type_options = ['Selecione a Categoria', 'Simples', 'Pesado', 'Perecível', 'Alto Valor', 'Frágil', 'Perigosa'];
  
  //dados do motorista
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [telnumber, setTelnumber] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatedPassword, setRepeatedPassword] = useState('')

  //dados do veiculo
  const [vehicleplate, setVehicleplate] = useState('')
  const [vehiclemodel, setVehiclemodel] = useState('')
  const [vehiclecategory, setVehiclecategory] = useState(type_options[0])
  const [vehiclecolor, setVehiclecolor] = useState('')

  const createPTUser = () => {
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
    .then(resp => {
      if(!resp.ok){
        alert('Erro ao criar usuário. Tente novamente')
        return ;
      }
    })
    .then(() => {
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
      .then(jsonResp => updateProfile(jsonResp))
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  }

  const updateProfile = (userInfo) => {
    fetch(server_url + 'api/profile/' + userInfo.id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userInfo.token}`
      },
      body: JSON.stringify({
        user: userInfo.id,
        name,
        address,
        cpf,
        email,
        phone_number: telnumber,
        user_type: 'PT'
      })
    })
    .then(resp => resp.json())
    .then(jsonResp => createVehicle(userInfo))
    .catch(error => console.log(error))
  }

  const createVehicle = (userInfo) => {
    fetch(server_url + 'api/vehicle/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userInfo.token}`
      },
      body: JSON.stringify({
        user: userInfo.id,
        vehicle_license_plate: vehicleplate,
        vehicle_model: vehiclemodel,
        vehicle_category: vehiclecategory,
        vehicle_color: vehiclecolor,
      })
    })
    .then(resp => {
      if(!resp.ok){
        alert('Erro ao criar veículo. Tente novamente')
        return ;
      }
    })
    .then(() => {
      alert('Usuário criado com sucesso!');
      navigation.navigate('Login')
    })
    .catch(error => console.log(error))
  }

  const checkInput = () => {
    if (!name){
      alert('O campo nome é obrigatório')
      return ;
    }
    if (!address){
      alert('O campo endereço é obrigatório')
      return ;
    }
    if (!cpf){
      alert('O campo CPF é obrigatório')
      return ;
    }
    else{
      const numCPF = cpf.split('.').join('').split('-').join('')
      if(numCPF.length !== 11){
        alert('O campo CPF está inválido')
        return ;
      }
      setCpf(numCPF)
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
    if (!vehicleplate){
      alert('O campo placa do veículo é obrigatório')
      return ;
    }
    if (!vehiclemodel){
      alert('O campo modelo do veículo é obrigatório')
      return ;
    }
    if (vehiclecategory == type_options[0]){
      alert('O campo categoria do veículo deve ser selecionado')
      return ;
    }
    if (!vehiclecolor){
      alert('O campo cor do veículo é obrigatório')
      return ;
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
    createPTUser();
  }

  return <View style={estilos.container}>
    <ScrollView>
      <View style={estilos.upContainer}>
        <Text style={estilos.fonteCadastro}>CADASTRO</Text>
      </View>
      <View style={estilos.downContainer}>
        <Text style={estilos.fonte}>Dados do Motorista</Text>
        <TextInput
          placeholder="Insira seu nome"
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
          mask={Masks.BRL_CPF}
          placeholder="Insira CPF"
          placeholderTextColor={'#6D6A75'}
          keyboardType={'numeric'}
          value={cpf}
          onChangeText={setCpf}
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
        <Text style={estilos.fonte}>Dados do veículo</Text>
        <TextInput
          placeholder="Insira Placa"
          placeholderTextColor={'#6D6A75'}
          autoCapitalize="none"
          style={estilos.entrada}
          value={vehicleplate}
          onChangeText={setVehicleplate}
        />
        <TextInput
          placeholder="Insira Modelo"
          placeholderTextColor={'#6D6A75'}
          autoCapitalize="none"
          style={estilos.entrada}
          value={vehiclemodel}
          onChangeText={setVehiclemodel}
        />
        <ModalDropdown
          options={type_options.slice(1, type_options.length)}
          style={estilos.entrada}
          dropdownStyle={estilos.dropdown_style}
          dropdownTextStyle={estilos.dropdown_text_options}
          onSelect={(index) => setVehiclecategory(type_options[index + 1])}
        >
          <View style={estilos.dropdown_button}>
            <Text style={vehiclecategory === type_options[0] ? [estilos.dropdown_text_selected, {color: '#6D6A75'}] : estilos.dropdown_text_selected}>{vehiclecategory}</Text>
          </View>
        </ModalDropdown>
        <TextInput
          placeholder="Insira Cor"
          placeholderTextColor={'#6D6A75'}
          autoCapitalize="none"
          style={estilos.entrada}
          value={vehiclecolor}
          onChangeText={setVehiclecolor}
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
  dropdown_button: {
    marginTop: 10,
    borderColor: '#E6E6E6',
    backgroundColor: '#E6E6E6',
    fontSize: 16,
    color: '#37323E',
  },
  dropdown_text_selected: {
    color: '#37323E',
    fontSize: 16,
  },
  dropdown_text_options: {
    backgroundColor: '#E6E6E6',
    color: '#37323E',
    fontSize: 16,
  },
  dropdown_style: {
    backgroundColor: '#E6E6E6',
    borderBottomColor: '#37323E',
    width: '92.5%',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    marginTop: -20,
  },
});

