import React from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { Icon } from '@rneui/themed';
import { DecodeQR, GetIcon,GetText } from '../../Utility'

const QrcodeMark = (Props) => {
    var value=Props.QRPostion
    var data = "Props.QRPostion.data";
    var Otop = 0;
    var Oleft = 0;
    var height = 0;
    var width = 0;
    
    const contentProcess = () => {
        return (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
                name= {GetIcon(DecodeQR(data))}
                size={15}
                type='ionicon'
                color='#000'
            />
            <Text style={{ marginLeft: 5 }}>{GetText(data)} </Text>
        </View>)
    }



    return (
        <View style={{ position: 'absolute', top: Otop, left: Oleft, textAlign: 'center' }}>
            <View style={{ ...styles.mask_n, top: 0, left: 0 }} />
            <View style={{ ...styles.mask_n, ...styles.mask_d, top: 10, left: -10 }} />
            <View style={{ ...styles.mask_n, top: 0, left: width - 20 }} />
            <View style={{ ...styles.mask_n, ...styles.mask_d, top: 10, left: width - 10 }} />

            <View style={{ ...styles.mask_n, top: height, left: 0 }} />
            <View style={{ ...styles.mask_n, ...styles.mask_d, top: height - 10, left: -10 }} />

            <View style={{ ...styles.mask_n, top: height, left: width - 20 }} />
            <View style={{ ...styles.mask_n, ...styles.mask_d, top: height - 10, left: width - 10 }} />
            <View style={{ top: height + 10,flex: 1, alignItems: 'center', position: 'absolute', }}>
                <View style={{ ...styles.text_qrResult }}>
                        {contentProcess()}
                </View>
            </View>
        </View>
    );
}


export { QrcodeMark }


const styles = StyleSheet.create({
    mask_n:
    {
        flex: 1,
        position: 'absolute',
        backgroundColor: 'yellow',
        width: 20,
        height: 2
    },
    mask_d:
    {
        transform: [{ rotate: '90deg' }],
    },
    text_qrResult:
    {
        position: "relative",
        color: '#fff',
        textAlign: 'center',
        backgroundColor: "yellow",
        padding: 7,
        borderRadius: 10,
    }
});