import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBoxArchive, faPlus, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../navigators/root-navigator";
import { UserContext } from "../../../navigators/app-navigator";
import { server_url } from "../../../utils/utils";
import LargeButton from "../../../components/large-button";

export default function RequestList(){
  const navigation = useNavigation();

  const { user } = useContext(UserContext);
  const { userToken } = useContext(AuthContext);

  const isFocused = useIsFocused();

  const [requests, setRequests] = useState([])

  useEffect(() => {
    isFocused && (
      fetch(server_url + 'api/shipping/get_user_shippings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`
        },
        body: user.user_type === 'PT' ? (
          JSON.stringify({
            'user_transporter': user.id
          })
        ) : (
          JSON.stringify({
            'user_posted': user.id
          })
        )
      })
      .then(resp => resp.json())
      .then(jsonResp => setRequests(jsonResp))
      .catch(error => console.log(error))
    )
  }, [ isFocused, user ])

  const Item = (props) => (
    <View style={styles.item_box}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Delivery Request Details', {
            title: props.item.title,
            shipping: props.item
          });
        }} 
        style={styles.item_view}
      >
        <Text style={styles.item_text}>
          {props.item.title}
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
            user.user_type !== 'PT' ?
             'Minhas Requisições' 
             : 'Meus Fretes'
             } 
          </Text>
        </View>
        {user.user_type !== 'PT' && 
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
            <Item item={item} />
          )}
        />
      </View>
      {user.user_type === 'PT' &&
        <LargeButton 
          title={'Procurar FRETZ'} 
          onPress={() => navigation.navigate('Delivery Search', {
            title: 'FRETZ'
          })} 
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