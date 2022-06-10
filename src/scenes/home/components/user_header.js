import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import UserIcon from "./user_icon";

export default function UserHeader(props) {
  return (
    <SafeAreaView style={[styles.container, {flex: props.flex_size}]}>
      <View style={{flex:2, justifyContent: 'center', alignItems: 'center'}}>
        <UserIcon />
      </View>
      <View style={{flex:4, paddingTop: 20}}>
        <Text style={styles.user_info}>Guguinha dos Santos</Text>
        <View style={{flex: 1, flexDirection: 'row', paddingTop: 5}}>
          <View style={{paddingTop: 3}}>
            <FontAwesomeIcon icon={faStar} color={'#DEB841'} size={28} />
          </View>
          <Text style={[styles.user_info, {marginTop: 5}]}> 4.87</Text>
        </View>
      </View>
      <View style={{flex:1}}>
        <Text>Chat</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6D6A75'
  },
  user_info: {
    color: '#E6E6E6',
    fontWeight: 'bold',
    fontSize: 18
  }
});