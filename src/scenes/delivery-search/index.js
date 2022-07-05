import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import OfferItem from "./components/offer-item";
import RequestItem from "./components/request-item";

export default function DeliverySearch(props) {
  const requests = [
    {id: 1, sellerName:'Guguinha Santos', title: 'Requisição 1', initialBet: 500, deadline: '25/07/2022', type: 'Frágil', distance: 15},
    {id: 2, sellerName:'Guguinha Souza', title: 'Requisição 2', initialBet: 400, deadline: '21/07/2022', type: 'Perecível', distance: 5},
    {id: 3, sellerName:'Guguinha Silva', title: 'Requisição 3', initialBet: 300, deadline: '22/07/2022', type: 'Frágil', distance: 10}
  ];

  const offers = [
    {id: 1, driverName:'Guguinha Santos', bet: 500, deadline: '25/07/2022', rating: 4.87},
    {id: 2, driverName:'Guguinha Souza', bet: 400, deadline: '21/07/2022', rating: 4.43},
    {id: 3, driverName:'Guguinha Silva', bet: 300, deadline: '22/07/2022', rating: 4.95}
  ];

  return (
    <View style={styles.container}>
      <View style={styles.list_view}>
        <FlatList
          data={props.route.params.title === 'FRETZ' ? requests : offers}
          keyExtractor={item => item.id}
          renderItem={({item}) => 
          props.route.params.title === 'FRETZ' ? (
            <RequestItem request={item} />
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