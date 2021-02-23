import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';

const CustomHeaderButton = props => {
    return <HeaderButton 
                IconComponent = {Ionicons}
                {...props} 
                iconSize = {23} 
                color= {Platform.OS === 'android' ? 'white' : Colors.primary}
            />;
};

export default CustomHeaderButton;