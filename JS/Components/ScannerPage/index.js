
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import DeprecatedViewPropTypes from 'deprecated-react-native-prop-types';
import { GlobalContext } from '../../GlobalContext';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { RNCamera } from 'react-native-camera';
import { QrcodeMark } from '../SupportComponent/QrcodeMark';
const ScannerPage = () => {
    const [QRPostion, set_QRPostion] = useState(null);

    let scanner;
    onSuccess = ({ barcodes }) => {
         
        set_QRPostion(barcodes)
        console.log(barcodes)

    };
   


    return (
        <View style={styles.container}>
            <RNCamera ref={(camera) => scanner = camera}
                onGoogleVisionBarcodesDetected={onSuccess}
                style={styles.preview}
            >
            <QrcodeMark QRPostion={QRPostion}></QrcodeMark>
            </RNCamera>
            
        </View>
    );
}
ScannerPage.propTypes = {
    styles: DeprecatedViewPropTypes.style,
};
export default ScannerPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});
