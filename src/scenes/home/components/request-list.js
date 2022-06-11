import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBoxArchive, faPlus, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function RequestList(props){
  const navigation = useNavigation();

  const [requests, setRequests] = useState([
    {id: 1, title: 'Requisição 1'},
    {id: 2, title: 'Requisição 2'},
    {id: 3, title: 'Requisição 3'}])

  const Item = ({title}) => (
    <View style={styles.item_box}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Delivery Request', {
            title: title
          });
        }} 
        style={styles.item_view}
      >
        <Text style={styles.item_text}>
          {title}
        </Text>
        <View style={styles.item_arrow}>
          <FontAwesomeIcon 
            icon={faAngleRight}
            color={'#E6E6E6'}
            size={30}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <View style={{flex: props.flex_size}}>
      <View style={styles.header}>
        <View style={styles.request_header_title_view}>
          <FontAwesomeIcon 
            icon={faBoxArchive}
            color={'#DEB841'}
            size={30}
          />
          <Text style={styles.request_header_text}>   Minhas Requisições</Text>
        </View>
        <TouchableOpacity onPress={() => {alert('Adicionar requisicao')}} style={styles.request_header_add_view}>
          <FontAwesomeIcon 
            icon={faPlus}
            color={'#DEB841'}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <FlatList
          data={requests}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Item title={item.title} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6'
  },
  request_header_title_view: {
    flex: 4,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  request_header_text: {
    color: '#E6E6E6',
    fontWeight: 'bold'
  },
  request_header_add_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    flex: 7
  },
  item_box: {
    
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6'
  },
  item_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  item_text: {
    color: '#E6E6E6',
    marginLeft: 20
  },
  item_arrow: {
    marginRight: 25
  }
});