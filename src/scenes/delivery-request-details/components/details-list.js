import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp, faCircle } from "@fortawesome/free-solid-svg-icons";
import { List } from "react-native-paper";
import MaskInput, { Masks } from "react-native-mask-input";
import { UserContext } from "../../../navigators/app-navigator";
import PackagePhotos from "./package-photos";
import LargeButton from "../../../components/large-button";

export default function DetailsList(props) {
  const [attachmentExpanded, setAttachmentExpanded] = useState(false);
  const [unseenInterests, setUnseenInterests] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [suggestedPrice, setSuggestedPrice] = useState('');

  const user = useContext(UserContext);

  const attachments = [{
    title: 'Dimensões da carga',
    description: 'Desenho com dimensões da caixa'
  }, {
    title: 'Nota Fiscal',
    description: ''
  }];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top_row}>
        <View style={{flex: 3}}>
          <View style={{marginStart: 15}}>
            <PackagePhotos />
          </View>
        </View>
        <View style={{flex: 2}}>
          <View style={styles.type_and_deadline_view}>
            <Text style={styles.section_title}>Tipo</Text>
            <Text style={[styles.type_and_deadline_text, {textDecorationLine: 'underline'}]}>Frágil</Text>
          </View>
          { props.status === 'Ativo' &&
          <View style={styles.type_and_deadline_view}>
            <Text style={styles.section_title}>Prazo</Text>
            <Text style={styles.type_and_deadline_text}>25/07/2022</Text>
          </View>
          }
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
      <List.Accordion
        style={styles.attachment_list_header}
        title={'Anexos'}
        titleStyle={styles.section_title}
        description={
          attachments.length === 0 ?
          'Sem arquivos'
          : attachments.length === 1 ?
          'Clique para exibir um arquivo com mais informações sobre a carga'
          : 'Clique para exibir mais ' + attachments.length + ' arquivos com informações sobre a carga'
        }
        descriptionStyle={styles.text}
        expanded={attachmentExpanded}
        onPress={() => setAttachmentExpanded(!attachmentExpanded)}
        right={() => 
          <FontAwesomeIcon 
            icon={attachmentExpanded ? faAngleUp : faAngleDown}
            color={'#DEB841'}
            size={30}
          />
        }
      >
        {attachments.map((attachment, index) => (
          <TouchableOpacity style={styles.attachment_button} key={index}>
            <List.Item 
              title={attachment.title}
              titleStyle={styles.text}
              description={attachment.description}
              descriptionStyle={styles.attachment_description}
              left={() => 
                <View style={{marginStart: 10, marginTop: 19}}>
                  <FontAwesomeIcon icon={faCircle} size={7} color={'#DEB841'}/>
                </View>
              }
            />
          </TouchableOpacity>
        ))}
      </List.Accordion>
      {user.type !== 'Motorista' && props.status === 'Ativo' ?
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
        : props.status === 'Ativo' ?
        <View>
          <Text style={styles.input_title}>Preço</Text>
          <MaskInput
            style={styles.text_input}
            mask={Masks.BRL_CURRENCY}
            keyboardType={'numeric'}
            placeholder={'R$ 0,00'}
            placeholderTextColor={'#37323E'}
            value={suggestedPrice}
            onChangeText={setSuggestedPrice}
          />
          <Text style={styles.input_title}>Prazo de entrega</Text>
          <MaskInput
            style={styles.text_input}
            mask={Masks.DATE_DDMMYYYY}
            keyboardType={'numeric'}
            value={deadline}
            onChangeText={setDeadline}
            placeholderTextColor={'#37323E'}
          />
          <LargeButton title={'Dar Lance'}/>
        </View>
        :
        <View style={{flex: 3}}>
          <View style={{alignItems: 'center', marginTop: 30}}>
            <Text style={styles.price_title}>Prazo</Text>
            <Text style={styles.price_number}>25/07/2022</Text>
          </View>
          <LargeButton title={'Finalizar FRETZ'}/>
        </View>
      }
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
  attachment_list_header: {
    backgroundColor: '#37323E',
    height: 70,
    paddingTop: -5
  },
  attachment_button:{
    marginTop: -15,
    marginBottom: -10
  },
  attachment_description:{
    color: '#6D6A75',
    fontSize: 10,
    marginLeft: 10,
    marginTop: 3,
    textAlign: 'justify'
  },
  price_row: {
    flex: 3,
    alignItems: 'center',
    marginVertical: 30
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
  },
  input_title: {
    color: '#DEB841',
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 15
  },
  text_input: {
    backgroundColor: '#E6E6E6',
    color: '#37323E',
    marginTop: 10,
    borderRadius: 30,
    width: "92%",
    height: 44,
    paddingHorizontal: 20,
    marginLeft: 15
  },
});