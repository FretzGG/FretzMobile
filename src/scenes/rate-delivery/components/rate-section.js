import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ProfileIcon from "../../../components/profile-icon";

export default function RateSelection(props) {
  const userEvaluated = props.userEvaluated;

  return (
    <View style={{flex:1, alignItems: 'center'}}>
      <View style={{marginTop: 40}}>
        { userEvaluated.profile_pic ? (
          <Image source={{ uri: userEvaluated.profile_pic }} style={styles.profile_pic} />
        ) : (
          <ProfileIcon iconSize={65} iconColor={'#37323E'} circleRadius={100} circleColor={'#DEB841'} />
        )}
      </View>
      <Text style={styles.name}>{userEvaluated.name}</Text>
      <View style={styles.stars}>
        <TouchableOpacity onPress={() => props.setStars(1)}>
          <FontAwesomeIcon icon={faStar} size={50} color={props.stars > 0 ? '#DEB841' : '#6D6A75'} />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingLeft: 10}} onPress={() => props.setStars(2)}>
          <FontAwesomeIcon icon={faStar} size={50} color={props.stars > 1 ? '#DEB841' : '#6D6A75'} />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingLeft: 10}} onPress={() => props.setStars(3)}>
          <FontAwesomeIcon icon={faStar} size={50} color={props.stars > 2 ? '#DEB841' : '#6D6A75'} />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingLeft: 10}} onPress={() => props.setStars(4)}>
          <FontAwesomeIcon icon={faStar} size={50} color={props.stars > 3 ? '#DEB841' : '#6D6A75'} />
        </TouchableOpacity>
        <TouchableOpacity style={{paddingLeft: 10}} onPress={() => props.setStars(5)}>
          <FontAwesomeIcon icon={faStar} size={50} color={props.stars > 4 ? '#DEB841' : '#6D6A75'} />
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
  },
  profile_pic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})