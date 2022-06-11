import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function PackagePhotos() {
  const [images, setImages] = useState([])

  // TODO: Adicionar galeria de imagens
  return (
    <View>
      <View style={styles.main_image_preview}>
        {images.length === 0 ? (
          <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
            <FontAwesomeIcon
              icon={faEyeSlash}
              color={'#DEB841'}
              size={30}
            />
            <Text style={styles.no_images_text}>SEM IMAGENS</Text>
          </View>
        ) : images.length === 1 ? (
          <Text style={styles.no_images_text}>1</Text>
        ) : (
          <Text style={styles.no_images_text}>2</Text>
        )}
      </View>
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
  }
});