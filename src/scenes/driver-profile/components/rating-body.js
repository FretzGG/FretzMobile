import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import ProfileIcon from "../../../components/profile-icon";

export default function RatingBody() {
  const ratings = {
    oneStar: 0,
    twoStars: 0,
    threeStars: 0,
    fourStars: 2,
    fiveStars: 23,
    mean: 4.87,
    total: 25,
    comments: [
      {id: 0, userName: 'Guguinha Neves', noOfStars: 5, text: 'O frete foi excelente, a carga foi transportada sem nenhum imprevisto', date: '12/05/2022'},
      {id: 1, userName: 'Guguinha Cardoso', noOfStars: 4, text: 'O frete foi bom, a carga foi transportada com um pouco de atraso', date: '29/05/2022'}
    ]
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.section} >
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
              <FontAwesomeIcon icon={faStar} color={'#DEB841'} />
              <Text style={styles.title}> {ratings.mean}/5</Text>
            </View>
            <Text style={styles.text}>{ratings.total} avaliações</Text>
          </View>
          <View style={[styles.section, {flexDirection: 'row'}]} >
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text style={[styles.title, {paddingVertical: 5}]}>Excelente</Text>
              <Text style={[styles.title, {paddingVertical: 5}]}>Muito Bom</Text>
              <Text style={[styles.title, {paddingVertical: 5}]}>Regular</Text>
              <Text style={[styles.title, {paddingVertical: 5}]}>Decepcionante</Text>
              <Text style={[styles.title, {paddingVertical: 5}]}>Ruim</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={[styles.title, {paddingVertical: 5}]}>{ratings.fiveStars}</Text>
              <Text style={[styles.title, {paddingVertical: 5}]}>{ratings.fourStars}</Text>
              <Text style={[styles.title, {paddingVertical: 5}]}>{ratings.threeStars}</Text>
              <Text style={[styles.title, {paddingVertical: 5}]}>{ratings.twoStars}</Text>
              <Text style={[styles.title, {paddingVertical: 5}]}>{ratings.oneStar}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: 'row'
  },
  section: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E6E6E6'
  },
  title: {
    color: '#E6E6E6',
    fontWeight: 'bold',
    fontSize: 18
  },
  text: {
    color: '#E6E6E6',
    fontSize: 12
  }
})