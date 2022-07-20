import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import ModalDropdown from "react-native-modal-dropdown";
import MaskInput, { Masks } from "react-native-mask-input";


export default function Centro() {
  const navigation = useNavigation();

  //valores do tipo de frete e combustível
  const type_options = ['Simples', 'Perecível', 'Alto Valor', 'Frágil', 'Perigosa'];
  const fuel_type_options = ['Flex', 'Disel', 'Gasolina', 'Alcool', 'Eletrico'];

  //dados do motorista
  const [name, setName] = useState('')
  const [cep, setCep] = useState('')
  const [address, setAddress] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [telnumber, setTelnumber] = useState('')

  //dados do veiculo

  const [vehicleplate, setVehicleplate] = useState('')
  const [vehiclemodel, setVehiclemodel] = useState('')
  const [vehiclecategory, setVehiclecategory] = useState(type_options[0])
  const [vehicledocument, setVehicledocument] = useState('')
  const [vehiclerenavam, setVehiclerenavam] = useState('')
  const [vehiclechassi, setVehiclechassi] = useState('')
  const [vehiclefuel, setVehiclefuel] = useState(fuel_type_options[0])
  const [vehiclelicense, setVehiclelicense] = useState('')
  const [vehiclecolor, setVehiclecolor] = useState('')
  const [modelyear, setModelyear] = useState('')
  const [manufactureyear, setManufactureyear] = useState('')

  return <View style={estilos.container}>
    <ScrollView>
      <View style={estilos.upContainer}>
        <Text style={estilos.fonteCadastro}>CADASTRO</Text>
      </View>
      <View style={estilos.downContainer}>
        <Text style={estilos.fonte}>Dados do Motorista</Text>
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
        <Text style={estilos.fonte}>Dados do veículo</Text>
        <TextInput
          placeholder="Insira Placa"
          autoCapitalize="none"
          style={estilos.entrada}
          value={vehicleplate}
          onChangeText={setVehicleplate}
        />
        <TextInput
          placeholder="Insira Modelo"
          autoCapitalize="none"
          style={estilos.entrada}
          value={vehiclemodel}
          onChangeText={setVehiclemodel}
        />
        <ModalDropdown
          options={type_options}
          style={estilos.entrada}
          dropdownStyle={estilos.dropdown_style}
          dropdownTextStyle={estilos.dropdown_text_options}
          onSelect={(index) => setVehiclecategory(type_options[index])}
        >
          <View style={estilos.dropdown_button}>
            <Text style={estilos.dropdown_text_selected}>{vehiclecategory}</Text>
          </View>
        </ModalDropdown>
        <TextInput
          placeholder="Insira Documento"
          autoCapitalize="none"
          style={estilos.entrada}
          value={vehicledocument}
          onChangeText={setVehicledocument}
        />
        <TextInput
          placeholder="Insira Renavam"
          autoCapitalize="none"
          style={estilos.entrada}
          value={vehiclerenavam}
          onChangeText={setVehiclerenavam}
        />
        <TextInput
          placeholder="Insira Chassi"
          autoCapitalize="none"
          style={estilos.entrada}
          value={vehiclechassi}
          onChangeText={setVehiclechassi}
        />
        <ModalDropdown
          options={fuel_type_options}
          style={estilos.entrada}
          dropdownStyle={estilos.dropdown_style}
          dropdownTextStyle={estilos.dropdown_text_options}
          onSelect={(index) => setVehiclefuel(fuel_type_options[index])}
        >
          <View style={estilos.dropdown_button}>
            <Text style={estilos.dropdown_text_selected}>{vehiclefuel}</Text>
          </View>
        </ModalDropdown>
        <TextInput
          placeholder="Insira Licença"
          autoCapitalize="none"
          style={estilos.entrada}
          value={vehiclelicense}
          onChangeText={setVehiclelicense}
        />
        <TextInput
          placeholder="Insira Cor"
          autoCapitalize="none"
          style={estilos.entrada}
          value={vehiclecolor}
          onChangeText={setVehiclecolor}
        />
        <TextInput
          placeholder="Insira Ano do Modelo"
          autoCapitalize="none"
          style={estilos.entrada}
          value={modelyear}
          onChangeText={setModelyear}
        />
        <TextInput
          placeholder="Insira Ano de Fabricação"
          autoCapitalize="none"
          style={estilos.entrada}
          value={manufactureyear}
          onChangeText={setManufactureyear}
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
    marginLeft: 5,
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

