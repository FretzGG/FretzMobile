import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../navigators/app-navigator";
import { AuthContext } from "../../../navigators/root-navigator";
import ProfileIcon from "../../../components/profile-icon";
import { server_url } from "../../../utils/utils";

export default function ChatItem (props) {
  const navigation = useNavigation();

  const { userToken } = useContext(AuthContext);
  const user = useContext(UserContext);

  const [ unreadNo, setUnreadNo ] = useState(0);
  const [ otherUser, setOtherUser ] = useState({});

  const other_user_id = user.id !== props.chat.user_one ? props.chat.user_one : props.chat.user_two;

  useEffect(() => {
    fetch(server_url + 'api/profile/' + other_user_id + ' /', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      }
    })
    .then(resp => resp.json())
    .then(jsonResp => setOtherUser(jsonResp))
    .catch(error => console.log(error))
  }, [ props.chat ])

  const loadUnreadMessagesNumber = () => {
    fetch(server_url + 'api/message/get_unread_message_number/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
      body: JSON.stringify({
        'user': user.id,
        'chat': props.chat.id
      })
    })
    .then(resp => resp.json())
    .then(jsonResp => setUnreadNo(jsonResp.message_number))
    .catch(error => console.log(error))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      loadUnreadMessagesNumber();
    }, 1000)
    return () => clearInterval(interval)
  }, [ unreadNo ]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.item_view}
        onPress={() => navigation.navigate('Chat', {
          title: 'Pedido #' + props.chat.shipping,
          chat_id: props.chat.id,
          other_user_name: otherUser.name,
          other_user_id: other_user_id,
          shipping: props.chat.shipping
        })}
      >
        <View style={{flexDirection: 'row'}}>
          <ProfileIcon iconSize={30} iconColor={'#37323E'} circleRadius={40} circleColor={'#DEB841'} />
          <View style={{justifyContent: 'center',  marginLeft: 10}}>
            <Text style={{color: '#E6E6E6', fontWeight: 'bold'}} >Pedido #{props.chat.shipping}</Text>
            <Text style={{color: '#E6E6E6', fontSize: 10}} >{otherUser.name}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }} >
          {unreadNo > 0 && (
            <View style={styles.notification_circle}>
              <Text style={styles.notification_number}>{unreadNo}</Text>
            </View> 
          )}
          <FontAwesomeIcon 
            icon={faAngleRight}
            color={'#E6E6E6'}
            size={30}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  item_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
    width: '100%'
  },
  notification_circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E15252',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  notification_number: {
    color: '#E6E6E6',
    fontWeight: 'bold',
  }
}