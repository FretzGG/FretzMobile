import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { UserContext } from "../../../navigators/app-navigator";

export default function Messages (props) {
  const user = useContext(UserContext);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View >
            <Text style={{ color: '#DEB841', fontWeight: 'bold', marginTop: 5, marginStart: 10 }}>{props.other_user}</Text> 
          </View>
        }
        data={props.messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => 
          <View style={[styles.message_box, {
            alignSelf: item.sender === user.id ? 'flex-end' : 'flex-start',
            backgroundColor: item.sender === user.id ? '#DEB841' : '#E6E6E6'
          }]}>
            <View style={item.sender === user.id ? styles.triangle_right : styles.triangle_left}/>
            <Text style={styles.text}>{item.message}</Text>
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