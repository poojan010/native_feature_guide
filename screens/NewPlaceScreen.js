import React , { useState, useCallback } from 'react';
import {View ,ScrollView , TextInput ,  Text , StyleSheet, Button} from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from "react-redux";
import * as placesActions from '../store/places-action';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {
    
    const [title,setTitle] = useState('');
    const [selectedImage,setSelectedImage] = useState();
    const [selectedLocation,setSelectedLocation] = useState();
    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        setTitle(text);
    }

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    }

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(title,selectedImage,selectedLocation));
        props.navigation.navigate('Places');
    }

    const locationPickedHandler = useCallback((location) => {
        setSelectedLocation(location);
    },[]);

    return(
        <ScrollView>
        <View style={styles.form}>
            <Text style={styles.label}>Title</Text>
            <TextInput 
                style={styles.input} 
                onChangeText = {titleChangeHandler}
            />
            <ImagePicker onImageTaken={imageTakenHandler} />
            <LocationPicker navigation = { props.navigation } onLocationPicked={locationPickedHandler} />
            <Button color={Colors.primary} title="Save Place" onPress={savePlaceHandler} />
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form : {
        margin : 30,
    },
    label : {
        fontSize : 18, 
        marginBottom : 15
    },
    input : {
        borderBottomColor : '#ccc',
        borderBottomWidth : 1,
        paddingHorizontal : 4,
        paddingVertical : 2,
        marginBottom : 15
    }
});

export default NewPlaceScreen;