import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { UserContext } from "../../../navigators/app-navigator";
import { AuthContext } from "../../../navigators/root-navigator";
import ProfileIcon from "../../../components/profile-icon";
import { server_url } from "../../../utils/utils";

export default function RatingBody() {
  const { user } = useContext(UserContext);
  const { userToken } = useContext(AuthContext);

  const [ ratings, setRatings ] = useState([])
  const [ oneStar, setOneStar ] = useState(0)
  const [ twoStars, setTwoStar ] = useState(0)
  const [ threeStars, setThreeStar ] = useState(0)
  const [ fourStars, setFourStar ] = useState(0)
  const [ fiveStars, setFiveStar ] = useState(0)

  useEffect(() => {
    fetch(server_url + 'api/rating/get_user_ratings/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${userToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'profile_evaluated': user.id
      })
    })
    .then(resp => resp.json())
    .then(jsonResp => setRatings(jsonResp))
    .catch(error => console.log(error))
  }, [ user ])

  useEffect(() => {
    setOneStar(0)
    setTwoStar(0)
    setThreeStar(0)
    setFourStar(0)
    setFiveStar(0)
    ratings.forEach(rating => {
      switch (rating.stars) {
        case 1:
          setOneStar(oneStar + 1)
          break;
        case 2:
          setTwoStar(twoStars + 1)
          break;
        case 3:
          setThreeStar(threeStars + 1)
          break;
        case 4:
          setFourStar(fourStars + 1)
          break;
        case 5:
          setFiveStar(fiveStars + 1)
          break;
      }
    });
  }, [ ratings ])

  const dateFormated = (post_date) => {
    const date = post_date.split('T')[0]
    const date_separated = date.split('-')
    return date_separated[2] + '/' + date_separated[1] + '/' + date_separated[0]
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.section} >
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                { user.avg_rating > 0 && (<FontAwesomeIcon icon={faStar} color={'#DEB841'} />)}
                <Text style={[styles.title, user.avg_rating < 0 && { marginLeft: -5 }]}> { user.avg_rating > 0 ? user.avg_rating.toFixed(2) + ' / 5.00' : 'Realize seu primeiro FRETZ!'}</Text>
              </View>
              <Text style={styles.text}>{user.number_of_ratings} avaliações</Text>
            </View>
            <View style={[styles.section, {flexDirection: 'row'}]} >
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Text style={[styles.title, {paddingVertical: 5}]}>Excelente</Text>
                <Text style={[styles.title, {paddingVertical: 5}]}>Muito Bom</Text>
                <Text style={[styles.title, {paddingVertical: 5}]}>Regular</Text>
                <Text style={[styles.title, {paddingVertical: 5}]}>Ruim</Text>
                <Text style={[styles.title, {paddingVertical: 5}]}>Decepcionante</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text style={[styles.title, {paddingVertical: 5}]}>{fiveStars}</Text>
                <Text style={[styles.title, {paddingVertical: 5}]}>{fourStars}</Text>
                <Text style={[styles.title, {paddingVertical: 5}]}>{threeStars}</Text>
                <Text style={[styles.title, {paddingVertical: 5}]}>{twoStars}</Text>
                <Text style={[styles.title, {paddingVertical: 5}]}>{oneStar}</Text>
              </View>
            </View>
            <Text style={[styles.title, {color: '#DEB841', textDecorationLine: 'underline', fontSize: 25, textAlign: 'center', paddingTop: 10}]}>
              Comentários
            </Text>
          </>
        }
        data={ratings}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          item.comment !== '' && item.comment !== null && (
            <View style={styles.section}> 
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.title}>{item.profile_evaluator}</Text>
                    <Text style={[styles.text, {paddingStart: 5, paddingTop: 5}]}>({dateFormated(item.date)})</Text>
                  </View>
                  <View style={{paddingTop: 5, flexDirection: 'row'}}>
                    {item.stars > 0 ? <FontAwesomeIcon icon={faStar} color={'#DEB841'}/> : <FontAwesomeIcon icon={faStar} color={'#6D6A75'}/>}
                    {item.stars > 1 ? <FontAwesomeIcon icon={faStar} color={'#DEB841'}/> : <FontAwesomeIcon icon={faStar} color={'#6D6A75'}/>}
                    {item.stars > 2 ? <FontAwesomeIcon icon={faStar} color={'#DEB841'}/> : <FontAwesomeIcon icon={faStar} color={'#6D6A75'}/>}
                    {item.stars > 3 ? <FontAwesomeIcon icon={faStar} color={'#DEB841'}/> : <FontAwesomeIcon icon={faStar} color={'#6D6A75'}/>}
                    {item.stars > 4 ? <FontAwesomeIcon icon={faStar} color={'#DEB841'}/> : <FontAwesomeIcon icon={faStar} color={'#6D6A75'}/>}
                  </View>
                </View>
                <ProfileIcon iconSize={30} iconColor={'#37323E'} circleRadius={50} circleColor={'#DEB841'} />
              </View>
              <Text style={[styles.text, {paddingTop: 10}]}>{item.comment}</Text>
            </View>
          )
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