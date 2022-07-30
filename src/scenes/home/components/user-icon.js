import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faIndustry, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../navigators/app-navigator";

export default function UserIcon() {
  const user = useContext(UserContext);

  return(
    <View>
      {user.profile_pic ? (
        <Image source={{ uri: user.profile_pic }} style={ styles.user_photo_circle } />
      ) : ( 
        <View style={styles.user_photo_circle}>
          <FontAwesomeIcon 
            icon={faUser}
            color={'#DEB841'}
            size={60} 
          />
        </View>
      )}
      {user.user_type !== 'PF' && 
        <View style={styles.user_type_circle}>
          <FontAwesomeIcon 
            icon={user.user_type === 'PJ' ? faIndustry : faTruckFast}
            color={'#DEB841'}
            size={30}
          />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  user_photo_circle: {
    width: 85,
    height: 85,
    borderRadius: 45,
    backgroundColor: '#37323E',
    justifyContent: 'center',
    alignItems: 'center'
  },
  user_type_circle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#37323E',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginTop: -10,
    marginLeft: -13
  },
});