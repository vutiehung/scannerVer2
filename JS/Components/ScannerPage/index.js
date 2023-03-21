
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import DeprecatedViewPropTypes from 'deprecated-react-native-prop-types';
import { GlobalContext } from '../../GlobalContext';

import { RNCamera } from 'react-native-camera';
import { QrcodeMark } from '../SupportComponent/QrcodeMark';
const ScannerPage = () => {
    const [QRPostion, set_QRPostion] = useState(null);
    const [Scanned, set_Scanned] = useState(true);
    const [timeout, set_Timeout] = useState(null);
    const [barcodeDetected, set_barcodeDetected] = useState(false);

    onSuccess = ({ barcodes }) => {
        if (barcodes != null && barcodes.length > 0) {
            set_QRPostion(barcodes)
            set_barcodeDetected(true)
            if (timeout != null) { clearTimeout(timeout) }
             set_Timeout(setTimeout(() => handleTimeout(), 1000));
        }
    };
    const handleTimeout = () => {
        set_barcodeDetected(false)

    };
    return (
        <View style={styles.container}>
            <RNCamera
                onGoogleVisionBarcodesDetected={Scanned ? onSuccess : null}
                style={styles.preview}
            >
                {barcodeDetected ? <QrcodeMark QRPostion={QRPostion}></QrcodeMark> : null}
            </RNCamera>

        </View>
    );
}

export default ScannerPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});
 