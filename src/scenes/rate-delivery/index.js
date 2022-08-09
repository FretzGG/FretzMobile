import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../navigators/root-navigator";
import { UserContext } from "../../navigators/app-navigator";
import { server_url } from "../../utils/utils";
import CommentSection from "./components/comment-section";
import RateSelection from "./components/rate-section";
import LargeButton from "../../components/large-button";

export default function RateDelivery(props) {
  const navigation = useNavigation();

  const shipping = props.route.params.shipping;

  const { userToken } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  const [ userEvaluated, setUserEvaluated ] = useState({});
  const [ stars, setStars ] = useState(0);
  const [ comment, setComment ] = useState('');

  useEffect(() => {
    fetch(server_url + 'api/profile/' + shipping.user_transporter + '/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      }
    })
    .then(resp => resp.json())
    .then(jsonResp => setUserEvaluated(jsonResp))
    .catch(error => console.log(error))
  }, [ shipping ])

  const checkInput = () => {
    if (stars === 0){
      alert('Por favor, selecione uma quantidade de estrelas para o entregador.')
      return ;
    }
    
    fetch(server_url + 'api/rating/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      },
      body: JSON.stringify({
        profile_evaluator: user.id,
        profile_evaluated: userEvaluated.id,
        shipping: shipping.id,
        stars,
        comment
      })
    })
    .then(resp => {
      if (resp.ok){
        alert('Entregador avaliado com sucesso!');
        navigation.navigate('Home')
      }
      else
        alert('Ocorreu um problema. Tente novamente mais tarde');
    })
    .catch(error => console.log(error))
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
        <RateSelection userEvaluated={userEvaluated} stars={stars} setStars={setStars} />
        <CommentSection comment={comment} setComment={setComment} />
        <LargeButton title={ 'Avaliar '} onPress={checkInput} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37323E'
  }
})