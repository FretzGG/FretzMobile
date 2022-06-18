import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import DetailsList from "./components/details-list";
import { UserContext } from "../../navigators/app-navigator";

export default function DeliveryRequestDetails(props) {
  const navigation = useNavigation();

  const user = useContext(UserContext);

  useEffect(() => {
    if (user.type !== 'Motorista') {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate('Delivery Request Form', {
              title: 'Editar ' + props.route.params.title
            })
          }}>
            <FontAwesomeIcon 
              icon={faPenToSquare}
              color='#DEB841'
              size={25}
            />
        </TouchableOpacity>
      )
    })
  }});

  return (
    <DetailsList status={props.route.params.status}/>
  );
}