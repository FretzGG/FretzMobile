import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function DeliveryRequestDetails(props) {
  const title = props.route.params.title;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top_row}>
        <View style={{flex: 3}}>
          <Text>Fotos do pacote</Text>
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
        <Text>Preco e Leilao</Text>
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
    flex: 3
  }
});