import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function PackagePhotos() {
  const [images, setImages] = useState([])

  // TODO: Adicionar visualizacao e galeria de imagens
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity 
        onPress={() => setImages([...images, 0])}
        style={styles.main_image_preview}
      >
        {images.length === 0 ? (
          <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
            <FontAwesomeIcon
              icon={faEyeSlash}
              color={'#DEB841'}
              size={30}
            />
            <Text style={styles.no_images_text}>SEM IMAGENS</Text>
          </View>
        ) : (
          <Image source={require('../../../assets/package.png')} style={{width: 100, height: 100}}/>
        )}
      </TouchableOpacity>
      {images.length > 1 && (
        <TouchableOpacity
          onPress={() => setImages([])}
          style={styles.more_images}
        >
          <Text>+{images.length - 1}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main_image_preview: {
    height: 100,
    width: 100,
    backgroundColor: '#E6E6E6'
  },
  no_images_text: {
    color: '#DEB841',
    fontSize: 10,
    fontWeight: 'bold'
  },
  more_images: {
    height: 50,
    width: 50,
    backgroundColor: '#E6E6E6',
    marginTop: 50,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});