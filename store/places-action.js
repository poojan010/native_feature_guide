export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACE = 'SET_PLACE';

import { insertPlace , fetchPlaces } from '../helper/db';

var RNFS = require('react-native-fs');

export const addPlace = (title,image,location) => {
    return async dispatch => {

        const address = "Dummy Address"
        const fileName = image.split('/').pop();
        const newPath = RNFS.DocumentDirectoryPath + fileName;

        try {
            await RNFS.moveFile(image,newPath);
            const dbResult = await insertPlace(title,newPath,address,location.lat,location.lng);
            
            dispatch ({ type : ADD_PLACE , 
                placeData : { 
                    id : dbResult.insertId , 
                    title : title , 
                    image : newPath , 
                    address : address , 
                    coords : {
                        lat : location.lat,
                        lng : location.lng
                    } 
                } 
            });
        } catch (err) {
            console.log(err);
        }
        
    }   
}

export const loadPlaces = () => {
    return async dispatch => {

        try {
            const dbResult = await fetchPlaces();
            dispatch ({ type: 'SET_PLACE' , places : dbResult });
        }
        catch (err) {
            console.log(err);
        }   

       
    }
}

// dbResult.rows._array
