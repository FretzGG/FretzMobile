import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
            <Text style={styles.type_and_deadline_text}>Frágil</Text>
          </View>
          <View style={styles.type_and_deadline_view}>
            <Text style={styles.section_title}>Prazo</Text>
            <Text style={styles.type_and_deadline_text}>25/07/2022</Text>
          </View>
        </View>
      </View>
      <View style={styles.text_row}>
        <Text>Descricao e Endereco</Text>
      </View>
      <View style={styles.attachment_row}>
        <Text>Anexos</Text>
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
    fontWeight: 'bold',
    
  },
  text_row: {
    flex: 3
  },
  attachment_row: {
    flex: 1
  },
  price_row: {
    flex: 3
  }
});