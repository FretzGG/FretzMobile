import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";

export default function Form() {
  const type_options = ['Frágil', 'Perecível'];
  const [selectedOption, setSelectedOption] = useState(type_options[0]);

  return (
    <View style={styles.container}>
      <Text style={styles.input_title}>Nome da Carga</Text>
      <TextInput 
        style={styles.text_input}
        autoCapitalize={'sentences'}
      />
      <Text style={styles.input_title}>Descrição</Text>
      <TextInput 
        style={styles.text_input}
        autoCapitalize={'sentences'}
        multiline={true}
        numberOfLines={4}
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
      <Text style={styles.input_title}>Enderço</Text>
      <TextInput 
        style={styles.text_input}
        autoCapitalize={'sentences'}
      />
    </View>
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
    marginTop: 10,
    borderRadius: 30,
    width: "96%"
  },
  dropdown_button: {
    backgroundColor: '#E6E6E6',
    borderRadius: 30,
    justifyContent: 'center',
    width: "96%",
    height: 40
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
});