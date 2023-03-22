import React from 'react';

import { NativeModules } from 'react-native';


const ShareWifiPage = () => {
    const WifiModule = NativeModules.WifiModule;

    WifiModule.getWifiList((wifiList) => {
        console.log(wifiList);
    });

    return (
        <></>
    );
}

export default ShareWifiPage;
