import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../navigators/root-navigator";
import { server_url } from "../../../utils/utils";
import LargeButton from "../../../components/large-button";
import ProfileIcon from "../../../components/profile-icon";

export default function RequestItem(props) {
  const navigation = useNavigation();

  const { userToken } = useContext(AuthContext)

  const shipping = props.shipping;

  const [ expanded, setExpanded ] = useState(false);
  const [ userPosted, setUserPosted ] = useState({});
  const [ price, setPrice ] = useState('');
  const [ deadline, setDeadline ] = useState('');

  useEffect(() => {
    fetch(server_url + 'api/profile/' + shipping.user_posted + '/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      }
    })
    .then(resp => resp.json())
    .then(jsonResp => setUserPosted(jsonResp))
    .catch(error => console.log(error))
  }, [ shipping ])

  useEffect(() => {
    /* Format deadline from DB to front */
    const periods = shipping.deadline.split('-');
    const formatedDate = periods[2] + '/' + periods[1] + '/' + periods[0];
    setDeadline(formatedDate);

    /* Format opening_bid from DB to front */
    const values = shipping.opening_bid.toFixed(2).split('.');
    const integerPart = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    const priceString = 'R$ ' + integerPart + ',' + values[1]
    setPrice(priceString)
  }, [ shipping ])
  
  return (
    <List.Accordion
      style={[styles.header, !expanded && {borderBottomWidth: 0.8, borderBottomColor: '#E6E6E6'}]}
      title={shipping.title}
      titleStyle={styles.title}
      description={'Feito por: ' + userPosted.name}
      descriptionStyle={styles.title}
      onPress={() => setExpanded(!expanded)}
      expanded={expanded}
      right={() =>
        <View>
          <FontAwesomeIcon 
            icon={expanded ? faAngleUp : faAngleDown}
            color={'#DEB841'}
            size={30}
          />
        </View>
      }
      left={() => 
        <View>
          { userPosted.profile_pic ? (
            <Image source={{ uri: userPosted.profile_pic }} style={ styles.profile_pic } />
          ) : (
            <ProfileIcon iconSize={ 30 } iconColor={ '#37323E' } circleRadius={ 40 } circleColor={ '#DEB841' } />
          )}
        </View>
      }
    >
      <View style={ expanded && {borderBottomWidth: 1.2, borderBottomColor: '#E6E6E6', marginLeft: -70, marginTop: 10}}>
        <View style={styles.info_grid}>
          <View style={styles.info_view}>
            <Text style={styles.info_title}>Lance Inicial</Text>
            <Text style={styles.info}>{ price }</Text>
          </View>
          <View style={styles.info_view}>
            <Text style={styles.info_title}>Prazo Desejado</Text>
            <Text style={styles.info}>{ deadline }</Text>
          </View>
        </View>
        <View style={[styles.info_grid, {marginVertical: 10}]}>
          <View style={styles.info_view}>
            <Text style={styles.info_title}>Tipo</Text>
            <Text style={styles.info}>{ shipping.shipping_type }</Text>
          </View>
        </View>
        <LargeButton 
          title={'Ver detalhes'}
          onPress={() => navigation.navigate('Delivery Request Details', {
            title: shipping.title,
            shipping
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
    marginLeft: 5
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
  }, 
  profile_pic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
});