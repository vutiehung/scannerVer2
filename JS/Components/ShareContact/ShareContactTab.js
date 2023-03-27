import React, { useState, useEffect, useContext } from 'react';
import QRCodePage from '../QRCodePage/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import ShareContact from './index';
import { Icon } from '@rneui/base';
const RightButton=()=>{
    return( <Icon
        name="share-outline"
        type='ionicon' size={30} 
        color="#000"
      />)
}

const ShareContactTab = ({ navigation }) => { 
    
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="ShareContact1" component={ShareContact} navigation={navigation} />
            <Stack.Screen name="QRCode21" options={{headerRight:RightButton}} component={QRCodePage} />
        </Stack.Navigator>
    );
}

export default ShareContactTab;