import React, { useState, useEffect, useContext } from 'react';
import CreateQR from './CreateQR';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QRCodePage from '../QRCodePage/index';
import { Icon } from '@rneui/base';
import GlobalCSS from '../../CSS/GlobalCSS';
const RightButton = () => {
    return (<Icon
        name="share-outline"
        type='ionicon' size={30}
        color="#000"
    />)
}

const TabCreateQR = ({ navigation }) => {

    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="CreateQR" component={CreateQR} options={{
                headerTintColor: GlobalCSS.Icon_Color,
                headerStyle: {
                    backgroundColor: GlobalCSS.Main_Color,
                },
                headerTitle: "Create QRcode"
            }} navigation={navigation} />
            <Stack.Screen name="QRCode2" options={{
                headerTintColor: GlobalCSS.Icon_Color,
                headerStyle: {
                    backgroundColor: GlobalCSS.Main_Color,
                }, headerTitle: "QRcode", headerRight: RightButton
            }} component={QRCodePage} />
        </Stack.Navigator>
    );
}

export default TabCreateQR;