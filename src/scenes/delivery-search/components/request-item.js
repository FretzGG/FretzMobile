import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import ProfilePhoto from "./profile-photo";
import LargeButton from "../../../components/large-button";

export default function RequestItem(props) {
  const navigation = useNavigation();

  const [expanded, setExpanded] = useState(false);
  
  return (
    <List.Accordion
      style={[styles.header, !expanded && {borderBottomWidth: 0.8, borderBottomColor: '#E6E6E6'}]}
      title={props.request.title}
      titleStyle={styles.title}
      description={'Feita por: ' + props.request.sellerName}
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
          <ProfilePhoto size={10} />
        </View>
      }
    >
      <View style={ expanded && {borderBottomWidth: 1.2, borderBottomColor: '#E6E6E6', marginLeft: -70, marginTop: 10}}>
        <View style={styles.info_grid}>
          <View style={styles.info_view}>
            <Text style={styles.info_title}>Lance Inicial</Text>
            <Text style={styles.info}>R$ {props.request.initialBet},00</Text>
          </View>
          <View style={styles.info_view}>
            <Text style={styles.info_title}>Prazo Desejado</Text>
            <Text style={styles.info}>{props.request.deadline}</Text>
          </View>
        </View>
        <View style={[styles.info_grid, {marginVertical: 10}]}>
        <View style={styles.info_view}>
            <Text style={styles.info_title}>Tipo</Text>
            <Text style={styles.info}>{props.request.type}</Text>
          </View>
          <View style={styles.info_view}>
            <Text style={styles.info_title}>Distância</Text>
            <Text style={styles.info}>{props.request.distance} KM</Text>
          </View>
        </View>
        <LargeButton 
          title={'Fazer oferta'}
          onPress={() => navigation.navigate('Delivery Request Details', {
            title: props.request.title,
            status: 'Ativo'
          })}
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