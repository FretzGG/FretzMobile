import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import Messages from "./components/messages";
import MessageInput from "./components/message-input";
import { UserContext } from "../../navigators/app-navigator";

export default function Chat (props) {
  const user = useContext(UserContext);
  
  const navigation = useNavigation();

  const messages = [
    {id: 0, userName: 'Guguinha Martins', content: 'Oi!'},
    {id: 1, userName: 'Guguinha Neves', content: 'Olá!'},
    {id: 2, userName: 'Guguinha Martins', content: 'A entrega chegará no prazo?'},
    {id: 3, userName: 'Guguinha Neves', content: 'Sim, ela chegará no prazo acordado.'},
  ];

  // Isso vai salvar a mensagem do historico de chat
  const newMessage = (content) => {
    messages.push({id: 4, userName: user.name, content: content});
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.info_circle}
          onPress={() => {
            navigation.navigate('Delivery Request Details', {
              title: props.route.params.title
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
      <Messages messages={messages}/>
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