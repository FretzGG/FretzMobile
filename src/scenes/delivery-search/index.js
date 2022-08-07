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

  const [ shippings, setShippings ] = useState([]);

  const offers = [
    {id: 1, driverName:'Guguinha Santos', bet: 500, deadline: '25/07/2022', rating: 4.87},
    {id: 2, driverName:'Guguinha Souza', bet: 400, deadline: '21/07/2022', rating: 4.43},
    {id: 3, driverName:'Guguinha Silva', bet: 300, deadline: '22/07/2022', rating: 4.95}
  ];

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
            <OfferItem offer={item} />
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