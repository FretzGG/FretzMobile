import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import LargeButton from "../../../components/large-button";

export default function CommentSection() {
  const [comment, setComment] = useState('');

  return (
    <View style={{flex: 1, paddingTop: 100}}>
      <View style={{flex: 1, justifyContent: 'flex-end', marginLeft: 20}}>
        <Text style={styles.input_title}>Comentário</Text>
        <TextInput
          style={styles.comment_input}
          autoCapitalize={'sentences'}
          multiline={true}
          numberOfLines={4}
          value={comment}
          onChangeText={setComment}
        />
      </View>
      <LargeButton 
        title={'Avaliar'}
        onPress={() => {alert('Avaliar fulano')}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input_title: {
    color: '#DEB841',
    fontWeight: 'bold',
    marginTop: 10
  },
  comment_input: {
    backgroundColor: '#E6E6E6',
    color: '#37323E',
    marginTop: 10,
    borderRadius: 30,
    height: 88,
    marginRight: 20,
    marginBottom: -20
  }
})