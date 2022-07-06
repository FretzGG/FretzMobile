import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ProfileIcon from "../../../components/profile-icon";

export default function RateSelection() {
  const [stars, setStars] = useState(0);

  const driver = {
    name: 'Guguinha da Silva'
  }

  return (
    <View style={{flex:1, alignItems: 'center'}}>
      <View style={{marginTop: 40}}>
        <ProfileIcon iconSize={65} iconColor={'#37323E'} circleRadius={100} circleColor={'#DEB841'} />
      </View>
      <Text style={styles.name}>{driver.name}</Text>
      <View style={styles.stars}>
        <TouchableOpacity onPress={() => setStars(1)}>
          <FontAwesomeIcon icon={faStar} size={50} color={stars > 0 ? '#DEB841' : '#6D6A75'} />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingLeft: 10}} onPress={() => setStars(2)}>
          <FontAwesomeIcon icon={faStar} size={50} color={stars > 1 ? '#DEB841' : '#6D6A75'} />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingLeft: 10}} onPress={() => setStars(3)}>
          <FontAwesomeIcon icon={faStar} size={50} color={stars > 2 ? '#DEB841' : '#6D6A75'} />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingLeft: 10}} onPress={() => setStars(4)}>
          <FontAwesomeIcon icon={faStar} size={50} color={stars > 3 ? '#DEB841' : '#6D6A75'} />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingLeft: 10}} onPress={() => setStars(5)}>
          <FontAwesomeIcon icon={faStar} size={50} color={stars > 4 ? '#DEB841' : '#6D6A75'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  name: {
    color: '#E6E6E6',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10
  },
  stars: {
    marginTop: 20,
    flexDirection: 'row',
  }
})