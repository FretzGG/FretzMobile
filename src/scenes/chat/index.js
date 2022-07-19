import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ProfileIcon from "../../components/profile-icon";
import Messages from "./components/messages";
import MessageInput from "./components/message-input";

export default function Chat (props) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate('Delivery Request Details', {
              title: props.route.params.title
            })
          }}>
            <ProfileIcon iconSize={30} iconColor={'#DEB841'} circleRadius={40} circleColor={'#37323E'} />
        </TouchableOpacity>
      )
    })
  })

  // TODO: Arrumar o view de quando o teclado esta aberto
  return (
    <View style={styles.container}>
      <Messages />
      <MessageInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E'
  }
})