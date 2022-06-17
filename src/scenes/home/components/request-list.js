import React, { useContext, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBoxArchive, faPlus, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../navigators/app-navigator";
import LargeButton from "../../../components/large-button";

export default function RequestList(){
  const navigation = useNavigation();
  const user = useContext(UserContext);

  const [requests, setRequests] = useState([
    {id: 1, title: 'Requisição 1'},
    {id: 2, title: 'Requisição 2'},
    {id: 3, title: 'Requisição 3'}])

  const Item = ({title}) => (
    <View style={styles.item_box}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Delivery Request Details', {
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
    <View style={{flex: 5}}>
      <View style={styles.header}>
        <View style={styles.request_header_title_view}>
          <FontAwesomeIcon 
            icon={faBoxArchive}
            color={'#DEB841'}
            size={30}
          />
          <Text style={styles.request_header_text}>   {
            user.type !== 'Motorista' ?
             'Minhas Requisições' 
             : 'Meus Fretes'
             } 
          </Text>
        </View>
        {user.type !== 'Motorista' && 
          <TouchableOpacity onPress={() => 
            navigation.navigate('Delivery Request Form', {
              title: 'Novo Frete'
            })} 
            style={styles.request_header_add_view}>
              <FontAwesomeIcon 
                icon={faPlus}
                color={'#DEB841'}
                size={30}
            />
          </TouchableOpacity>
        }
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
      {user.type === 'Motorista' &&
        <LargeButton 
          title={'Procurar FRETZ'} 
          onPress={() => alert('teste')} 
        />
      }
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