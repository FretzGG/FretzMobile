import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { UserContext } from "../../../navigators/app-navigator";

export default function Messages () {
  const user = useContext(UserContext);

  const messages = [
    {id: 0, userName: 'Guguinha Martins', content: 'Oi!'},
    {id: 1, userName: 'Guguinha Neves', content: 'Olá!'},
    {id: 2, userName: 'Guguinha Martins', content: 'A entrega chegará no prazo?'},
    {id: 3, userName: 'Guguinha Neves', content: 'Sim, ela chegará no prazo acordado.'},
  ];

  return (
    <View style={styles.container}>
      <FlatList 
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => 
          <View style={[styles.message_box, {
            alignSelf: item.userName === user.name ? 'flex-end' : 'flex-start',
            backgroundColor: item.userName === user.name ? '#DEB841' : '#E6E6E6'
          }]}>
            <View style={item.userName === user.name ? styles.triangle_right : styles.triangle_left}/>
            <Text style={styles.text}>{item.content}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
  },
  message_box: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  triangle_right: {
    position: 'absolute',
    right: -15,
    borderRightWidth: 30,
    borderRightColor: "transparent",
    borderTopWidth: 30,
    borderTopColor: "#DEB841",
  },
  triangle_left: {
    position: 'absolute',
    left: -15,
    borderRightWidth: 30,
    borderRightColor: "#E6E6E6",
    borderBottomWidth: 30,
    borderBottomColor: "transparent",
  },
  text: {
    color: '#37323E',
    fontWeight: 'bold'
  }
})