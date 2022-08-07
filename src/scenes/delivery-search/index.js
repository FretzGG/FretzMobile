import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { UserContext } from "../../navigators/app-navigator";
import { AuthContext } from "../../navigators/root-navigator";
import { server_url } from "../../utils/utils";
import OfferItem from "./components/offer-item";
import RequestItem from "./components/request-item";

export default function DeliverySearch(props) {
  const { userToken } = useContext(AuthContext);
  const { vehicle } = useContext(UserContext);

  const screenTitle = props.route.params.title;
  const shippingAuction = props.route.params.shipping;

  const [ shippings, setShippings ] = useState([]);
  const [ offers, setOffers ] = useState([]);

  useEffect(() => {
    screenTitle === 'FRETZ' && (
      fetch(server_url + 'api/shipping/get_active_shippings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`
        },
        body: JSON.stringify({
          shipping_type: vehicle.vehicle_category
        })
      })
      .then(resp => resp.json())
      .then(jsonResp => setShippings(jsonResp))
      .catch(error => console.log(error))
    )
  }, [ vehicle ])

  useEffect(() => {
    shippingAuction && fetch(server_url + 'api/auction/get_shipping_auction/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
      body: JSON.stringify({
        shipping: shippingAuction.id
      })
    })
    .then(resp => resp.json())
    .then(jsonResp => setOffers(jsonResp))
    .catch(error => console.log(error))
  }, [ shippingAuction ])

  return (
    <View style={styles.container}>
      <View style={styles.list_view}>
        <FlatList
          data={screenTitle === 'FRETZ' ? shippings : offers}
          keyExtractor={item => item.id}
          renderItem={({item}) => 
          screenTitle === 'FRETZ' ? (
            <RequestItem shipping={item} />
          ) : (
            <OfferItem offer={item} shipping={shippingAuction} />
          )
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E'
  },
  list_view:{
    flex: 7,
  },
  button_view:{
    flex: 1
  }
});