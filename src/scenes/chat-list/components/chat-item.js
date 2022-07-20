import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ProfileIcon from "../../../components/profile-icon";

export default function ChatItem (props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.item_view}
        onPress={() => navigation.navigate('Chat', {
          title: 'Pedido #' + props.chat.deliveryID
        })}
      >
        <View style={{flexDirection: 'row'}}>
          <ProfileIcon iconSize={30} iconColor={'#37323E'} circleRadius={40} circleColor={'#DEB841'} />
          <View style={{justifyContent: 'center',  marginLeft: 10}}>
            <Text style={{color: '#E6E6E6', fontWeight: 'bold'}} >Pedido #{props.chat.deliveryID}</Text>
            <Text style={{color: '#E6E6E6', fontSize: 10}} >{props.chat.clientName}</Text>
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