import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../navigators/app-navigator";
import UserIcon from "../../home/components/user-icon";

export default function RatingHeader() {
  const navigation = useNavigation();

  const user = useContext(UserContext);

  const [name, setName] = useState('');

  useEffect(() => {
    if (user.name){
      const names = user.name.split(' ')
      if (names.length > 1) setName(names[0] + ' ' + names[names.length - 1])
      else setName(names[0])
    }
  }, [user.name])

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.center, {flex: 1}]}
        onPress={() => navigation.goBack()}
      >
        <FontAwesomeIcon icon={faArrowLeft} color={'#DEB841'} size={20} />
      </TouchableOpacity>
      <View style={{flex: 3, marginTop: 12, alignItems: 'flex-end'}}>
        <Text style={styles.rating_screen_title}>Avaliações</Text>
        <Text style={styles.user_name}>{name}</Text>
      </View>
      <TouchableOpacity // Depois voltar isso para View
        style={[styles.center, {flex: 2}]}
        onPress={() => {
          navigation.navigate('Rate Delivery')
        }}
      >
        <UserIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#6D6A75'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  rating_screen_title: {
    color: '#DEB841',
    fontWeight: 'bold',
    fontSize: 40
  },
  user_name: {
    color: '#E6E6E6',
    fontWeight: 'bold',
    fontSize: 18,
    marginStart: 20
  }
})