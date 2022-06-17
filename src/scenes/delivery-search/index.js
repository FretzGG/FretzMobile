import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import LargeButton from "../../components/large-button";

export default function DeliverySearch() {
  const requests = [
    {id: 1, sellerName:'Guguinha Santos', title: 'Requisição 1', initialBet: 500, deadline: '25/07/2022', type: 'Frágil', distance: 15},
    {id: 2, sellerName:'Guguinha Souza', title: 'Requisição 2', initialBet: 400, deadline: '21/07/2022', type: 'Perecível', distance: 5},
    {id: 3, sellerName:'Guguinha Silva', title: 'Requisição 3', initialBet: 300, deadline: '22/07/2022', type: 'Frágil', distance: 10}
  ];

  return (
    <View style={styles.container}>
      <View style={styles.list_view}>
        
      </View>
      <LargeButton 
        title={'Fazer oferta'}
        onPress={() => alert('Go to Request')}
      />
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