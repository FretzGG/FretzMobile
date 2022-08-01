import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../navigators/app-navigator";
import { AuthContext } from "../../../navigators/root-navigator";
import ProfileIcon from "../../../components/profile-icon";

export default function ChatItem (props) {
  const navigation = useNavigation();

  const { userToken } = useContext(AuthContext);
  const user = useContext(UserContext);

  const [ otherUser, setOtherUser ] = useState({});

  const other_user_id = user.id !== props.chat.user_one ? props.chat.user_one : props.chat.user_two;

  useEffect(() => {
    fetch('http://10.0.2.2:8000/api/profile/' + other_user_id + ' /', {
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
        <FontAwesomeIcon 
          icon={faAngleRight}
          color={'#E6E6E6'}
          size={30}
        />
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
  }
}