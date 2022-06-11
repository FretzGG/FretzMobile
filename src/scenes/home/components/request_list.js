import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBoxArchive, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function RequestList(props){
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
        <Pressable onPress={() => {alert('Adicionar requisicao')}} style={styles.request_header_add_view}>
          <FontAwesomeIcon 
            icon={faPlus}
            color={'#DEB841'}
            size={30}
          />
        </Pressable>
      </View>
      <View style={styles.list}>
        <Text>Teste</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
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
  }
});