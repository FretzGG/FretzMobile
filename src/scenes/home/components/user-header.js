import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import UserIcon from "./user-icon";
import ChatIcon from "./chat-icon";

export default function UserHeader(props) {
  const [type, setType] = useState(0);

  const user_types = ['ClientePF', 'ClientePJ', 'Motorista']

  return (
    <SafeAreaView style={[styles.container, {flex: props.flex_size}]}>
      <TouchableOpacity onPress={() => {
        setType((type+1)%3);
        alert(user_types[(type+1)%3])
      }} style={styles.user_icon_view}>
        <UserIcon userType={user_types[type]}/>
      </TouchableOpacity>
      <View style={styles.user_info_view}>
        <Text style={styles.user_name}>Guguinha dos Santos</Text>
        <View style={styles.user_rating_view}>
          <View style={styles.user_rating_star}>
            <FontAwesomeIcon icon={faStar} color={'#DEB841'} size={28} />
          </View>
          <Text style={styles.user_rating}> 4.87</Text>
        </View>
      </View>
      <View style={styles.chat_view}>
        <TouchableOpacity onPress={() => {alert('Chat')}}>
          <ChatIcon unreadNo={2} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#6D6A75'
  },
  user_icon_view: {
    flex:2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  user_info_view:{
    flex:3,
    paddingTop: 20
  },
  user_name: {
    color: '#E6E6E6',
    fontWeight: 'bold',
    fontSize: 18
  },
  user_rating_view:{
    flexDirection: 'row',
    paddingTop: 5
  },
  user_rating_star: {
    paddingTop: 3
  },
  user_rating: {
    color: '#E6E6E6',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5
  },
  chat_view: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
});