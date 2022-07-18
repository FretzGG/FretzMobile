import React from "react";
import { Text, View } from "react-native";

export default function ChatItem (props) {
  return (
    <View>
      <Text>Este é um item com id {props.chat.deliveryID} </Text>
    </View>
  );
}

const styles = {

}