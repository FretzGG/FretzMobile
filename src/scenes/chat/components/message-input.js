import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import LargeButton from "../../../components/large-button";

export default function MessageInput (props) {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <View style={{marginLeft: 20}}>
        <Text style={styles.input_title}>Mensagem</Text>
        <TextInput
          style={styles.message_input}
          autoCapitalize={'sentences'}
          multiline={true}
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
        />
      </View>
      <LargeButton 
        title={'Enviar'}
        onPress={() => props.writeMessage(message)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'flex-end'
  },
  input_title: {
    color: '#DEB841',
    fontWeight: 'bold',
    marginTop: 10
  },
  message_input: {
    backgroundColor: '#E6E6E6',
    color: '#37323E',
    marginTop: 10,
    borderRadius: 30,
    height: 88,
    marginRight: 20,
    marginBottom: -20
  }
})