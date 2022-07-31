import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { UserContext } from "../../navigators/app-navigator";
import { AuthContext } from "../../navigators/root-navigator";
import ChatItem from "./components/chat-item";

export default function ChatList () {
  const user = useContext(UserContext);
  const { userToken } = useContext(AuthContext);

  const [ chats, setChats ] = useState([]);

  useEffect(() => {
    fetch('http://10.0.2.2:8000/api/chat/get_user_chats/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
      body: JSON.stringify({
        user: user.id
      })
    })
    .then(resp => resp.json())
    .then(jsonResp => {console.log(jsonResp); setChats(jsonResp)})
    .catch(error => console.log(error))
  }, [])

  // const chats = [
  //   {id: 0, clientName: 'Guguinha Martins', deliveryID: 1234},
  //   {id: 1, clientName: 'Guguinha Lopes', deliveryID: 4567},
  //   {id: 2, clientName: 'Guguinha Cardoso', deliveryID: 6910}
  // ];

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