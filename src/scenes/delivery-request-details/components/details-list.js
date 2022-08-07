import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp, faCircle } from "@fortawesome/free-solid-svg-icons";
import { List } from "react-native-paper";
import MaskInput, { Masks } from "react-native-mask-input";
import { UserContext } from "../../../navigators/app-navigator";
import { AuthContext } from "../../../navigators/root-navigator";
import { server_url } from "../../../utils/utils";
import PackagePhotos from "./package-photos";
import LargeButton from "../../../components/large-button";

export default function DetailsList(props) {
  const navigation = useNavigation();

  const [attachmentExpanded, setAttachmentExpanded] = useState(false);
  const [unseenInterests, setUnseenInterests] = useState({});
  const [deadline, setDeadline] = useState('');
  const [suggestedPrice, setSuggestedPrice] = useState('');
  const [transporterName, setTransporterName] = useState('');
  const [bid, setBid] = useState(''); 
  const [madeBid, setMadeBid] = useState([]);
  const [makeBid, setMakeBid] = useState(false);

  const { user } = useContext(UserContext);
  const { userToken } = useContext(AuthContext);

  const shipping = props.shipping;

  /* Apenas estética */
  const attachments = [{
    title: 'Dimensões da carga',
    description: 'Desenho com dimensões da caixa'
  }, {
    title: 'Nota Fiscal',
    description: ''
  }];

  useEffect(() => {
    /* Deadline string format */
    const periods = shipping.deadline.split('-')
    const formatedDate = periods[2] + '/' + periods[1] + '/' + periods[0]
    setDeadline(formatedDate)

    /* Price string format */
    const parts = shipping.opening_bid.toFixed(2).split('.')
    const integerWithDots = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    setSuggestedPrice(integerWithDots + ',' + parts[1])

    shipping.user_transporter && (
      fetch(server_url + 'api/profile/' + shipping.user_transporter + '/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`
        }
      })
      .then(resp => resp.json())
      .then(jsonResp => setTransporterName(jsonResp.name.split(' ')[0]))
      .catch(error => console.log(error))
    )

    user.user_type !== 'PT' && shipping.at_auction && (
      fetch(server_url + 'api/auction/get_unseen_offer_number/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`
        },
        body: JSON.stringify({
          shipping: shipping.id
        })
      })
      .then(resp => resp.json())
      .then(jsonResp => setUnseenInterests(jsonResp))
      .catch(error => console.log(error))
    )

    user.user_type === 'PT' && shipping.at_auction && (
      fetch(server_url + 'api/auction/get_user_shipping_bid/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`
        },
        body: JSON.stringify({
          user_who_offered: user.id,
          shipping: shipping.id
        })
      })
      .then(resp => resp.json())
      .then(jsonResp => setMadeBid(jsonResp))
      .catch(error => console.log(error))
    )
  }, [ shipping ] )

  useEffect(() => {
    makeBid && (
      fetch(server_url + 'api/auction/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`
        },
        body: JSON.stringify({
          shipping: shipping.id,
          user_who_offered: user.id,
          bid,
          deadline
        })
      })
      .then(resp => {
        if (resp.ok){
          setMakeBid(false);
          alert('Lance feito com sucesso! Aguarde uma resposta do criador do anúncio.');
          navigation.goBack();
        }
        else {
          alert('Ocorreu um problema. Tente novamente mais tarde')
        }
      })
      .catch(error => console.log(error))
    )
  }, [ makeBid ]);

  const formatInput = () => {
    /* Format price */
    const onlyNumbers = suggestedPrice.split(' ')[1]
    const withoutDots = onlyNumbers.split('.').join('')
    const replaceComma = withoutDots.replace(',', '.')
    setBid(replaceComma)

    /* Format deadline */
    const periods = deadline.split('/')
    const formatedDate = periods[2] + '-' + periods[1] + '-' + periods[0]
    setDeadline(formatedDate)

    setMakeBid(true)
  }

  const confirmDelivery = () => {
    Alert.alert(
      'Finalizar FRETZ',
      'A entrega foi realmente concluída? Após confirmar não será possível voltar atrás.',
      [
        { text: 'Yes', onPress: finalizeDelivery },
        { text: 'No', onPress: () => Alert.alert('Entrega não efetuada', 'Quando o FRETZ realmente for concluído, pressione o botão novamente.') }
      ]
    )
  }

  const finalizeDelivery = () => {
    fetch(server_url + 'api/shipping/' + shipping.id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
      body: JSON.stringify({
        user_posted: shipping.user_posted,
        title: shipping.title,
        shipping_type: shipping.shipping_type,
        deadline: shipping.deadline,
        delivery_location: shipping.delivery_location,
        departure_location: shipping.departure_location,
        post_date: shipping.post_date,
        load_specifications: shipping.load_specifications,
        cargo_weight: shipping.cargo_weight,
        width: shipping.width,
        length: shipping.length,
        height: shipping.height,
        at_auction: shipping.at_auction,
        opening_bid: shipping.opening_bid,
        user_transporter: shipping.user_transporter,
        vehicle: shipping.vehicle,
        // Fields that need to change
        shipping_status: 'Finalizado'
      })
    })
    .then(resp => {
      if (resp.ok) {
        alert('FRETZ finalizado com sucesso! Muito obrigado pelo trabalho');
        navigation.navigate('Home');
      }
      else {
        alert('Ocorreu um problema, tente novamente mais tarde');
      }
      return resp.json()
    })
    .then(jsonResp => console.log(jsonResp))
    .catch(error => console.log(error))
  }

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
            <Text style={[styles.type_and_deadline_text, {textDecorationLine: 'underline'}]}>{ shipping.shipping_type }</Text>
          </View>
          { user.user_type !== 'PT' && shipping.shipping_status === 'Ativo' &&
          <View style={styles.type_and_deadline_view}>
            <Text style={styles.section_title}>Prazo</Text>
            <Text style={styles.type_and_deadline_text}>{ deadline }</Text>
          </View>
          }
        </View>
      </View>
      <View style={styles.text_row}>
        <View style={styles.description_and_address_view}>
          <Text style={styles.section_title}>Descrição</Text>
          <Text style={styles.text}>{ shipping.load_specifications }</Text>
        </View>
        <View style={[styles.description_and_address_view, { flexDirection: 'row' }]}>
          <View style={{ width: '50%' }} >
            <Text style={styles.section_title}>Endereço de retirada</Text>
            <Text style={styles.text}>{ shipping.departure_location }</Text>
          </View>
          <View style={{ width: '50%', marginLeft: 10 }} >
            <Text style={styles.section_title}>Endereço de entrega</Text>
            <Text style={styles.text}>{ shipping.delivery_location }</Text>
          </View>
        </View>
        <View style={[styles.description_and_address_view, { flexDirection: 'row' }]}>
          { shipping.length && shipping.width && shipping.height && (
            <View style={{ width: '50%' }} >
              <Text style={styles.section_title}>Dimensões</Text>
              <Text style={styles.text}>
                { shipping.length.toFixed(2) + ' x ' + shipping.width.toFixed(2) + ' x ' + shipping.height.toFixed(2) + ' m' }
              </Text>
            </View>
          )}
          { shipping.cargo_weight && (
            <View style={[{ width: '50%' }, shipping.length && shipping.width && shipping.height && { marginLeft: 10 }]} >
              <Text style={styles.section_title}>Peso</Text>
              <Text style={styles.text}>
                { shipping.cargo_weight.toFixed(2) + ' Kg' }
              </Text>
            </View>
          )}
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
      {user.user_type !== 'PT' ?
        shipping.shipping_status === 'Ativo' ?
          <View style={styles.price_row}>
            <Text style={styles.price_title}>Preço desejado</Text>
            <Text style={styles.price_number}>R$ { suggestedPrice }</Text>
            <TouchableOpacity
              style={styles.auction_button}
              onPress={() => {
                navigation.navigate('Delivery Search', {
                  title: 'Ofertas',
                  shipping
                })
              }}
              >
              <Text style={[styles.auction_button_text, unseenInterests.offer_number > 0 && {paddingEnd: 40}]}>Motoristas Interessados</Text>
              {unseenInterests.offer_number > 0 && (
                <View style={styles.auction_button_unseen}>
                  <Text style={{
                    color: '#E6E6E6',
                    fontWeight: 'bold',
                  }}>
                    {unseenInterests.offer_number}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        : shipping.shipping_status === 'Em Progresso' ?
            <View style={styles.price_row}>
              <Text style={styles.price_title}>Entregador</Text>
              <Text style={styles.price_number}>{ transporterName }</Text>
              <Text style={[styles.price_title, { marginTop: 20 }]}>Prazo de Entrega</Text>
              <Text style={styles.price_number}>{deadline}</Text>
              <Text style={[styles.price_title, { textDecorationLine: 'underline', marginTop: 20 }]}>FRETZ a caminho!</Text>
            </View>
          :
            <View style={styles.price_row}>
              <Text style={styles.price_title}>FRETZ</Text>
              <Text style={[styles.type_and_deadline_text, { textDecorationLine: 'underline', fontSize: 40}]}>Finalizado</Text>
              <LargeButton onPress={() => alert('Avaliar entregador!')} title={'Avaliar motorista'} />
            </View>
      : shipping.shipping_status === 'Ativo' ?
          madeBid.length > 0 ?
            <View style={styles.price_row}>
              <Text style={styles.price_title}>Seu Lance</Text>
              <Text style={styles.price_number}>R$ { madeBid[0].bid.toFixed(2).split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' +  madeBid[0].bid.toFixed(2).split('.')[1] }</Text>
              <Text style={styles.price_number}>{ madeBid[0].deadline.split('-')[2] + '/' + madeBid[0].deadline.split('-')[1] + '/' + madeBid[0].deadline.split('-')[0] }</Text>
            </View>
          :
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
              <LargeButton onPress={() => formatInput()} title={'Dar Lance'}/>
            </View>
        : shipping.shipping_status === 'Em Progresso' ?
        <View style={{flex: 3}}>
          <View style={{alignItems: 'center', marginTop: 30}}>
            <Text style={styles.price_title}>Prazo</Text>
            <Text style={styles.price_number}>{ deadline }</Text>
          </View>
          <LargeButton onPress={confirmDelivery} title={'Finalizar FRETZ'}/>
        </View>
        : 
        <View style={{flex: 3}}>
          <View style={{alignItems: 'center', marginTop: 30}}>
            <Text style={styles.price_title}>FRETZ</Text>
            <Text style={[styles.type_and_deadline_text, { textDecorationLine: 'underline', fontSize: 40}]}>Finalizado</Text>
          </View>
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