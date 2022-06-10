import React from "react";
import { Text, View } from "react-native";

export default function RequestList(props){
  return (
    <View style={{flex: props.flex_size}}>
      <Text>I am Request List from Home Screen!</Text>
    </View>
  );
}