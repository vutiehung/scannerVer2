import React, { useState, useEffect, useContext } from 'react';
import CreateQR from './CreateQR';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import QRCodePage from '../QRCodePage/index';

const TabCreateQR = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="CreateQR" component={CreateQR} />
            <Stack.Screen name="QRCode" options={{headerRight:RightButton}} component={QRCodePage} />
        </Stack.Navigator>
    );
}

export default TabCreateQR;