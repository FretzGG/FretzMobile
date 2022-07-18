import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProfileIcon from "../../components/profile-icon";

export default function Chat () {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => {
            alert('Mostrar informações do FRETZ');
          }}>
            <ProfileIcon iconSize={30} iconColor={'#DEB841'} circleRadius={40} circleColor={'#37323E'} />
        </TouchableOpacity>
      )
    })
  })

  return (
    <View style={styles.container}>
      <Text>Chat com fulano</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E'
  }
})