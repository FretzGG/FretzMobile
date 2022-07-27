import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSignOut, faStar } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../navigators/app-navigator";
import UserIcon from "./user-icon";
import ChatIcon from "./chat-icon";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../navigators/root-navigator";

export default function UserHeader() {
  const navigation = useNavigation();

  const { signOut } = useContext(AuthContext);
  const user = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.user_icon_view}>
        {user.type == 'Motorista' ?
          <TouchableOpacity onPress={() => navigation.navigate('Driver Profile')}>
            <UserIcon userType={user.type}/>
          </TouchableOpacity>
        : <UserIcon userType={user.type}/>
        }
      </View>
      <View style={styles.user_info_view}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.user_name} >{user.name}</Text>
          <TouchableOpacity style={{marginStart: 10}} onPress={() => signOut()} >
            <FontAwesomeIcon icon={faSignOut} color={'#DEB841'} size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.user_rating_view}>
          {user.type === 'Motorista' && (
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
        <TouchableOpacity onPress={() => 
          navigation.navigate('Chat List', {
            title: 'Chat'
          })
        }>
          <ChatIcon unreadNo={2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6D6A75'
  },
  user_icon_view: {
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
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