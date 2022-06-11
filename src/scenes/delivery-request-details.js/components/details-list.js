import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import PackagePhotos from "./package-photos";

export default function DetailList() {
  const [unseenInterests, setUnseenInterests] = useState(0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top_row}>
        <View style={{flex: 3}}>
          <PackagePhotos />
        </View>
        <View style={{flex: 2}}>
          <View style={styles.type_and_deadline_view}>
            <Text style={styles.section_title}>Tipo</Text>
            <Text style={[styles.type_and_deadline_text, {textDecorationLine: 'underline'}]}>Frágil</Text>
          </View>
          <View style={styles.type_and_deadline_view}>
            <Text style={styles.section_title}>Prazo</Text>
            <Text style={styles.type_and_deadline_text}>25/07/2022</Text>
          </View>
        </View>
      </View>
      <View style={styles.text_row}>
        <View style={styles.description_and_address_view}>
          <Text style={styles.section_title}>Descrição</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam blandit purus tellus, eget bibendum quam cursus non. Mauris ut dolor nulla. Integer cursus viverra ornare. Sed id molestie tortor.
          </Text>
        </View>
        <View style={styles.description_and_address_view}>
          <Text style={styles.section_title}>Endereço</Text>
          <Text style={styles.text}>
            Avenida Brigadeiro Lima 123, Vila Industrial{"\n"}
            12223-123{"\n"}
            São José dos Campos - São Paulo
          </Text>
        </View>
      </View>
      <View style={styles.attachment_row}>
        <Text style={styles.section_title}>Anexos</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 5}}>
            <Text style={styles.attachment_text}>
              Clique para exibir mais 2 arquivos com informações sobre a carga
            </Text>
          </View>
          <TouchableOpacity onPress={() => {alert('Anexos')}} style={{flex: 1}}>
            <View style={{marginTop: 5, marginLeft: 20}}>
              <FontAwesomeIcon 
                icon={faAngleDown}
                color={'#DEB841'}
                size={30}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.price_row}>
        <Text style={styles.price_title}>Preço desejado</Text>
        <Text onPress={() => setUnseenInterests(unseenInterests + 1)} style={styles.price_number}>R$ 500,00</Text>
        <TouchableOpacity
          style={styles.auction_button}
          onPress={() => {
            setUnseenInterests(0);
            alert('Mostrar motoristas interessados');
        }}>
          <Text style={[styles.auction_button_text, unseenInterests > 0 && {paddingEnd: 40}]}>Motoristas Interessados</Text>
          {unseenInterests > 0 && (
            <View style={styles.auction_button_unseen}>
              <Text style={{
                color: '#E6E6E6',
                fontWeight: 'bold',
              }}>
                {unseenInterests}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E'
  },
  top_row: {
    flexDirection: 'row',
    height: 100,
    marginTop: 20
  },
  type_and_deadline_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  section_title: {
    color: '#DEB841',
    fontWeight: 'bold'
  },
  type_and_deadline_text: {
    color: '#E6E6E6',
    fontWeight: 'bold'
  },
  text_row: {
    flex: 3,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  description_and_address_view: {
    marginBottom: 10
  },
  text: {
    color: '#E6E6E6',
    textAlign: 'justify',
    marginTop: 5
  },
  attachment_text: {
    color: '#E6E6E6',
    marginTop: 5
  },
  attachment_row: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  price_row: {
    flex: 3,
    alignItems: 'center',
    marginTop: 30
  },
  price_title: {
    color: '#DEB841',
    fontWeight: 'bold',
    fontSize: 40
  },
  price_number: {
    color: '#E6E6E6',
    fontWeight: 'bold',
    fontSize: 40
  },
  auction_button: {
    backgroundColor: '#DEB841',
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  auction_button_text: {
    color: '#37323E',
    fontWeight: 'bold'
  },
  auction_button_unseen: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E15252',
    justifyContent: 'center',
    alignItems: 'center',
  }
});