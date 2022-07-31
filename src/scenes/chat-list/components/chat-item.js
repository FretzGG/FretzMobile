import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ProfileIcon from "../../../components/profile-icon";
import { UserContext } from "../../../navigators/app-navigator";
import UserIcon from "../../../components/user-icon";

export default function ChatItem (props) {
  const navigation = useNavigation();

  const user = useContext(UserContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.item_view}
        onPress={() => navigation.navigate('Chat', {
          title: 'Pedido #' + props.chat.shipping
        })}
      >
        <View style={{flexDirection: 'row'}}>
          {/* <UserIcon */}
          <View style={{justifyContent: 'center',  marginLeft: 10}}>
            <Text style={{color: '#E6E6E6', fontWeight: 'bold'}} >Pedido #{props.chat.shipping}</Text>
            <Text style={{color: '#E6E6E6', fontSize: 10}} >{user.name !== props.chat.user_one ? props.chat.user_one : props.chat.user_two}</Text>
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