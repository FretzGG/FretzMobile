import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../navigators/app-navigator";
import { AuthContext } from "../../navigators/root-navigator";
import Messages from "./components/messages";
import MessageInput from "./components/message-input";
import { server_url } from "../../utils/utils";

export default function Chat (props) {
  const { user } = useContext(UserContext);
  const { userToken } = useContext(AuthContext);
  
  const navigation = useNavigation();

  const [ messages, setMessages ] = useState([]);

  const loadMessages = () => {
    fetch(server_url + 'api/message/get_chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
      body: JSON.stringify({
        'chat': props.route.params.chat_id,
        'user_receiver': user.id
      })
    })
    .then(resp => resp.json())
    .then(jsonResp => setMessages(jsonResp))
    .catch(error => console.log(error))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      loadMessages();
    }, 1000)
    return () => clearInterval(interval)
  }, []);

  // Isso vai salvar a mensagem do historico de chat
  const newMessage = (content) => {
    fetch(server_url + 'api/message/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
      body: JSON.stringify({
        'chat': props.route.params.chat_id,
        'sender': user.id,
        'receiver': props.route.params.other_user_id,
        'message': content,
      })
    })
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.info_circle}
          onPress={() => {
            navigation.navigate('Delivery Request Details', {
              title: props.route.params.title,
              shipping: props.route.params.shipping
            })
          }}>
            <FontAwesomeIcon icon={faInfo} color={'#DEB841'} size={25}/>
        </TouchableOpacity>
      )
    })
  })

  // TODO: Arrumar o view de quando o teclado esta aberto
  return (
    <View style={styles.container}>
      <Messages messages={messages} other_user={props.route.params.other_user_name} />
      <MessageInput writeMessage={newMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E'
  },
  info_circle: {
    borderRadius: 20,
    backgroundColor: '#37323E',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems:'center'
  }
})