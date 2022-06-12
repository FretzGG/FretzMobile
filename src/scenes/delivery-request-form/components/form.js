import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Form() {
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
      <TextInput 
        style={styles.text_input}
        autoCapitalize={'sentences'}
      />
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
  }
});