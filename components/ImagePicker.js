import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import Colors from '../constants/Colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImgPicker = props => {
  const [pickedImage, setPickedImage] = useState();

  const takeImageHandler = () => {
    const image = launchCamera( { quality: 0.5 } , (response) => {
        //console.log('Response = ', response.uri);
        //props.onImageTaken(response.uri);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          setPickedImage(response.uri);
          props.onImageTaken(response.uri);
        }
    });

    
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage 
         ? <Text>No image picked yet.</Text>
         : <Image style={styles.image} source={{ uri: pickedImage }} />
        }
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom : 10
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImgPicker;
