import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ChatItem from "./components/chat-item";

export default function ChatList () {
  const chats = [
    {id: 0, clientName: 'Guguinha Martins', deliveryID: 1234},
    {id: 1, clientName: 'Guguinha Lopes', deliveryID: 4567},
    {id: 2, clientName: 'Guguinha Cardoso', deliveryID: 6910}
  ];

  return (
    <View style={styles.container}>
      <FlatList 
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ChatItem chat={item} /> }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E'
  }
})