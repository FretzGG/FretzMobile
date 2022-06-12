import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import MaskInput, { Masks } from "react-native-mask-input";
import DocumentPicker, { types } from 'react-native-document-picker'

export default function Form() {
  // TODO: Descobrir forma de altera o valor previsto
  // TODO: Mostrar todos os arquivos selecionados

  const type_options = ['Frágil', 'Perecível'];

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedOption, setSelectedOption] = useState(type_options[0]);
  const [address, setAddress] = useState('')
  const [deadline, setDeadline] = useState('')
  const [files, setFiles] = useState([])
  const [suggestedPrice, setSuggestedPrice] = useState('')

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.input_title}>Nome da Carga</Text>
      <TextInput 
        style={styles.text_input}
        autoCapitalize={'sentences'}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.input_title}>Descrição</Text>
      <TextInput 
        style={styles.multiline_text_input}
        autoCapitalize={'sentences'}
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.input_title}>Tipo</Text>
      <ModalDropdown 
        options={type_options}
        dropdownStyle={styles.dropdown_style}
        dropdownTextStyle={styles.dropdown_text_options}
        onSelect={(index) => setSelectedOption(type_options[index])}
      >
        <View style={styles.dropdown_button}>
          <Text style={styles.dropdown_text_selected}>{selectedOption}</Text>
        </View>
      </ModalDropdown>
      <Text style={styles.input_title}>Endereço</Text>
      <TextInput 
        style={styles.text_input}
        autoCapitalize={'sentences'}
        value={address}
        onChangeText={setAddress}
      />
      <Text style={styles.input_title}>Prazo de entrega</Text>
      <MaskInput
        style={styles.text_input}
        mask={Masks.DATE_DDMMYYYY}
        keyboardType={'numeric'}
        value={deadline}
        onChangeText={setDeadline}
        placeholderTextColor={'#37323E'}
      />
      <Text style={styles.input_title}>Anexos</Text>
      <TouchableOpacity
        style={styles.attachment_input}
        onPress={async () => {
          const response = await DocumentPicker.pickMultiple({
            type: types.pdf
          })
          setFiles(response)
        }}
      >
        <Text style={{color: '#37323E'}}>
          {files.length > 0 ?
              'Arquivos selecionados: \n' + files[0].name
            : 'Selecione um anexo (opcional)'
          }
        </Text>
      </TouchableOpacity>
      <View style={styles.price_view}>
        <Text style={styles.price_title}>Valor previsto</Text>
        <MaskInput
          style={styles.price_number}
          mask={Masks.BRL_CURRENCY}
          placeholder={'R$ 0,00'}
          placeholderTextColor={'#E6E6E6'}
          keyboardType={'numeric'}
          value={suggestedPrice}
          onChangeText={setSuggestedPrice}
        />
        <Text style={{color: '#E6E6E6', marginTop: -10}}>Toque para alterar valor</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E',
    paddingStart: 15,
  },
  input_title: {
    color: '#DEB841',
    fontWeight: 'bold',
    marginTop: 10
  },
  text_input: {
    backgroundColor: '#E6E6E6',
    color: '#37323E',
    marginTop: 10,
    borderRadius: 30,
    width: "96%",
    height: 44,
    paddingHorizontal: 20
  },
  multiline_text_input: {
    backgroundColor: '#E6E6E6',
    color: '#37323E',
    marginTop: 10,
    borderRadius: 30,
    width: "96%",
    height: 88,
    paddingHorizontal: 20
  },
  attachment_input: {
    backgroundColor: '#E6E6E6',
    color: '#37323E',
    marginTop: 10,
    borderRadius: 30,
    width: "96%",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  dropdown_button: {
    backgroundColor: '#E6E6E6',
    borderRadius: 30,
    justifyContent: 'center',
    width: "96%",
    height: 44,
    paddingHorizontal: 20
  },
  dropdown_text_selected:{
    color: '#37323E',
    marginLeft: 5,
  },
  dropdown_text_options: {
    backgroundColor: '#E6E6E6',
    color: '#37323E',
    fontSize: 13,
  },
  dropdown_style: {
    backgroundColor: '#E6E6E6',
    borderBottomColor: '#37323E',
    width: '92.5%',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    marginTop: -20,
  },
  price_view: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  price_title: {
    color: '#DEB841',
    fontWeight: 'bold',
    fontSize: 40
  },
  price_number: {
    color: '#E6E6E6',
    marginTop: -15,
    fontSize: 40,
  }
});