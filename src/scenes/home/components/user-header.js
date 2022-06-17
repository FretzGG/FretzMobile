import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import UserIcon from "./user-icon";
import ChatIcon from "./chat-icon";

export default function UserHeader(props) {
  return (
    <View style={[styles.container, {flex: props.flex_size}]}>
      <View style={styles.user_icon_view}>
        {props.userType == 'Motorista' ?
          <TouchableOpacity onPress={() => alert('Avaliação do motorista')}>
            <UserIcon userType={props.userType}/>
          </TouchableOpacity>
        : <UserIcon userType={props.userType}/>
        }
      </View>
      <View style={styles.user_info_view}>
        <Text style={styles.user_name}>Guguinha Martins</Text>
        <View style={styles.user_rating_view}>
          {props.userType === 'Motorista' && (
            <View style={{flexDirection: 'row'}}>
              <View style={styles.user_rating_star}>
                <FontAwesomeIcon icon={faStar} color={'#DEB841'} size={28} />
              </View>
              <Text style={styles.user_rating}> 4.87</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.chat_view}>
        <TouchableOpacity onPress={() => {alert('Chat')}}>
          <ChatIcon unreadNo={2} />
        </TouchableOpacity>
      </View>
    </View>
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