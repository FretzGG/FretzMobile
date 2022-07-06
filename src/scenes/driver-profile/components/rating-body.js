import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
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
      {id: 1, userName: 'Guguinha Cardoso', noOfStars: 4, text: 'O frete foi bom, mas a carga foi transportada com um pouco de atraso', date: '29/05/2022'},
      {id: 2, userName: 'Guguinha Lopes', noOfStars: 4, text: 'O frete foi bom, porém a caixa amassou um pouco', date: '30/06/2022'}
    ]
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
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
          </>
        }
        data={ratings.comments}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.section}> 
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.title}>{item.userName}</Text>
                  <Text style={[styles.text, {paddingStart: 5, paddingTop: 5}]}>({item.date})</Text>
                </View>
                <View style={{paddingTop: 5, flexDirection: 'row'}}>
                  {item.noOfStars > 0 ? <FontAwesomeIcon icon={faStar} color={'#DEB841'}/> : <FontAwesomeIcon icon={faStar} color={'#6D6A75'}/>}
                  {item.noOfStars > 1 ? <FontAwesomeIcon icon={faStar} color={'#DEB841'}/> : <FontAwesomeIcon icon={faStar} color={'#6D6A75'}/>}
                  {item.noOfStars > 2 ? <FontAwesomeIcon icon={faStar} color={'#DEB841'}/> : <FontAwesomeIcon icon={faStar} color={'#6D6A75'}/>}
                  {item.noOfStars > 3 ? <FontAwesomeIcon icon={faStar} color={'#DEB841'}/> : <FontAwesomeIcon icon={faStar} color={'#6D6A75'}/>}
                  {item.noOfStars > 4 ? <FontAwesomeIcon icon={faStar} color={'#DEB841'}/> : <FontAwesomeIcon icon={faStar} color={'#6D6A75'}/>}
                </View>
              </View>
              <ProfileIcon iconSize={30} iconColor={'#37323E'} circleRadius={50} circleColor={'#DEB841'} />
            </View>
            <Text style={[styles.text, {paddingTop: 10}]}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5
  },
  section: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E6E6E6',
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