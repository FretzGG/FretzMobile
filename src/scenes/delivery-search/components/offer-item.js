import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import ProfileIcon from "../../../components/profile-icon";
import LargeButton from "../../../components/large-button";

export default function RequestItem(props) {
  const navigation = useNavigation();

  const [expanded, setExpanded] = useState(false);
  
  return (
    <List.Accordion
      style={[styles.header, !expanded && {borderBottomWidth: 0.8, borderBottomColor: '#E6E6E6'}]}
      title={props.offer.driverName}
      titleStyle={styles.title}
      description={(
        <View style={styles.driver_rating}>
          <FontAwesomeIcon icon={faStar} color={'#DEB841'} size={20} />
          <Text style={styles.info}> {props.offer.rating}</Text>
        </View>
      )}
      descriptionStyle={styles.title}
      onPress={() => setExpanded(!expanded)}
      expanded={expanded}
      right={() =>
        <View style={{marginTop: 0}}>
          <FontAwesomeIcon 
            icon={false ? faAngleUp : faAngleDown}
            color={'#DEB841'}
            size={30}
          />
        </View>
      }
      left={() => 
        <View style={{marginLeft: 0}} >
          <ProfileIcon iconSize={30} iconColor={'#37323E'} circleRadius={40} circleColor={'#DEB841'} />
        </View>
      }
    >
      <View style={ expanded && {borderBottomWidth: 1.2, borderBottomColor: '#E6E6E6', marginLeft: -70, marginTop: 10}}>
        <View style={styles.info_grid}>
          <View style={styles.info_view}>
            <Text style={styles.info_title}>Preço Ofertado</Text>
            <Text style={styles.info}>R$ {props.offer.bet},00</Text>
          </View>
          <View style={styles.info_view}>
            <Text style={styles.info_title}>Prazo</Text>
            <Text style={styles.info}>{props.offer.deadline}</Text>
          </View>
        </View>
        <LargeButton 
          title={'Fazer oferta'}
          onPress={() => alert('Aceitar esta oferta\nMudar status desta requisição!')}
        />
      </View>
    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#37323E',
    height: 70,
    paddingTop: 5
  },
  title:{
    color: '#E6E6E6',
    textAlign: 'justify',
    marginTop: 0,
    marginLeft: 10
  },
  driver_rating: {
    flexDirection: 'row'
  },
  info_grid: {
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  info_view: {
    justifyContent:'center',
    alignItems: 'center'
  },
  info_title: {
    color: '#DEB841',
    fontWeight: 'bold'
  },
  info: {
    color: '#E6E6E6'
  }
});