import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faIndustry, faTruckFast } from "@fortawesome/free-solid-svg-icons";

export default function UserIcon(props) {
  return(
    <SafeAreaView>
      <View style={styles.user_photo_circle}>
        <FontAwesomeIcon 
          icon={faUser}
          color={'#DEB841'}
          size={60} 
        />
      </View>
      {props.userType === 'ClientePJ' && 
        <View style={styles.user_type_circle}>
          <FontAwesomeIcon 
            icon={faIndustry}
            color={'#DEB841'}
            size={30}
          />
        </View>
      }
      {props.userType === 'Motorista' && 
        <View style={styles.user_type_circle}>
          <FontAwesomeIcon
            icon={faTruckFast}
            color={'#DEB841'}
            size={30}
          />
        </View>}
    </SafeAreaView>
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