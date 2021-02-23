import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'

const MapPreview = props => {
    let imagePreviewUri;
    
    if(props.location){
        imagePreviewUri = `https://maps.googleapis.com/maps/api/staticmap?center=22.9698455,72.6005173&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=AIzaSyB4sScnkjwFfUO7yykHgHfIAvkl83_d38c`;
    }
    
    return (
        <TouchableOpacity onPress={props.onPress} style={{...styles.mapPreview , ...props.style}}>
            { props.location
                ? <Image style={styles.mapImage} source={{ uri : imagePreviewUri }} />
                : props.children
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mapPreview : {
        justifyContent : 'center',
        alignItems : 'center'
    },
    mapImage : {
        width : '100%',
        height : '100%'
    }
})

export default MapPreview

