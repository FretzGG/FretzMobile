import React, { useContext, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSignOut, faStar } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../navigators/app-navigator";
import { AuthContext } from "../../../navigators/root-navigator";
import { server_url } from "../../../utils/utils";
import UserIcon from "../../../components/user-icon";
import ChatIcon from "./chat-icon";

export default function UserHeader() {
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const { signOut, userToken } = useContext(AuthContext);
  const user = useContext(UserContext);

  const [name, setName] = useState('');
  const [unreadNo, setUnreadNo] = useState(0);

  useEffect(() => {
    if (user.name){
      const names = user.name.split(' ')
      if (names.length > 1) setName(names[0] + ' ' + names[names.length - 1])
      else setName(names[0])
    }
  }, [user.name])

  const loadUnreadMessagesNumber = () => {
    isFocused && (
      fetch(server_url + 'api/message/get_unread_message_number/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`
        },
        body: JSON.stringify({
          'user': user.id
        })
      })
      .then(resp => resp.json())
      .then(jsonResp => setUnreadNo(jsonResp.message_number))
      .catch(error => console.log(error))
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      loadUnreadMessagesNumber();
    }, 1000)
    return () => clearInterval(interval)
  }, [ isFocused, user ]);

  return (
    <View style={styles.container}>
      <View style={styles.user_icon_view}>
        {user.user_type === 'PT' ?
          <TouchableOpacity onPress={() => navigation.navigate('Driver Profile')} >
            <UserIcon profile_pic={user.profile_pic} user_type={user.user_type} />
          </TouchableOpacity>
        : <UserIcon profile_pic={user.profile_pic} user_type={user.user_type} />
        }
      </View>
      <View style={styles.user_info_view}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.user_name} >{ user.user_type === 'PJ' ? user.fantasy_name : name }</Text>
          <TouchableOpacity style={{marginStart: 10}} onPress={() => signOut()} >
            <FontAwesomeIcon icon={faSignOut} color={'#DEB841'} size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.user_rating_view}>
          {user.user_type === 'PT' && (
            user.number_of_ratings > 0 ? (
            <View style={{flexDirection: 'row'}}>
              <View style={styles.user_rating_star}>
                <FontAwesomeIcon icon={faStar} color={'#DEB841'} size={28} />
              </View>
              <Text style={styles.user_rating}> {user.avg_rating.toFixed(2)}</Text>
            </View>
            ) : (
              <Text style={styles.user_rating}>Realize seu primeiro FRETZ !</Text>
            )
          )}
        </View>
      </View>
      <View style={styles.chat_view}>
        <TouchableOpacity onPress={() => 
          navigation.navigate('Chat List', {
            title: 'Chat'
          })
        }>
          <ChatIcon unreadNo={unreadNo} />
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