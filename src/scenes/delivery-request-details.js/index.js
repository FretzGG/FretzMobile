import React from "react";
import { Text, View } from "react-native";

export default function DeliveryRequestDetails(props) {
  const title = props.route.params.title;

  return (
    <View>
      <Text>
        {title}
      </Text>
    </View>
  );
}