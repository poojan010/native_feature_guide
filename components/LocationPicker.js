import React , { useState , useEffect} from 'react'
import { StyleSheet, Text, View , Button , ActivityIndicator} from 'react-native'
import Colors from '../constants/Colors'
import { PermissionsAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import MapPreview from './MapPreview';

const LocationPicker = props => {
    
    const [isfetching,setIsFetching] = useState();
    const [pickedLocation,setPickedLocation] = useState();
    const { onLocationPicked } = props;

    const mapPickedLocation = props.navigation.getParam('pickedLocation');

    useEffect(() => {
        if(mapPickedLocation){
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation);
        }
    },[mapPickedLocation,onLocationPicked]);

    const getLocationHandler = async () => {
        try {
            setIsFetching(true);
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                title: "Location Permission",
                message:
                    "This App needs access to your location ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
                }
            );
            
            if(granted){
                Geolocation.getCurrentPosition(
                    (position) => {
                      setPickedLocation({
                          lat : position.coords.latitude,
                          lng : position.coords.longitude
                      });
                        onLocationPicked({
                            lat : position.coords.latitude,
                            lng : position.coords.longitude
                        });
                    },
                    (error) => {
                      console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            }else{
                return;
            }
            setIsFetching(false);
        } 
        catch (err) {
            console.warn(err);
        }
      };

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map');
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview style={styles.mapPreview} location = {pickedLocation} >
                {isfetching 
                    ? <ActivityIndicator color={Colors.primary} size="large" />
                    : <Text>No location chosen yet</Text>
                }
            </MapPreview>
            <View style={styles.actions}>
                <Button title="Get User location" color={Colors.primary} onPress={getLocationHandler} />
                <Button title="Pick on Map" color={Colors.primary} onPress={pickOnMapHandler} />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    locationPicker : {
        marginBottom : 15,
        alignItems : 'center'
    },
    mapPreview :{
        marginBottom : 10,
        width : '100%',
        height : 150,
        borderColor : '#ccc',
        borderWidth :1
    },
    actions : {
        flexDirection : 'row',
        justifyContent : 'space-around',
        width : '100%'
    }
})


export default LocationPicker