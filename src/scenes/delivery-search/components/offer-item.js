import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../navigators/root-navigator";
import { UserContext } from "../../../navigators/app-navigator";
import { server_url } from "../../../utils/utils";
import ProfileIcon from "../../../components/profile-icon";
import LargeButton from "../../../components/large-button";

export default function RequestItem(props) {
  const navigation = useNavigation();

  const { userToken } = useContext(AuthContext);
  const { user } = useContext(UserContext)

  const offer = props.offer;
  const shipping = props.shipping;

  const [ expanded, setExpanded ] = useState(false);
  const [ userProfile, setUserProfile ] = useState({});
  const [ userRating, setUserRating ] = useState('');
  const [ userVehicle, setUserVehicle ] = useState({});
  const [ offeredPriceView, setOfferedPriceView ] = useState('');
  const [ offeredDeadlineView, setOfferedDeadlineView ] = useState('');

  useEffect(() => {
    if (offer) {
      /* Deadline string format */
      const periods = offer.deadline.split('-')
      const formatedDate = periods[2] + '/' + periods[1] + '/' + periods[0]
      setOfferedDeadlineView(formatedDate)

      /* Price string format */
      const parts = offer.bid.toFixed(2).split('.')
      const integerWithDots = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      setOfferedPriceView('R$ ' + integerWithDots + ',' + parts[1])
    }
  }, [ offer ])

  useEffect(() => {
    fetch(server_url + 'api/profile/' + offer.user_who_offered + '/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      }
    })
    .then(resp => resp.json())
    .then(jsonResp => setUserProfile(jsonResp))
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    userProfile.avg_rating && setUserRating(userProfile.avg_rating.toFixed(2))
  }, [ userProfile ])

  useEffect(() => {
    fetch(server_url + 'api/vehicle/get_user_vehicle/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
      body: JSON.stringify({
        user: userProfile.id
      })
    })
    .then(resp => resp.json())
    .then(jsonResp => setUserVehicle(jsonResp[0]))
    .catch(error => console.log(error))
  }, [ userProfile ])

  const chooseOffer = () => {
    fetch(server_url + 'api/shipping/' + shipping.id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
      body: JSON.stringify({
        user_posted: shipping.user_posted,
        title: shipping.title,
        shipping_type: shipping.shipping_type,
        deadline: shipping.deadline,
        delivery_location: shipping.delivery_location,
        departure_location: shipping.departure_location,
        post_date: shipping.post_date,
        load_specifications: shipping.load_specifications,
        cargo_weight: shipping.cargo_weight,
        width: shipping.width,
        length: shipping.length,
        height: shipping.height,
        // Fields that need to change
        shipping_status: 'Em Progresso',
        at_auction: false,
        opening_bid: offer.bid,
        user_transporter: offer.user_who_offered,
        vehicle: userVehicle.id
      })
    })
    .then(resp => {
      if (resp.ok) createChat();
      else alert('Ocorreu um problema. Tente novamente mais tarde.')
    })
    .catch(error => console.log(error))
  }

  const createChat = () => {
    fetch(server_url + 'api/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
      body: JSON.stringify({
        user_one: user.id,
        user_two: userProfile.id,
        shipping: shipping.id
      })
    })
    .then(resp => {
      if (resp.ok){
        alert('Oferta aceita com sucesso!\nUm chat com o motorista foi criado, mantenha contato e aguarde a entrega do FRETZ.');
        navigation.navigate('Home');
      }
      else alert('Ocorreu um problema. Tente novamente mais tarde.')
    })
    .catch(error => console.log(error))
  }
  
  return (
    <List.Accordion
      style={[styles.header, !expanded && {borderBottomWidth: 0.8, borderBottomColor: '#E6E6E6'}]}
      title={userProfile.name}
      titleStyle={styles.title}
      description={(
        <View style={styles.driver_rating}>
          <FontAwesomeIcon icon={faStar} color={'#DEB841'} size={20} />
          <Text style={styles.info}> { userRating > 0 ? userRating : 'Sem avaliações. Primeiro FRETZ' }</Text>
        </View>
      )}
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
          { userProfile.profile_pic ? (
            <Image source={{ uri: userProfile.profile_pic }} style={ styles.profile_pic } />
          ) : (
            <ProfileIcon iconSize={ 30 } iconColor={ '#37323E' } circleRadius={ 40 } circleColor={ '#DEB841' } />
          )}
        </View>
      }
    >
      <View style={ expanded && {borderBottomWidth: 1.2, borderBottomColor: '#E6E6E6', marginLeft: -70, marginTop: 10}}>
        <View style={[styles.info_grid, {marginVertical: 10}]}>
          <View style={styles.info_view}>
            <Text style={styles.info_title}>Preço Ofertado</Text>
            <Text style={styles.info}>{ offeredPriceView }</Text>
          </View>
          <View style={styles.info_view}>
            <Text style={styles.info_title}>Prazo</Text>
            <Text style={styles.info}>{ offeredDeadlineView }</Text>
          </View>
        </View>
        <View style={styles.info_grid}>
          <View style={styles.info_view}>
            <Text style={styles.info_title}>Veículo</Text>
            <Text style={styles.info}>{ userVehicle && userVehicle.vehicle_model }</Text>
            <Text style={styles.info}>({ userVehicle && userVehicle.vehicle_license_plate })</Text>
          </View>
        </View>
        <LargeButton 
          title={'Aceitar oferta'}
          onPress={() => chooseOffer()}
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
  },
  profile_pic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});