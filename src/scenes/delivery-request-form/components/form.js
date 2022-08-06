import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import MaskInput, { Masks } from "react-native-mask-input";
import DocumentPicker, { types } from 'react-native-document-picker'
import { server_url } from "../../../utils/utils";
import { AuthContext } from "../../../navigators/root-navigator";
import { UserContext } from "../../../navigators/app-navigator";
import LargeButton from "../../../components/large-button";

export default function Form(props) {
  const navigation = useNavigation();
  
  const { userToken } = useContext(AuthContext);
  const user = useContext(UserContext);

  const type_options = ['Selecione o tipo de entrega', 'Frágil', 'Perecível', 'Simples', 'Alto Valor', 'Perigosa', 'Pesado', 'Refrigerada'];

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedOption, setSelectedOption] = useState(type_options[0]);
  const [departureAddress, setDepartureAddress] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [weight, setWeight] = useState('')
  const [width, setWidth] = useState('')
  const [length, setLength] = useState('')
  const [height, setHeight] = useState('')
  const [deadline, setDeadline] = useState('')
  const [files, setFiles] = useState([])
  const [suggestedPrice, setSuggestedPrice] = useState('')
  const [createShipping, setCreateShipping] = useState(false)

  useEffect(() => {
    createShipping && (
      fetch(server_url + 'api/shipping/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 'Authorization' : `Token ${userToken}`
        },
        body: JSON.stringify({
          title,
          load_specifications : description,
          shipping_type : selectedOption,
          departure_location : departureAddress,
          delivery_location : deliveryAddress,
          cargo_weight : weight,
          width,
          length,
          height,
          deadline,
          opening_bid : suggestedPrice,
          user_posted : user.id
        })
      })
      .then(resp => {
        setCreateShipping(false)
        if (resp.ok){
          alert('FRETZ criado com sucesso!')
          navigation.goBack();
        }
        else alert('Ocorreu algum problema. Tente novamente mais tarde')
      })
      .catch(error => console.log(error))
    )
  }, [ createShipping ])

  const checkInput = () => {
    if (!title){
      alert('O campo nome da carga é obrigatório')
      return ;
    }
    if (!description){
      alert('O campo descrição é obrigatório')
      return ;
    }
    if (selectedOption == type_options[0]){
      alert('O campo tipo deve ser selecionado')
      return ;
    }
    if (!departureAddress){
      alert('O campo endereço de saída é obrigatório')
      return ;
    }
    if (!deliveryAddress){
      alert('O campo endereço de entrega é obrigatório')
      return ;
    }
    if (!weight){
      alert('O campo peso é obrigatório')
      return ;
    }
    if (!width){
      alert('O campo comprimento é obrigatório')
      return ;
    }
    if (!length){
      alert('O campo largura é obrigatório')
      return ;
    }
    if (!height){
      alert('O campo altura é obrigatório')
      return ;
    }
    if (!deadline){
      alert('O campo prazo é obrigatório')
      return ;
    }
    else {
      const periods = deadline.split('/')
      const formatedDate = periods[2] + '-' + periods[1] + '-' + periods[0]
      setDeadline(formatedDate)
    }
    if (!suggestedPrice){
      alert('O campo preço sugerido é obrigatório')
      return ;
    }
    else {
      const onlyNumbers = suggestedPrice.split(' ')[1]
      const withoutDots = onlyNumbers.split('.').join('')
      const replaceComma = withoutDots.replace(',', '.')
      setSuggestedPrice(replaceComma)
    }
    setCreateShipping(true);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.input_title}>Nome da Carga</Text>
      <TextInput 
        style={styles.text_input}
        autoCapitalize={'sentences'}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.input_title}>Descrição</Text>
      <TextInput 
        style={styles.multiline_text_input}
        autoCapitalize={'sentences'}
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.input_title}>Tipo</Text>
      <ModalDropdown 
        options={type_options.slice(1, type_options.length)}
        dropdownStyle={styles.dropdown_style}
        dropdownTextStyle={styles.dropdown_text_options}
        onSelect={(index) => setSelectedOption(type_options[index + 1])}
      >
        <View style={styles.dropdown_button}>
          <Text style={styles.dropdown_text_selected}>{selectedOption}</Text>
        </View>
      </ModalDropdown>
      <Text style={styles.input_title}>Endereço de saída</Text>
      <TextInput 
        style={styles.text_input}
        autoCapitalize={'sentences'}
        value={departureAddress}
        onChangeText={setDepartureAddress}
      />
      <Text style={styles.input_title}>Endereço de entrega</Text>
      <TextInput 
        style={styles.text_input}
        autoCapitalize={'sentences'}
        value={deliveryAddress}
        onChangeText={setDeliveryAddress}
      />
      <Text style={styles.input_title}>Peso da carga (em Kg)</Text>
      <TextInput 
        style={styles.text_input}
        autoCapitalize={'sentences'}
        keyboardType={'numeric'}
        value={weight}
        onChangeText={setWeight}
      />
      <Text style={styles.input_title}>Largura (em m)</Text>
      <TextInput 
        style={styles.text_input}
        autoCapitalize={'sentences'}
        keyboardType={'numeric'}
        value={width}
        onChangeText={setWidth}
      />
      <Text style={styles.input_title}>Comprimento (em m)</Text>
      <TextInput 
        style={styles.text_input}
        autoCapitalize={'sentences'}
        keyboardType={'numeric'}
        value={length}
        onChangeText={setLength}
      />
      <Text style={styles.input_title}>Altura (em m)</Text>
      <TextInput 
        style={styles.text_input}
        autoCapitalize={'sentences'}
        keyboardType={'numeric'}
        value={height}
        onChangeText={setHeight}
      />
      <Text style={styles.input_title}>Prazo de entrega</Text>
      <MaskInput
        style={styles.text_input}
        mask={Masks.DATE_DDMMYYYY}
        keyboardType={'numeric'}
        value={deadline}
        onChangeText={setDeadline}
        placeholderTextColor={'#6D6A75'}
      />
      <Text style={styles.input_title}>Anexos</Text>
      <TouchableOpacity
        style={styles.attachment_input}
        onPress={async () => {
          try{
            const response = await DocumentPicker.pickMultiple({
              type: types.pdf
            })
            setFiles(response)
          }
          catch(err){
            alert('Nenhum documento selecionado')
          }
        }}
      >
        <Text style={{color: '#37323E'}}>
          {files.length > 0 ?
            'Arquivos selecionados: \n' + files[0].name :
            'Selecione um anexo (opcional)'
          }
        </Text>
      </TouchableOpacity>
      <View style={styles.price_view}>
        <Text style={styles.price_title}>Valor previsto</Text>
        <MaskInput
          style={styles.price_number}
          mask={Masks.BRL_CURRENCY}
          placeholder={'R$ 0,00'}
          placeholderTextColor={'#6D6A75'}
          keyboardType={'numeric'}
          value={suggestedPrice}
          onChangeText={setSuggestedPrice}
        />
        <Text style={{color: '#E6E6E6', marginTop: -10}}>Toque para alterar valor</Text>
      </View>
      <LargeButton 
        title={props.title === 'Novo Frete' ?
          'Criar' 
          : 'Salvar'
        }
        onPress={() => {
          checkInput()
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E',
    paddingStart: 15,
  },
  input_title: {
    color: '#DEB841',
    fontWeight: 'bold',
    marginTop: 10
  },
  text_input: {
    backgroundColor: '#E6E6E6',
    color: '#37323E',
    marginTop: 10,
    borderRadius: 30,
    width: "96%",
    height: 44,
    paddingHorizontal: 20
  },
  multiline_text_input: {
    backgroundColor: '#E6E6E6',
    color: '#37323E',
    marginTop: 10,
    borderRadius: 30,
    width: "96%",
    height: 88,
    paddingHorizontal: 20
  },
  attachment_input: {
    backgroundColor: '#E6E6E6',
    color: '#37323E',
    marginTop: 10,
    borderRadius: 30,
    width: "96%",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  dropdown_button: {
    backgroundColor: '#E6E6E6',
    borderRadius: 30,
    justifyContent: 'center',
    width: "96%",
    height: 44,
    paddingHorizontal: 20,
    marginTop: 10
  },
  dropdown_text_selected:{
    color: '#37323E',
    marginLeft: 5,
  },
  dropdown_text_options: {
    backgroundColor: '#E6E6E6',
    color: '#37323E',
    fontSize: 13,
  },
  dropdown_style: {
    backgroundColor: '#E6E6E6',
    borderBottomColor: '#37323E',
    width: '92.5%',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    marginTop: -20,
  },
  price_view: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  price_title: {
    color: '#DEB841',
    fontWeight: 'bold',
    fontSize: 40
  },
  price_number: {
    color: '#E6E6E6',
    marginTop: -15,
    fontSize: 40,
  },
  form_submit_button:{
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    backgroundColor: '#DEB841',
    padding: 10,
    width: '45%',
    borderRadius: 25,
  },
  form_submit_text:{
    color: '#37323E',
    fontWeight: 'bold'
  }
});