import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import ProfilePhoto from "./profile-photo";

export default function RequestItem(props) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <List.Accordion
      style={[styles.header, !expanded && {borderBottomWidth: 0.8,borderBottomColor: '#E6E6E6'}]}
      title={props.request.sellerName}
      titleStyle={styles.title}
      onPress={() => setExpanded(!expanded)}
      expanded={expanded}
      right={() =>
        <View style={{marginTop: 10}}>
          <FontAwesomeIcon 
            icon={false ? faAngleUp : faAngleDown}
            color={'#DEB841'}
            size={30}
          />
        </View>
      }
      left={() => 
        <View style={{marginTop: 15}} >
          <ProfilePhoto size={10} />
        </View>
      }
    >
      <Text style={ expanded && {borderBottomWidth: 0.8, borderBottomColor: '#E6E6E6'}}>Teste</Text>
    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#37323E',
    height: 70,
    paddingTop: -5
  },
  title:{
    color: '#E6E6E6',
    textAlign: 'justify',
    marginTop: 15,
    marginLeft: 10
  }
});