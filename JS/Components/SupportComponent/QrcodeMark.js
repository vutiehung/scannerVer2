import React from 'react';
import { Text, View, StyleSheet, Alert, PermissionsAndroid, Linking, Platform } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { DecodeQR, GetIcon, GetText, isUndefined } from '../../Utility'
import { UContact } from '../../Utility/UContact';
import Contacts from 'react-native-contacts';
import { USms } from '../../Utility/USms';
const QrcodeMark = (Props) => {
    var value = Props.QRPostion
    var data = "";
    var Otop = 0;
    var Oleft = 0;
    var height = 0;
    var width = 0;
    if (Props.QRPostion != null && Props.QRPostion.length > 0) {
        value = Props.QRPostion
        data = Props.QRPostion[0].dataRaw;
        Otop = Props.QRPostion[0].bounds.origin.y;
        Oleft = Props.QRPostion[0].bounds.origin.x;
        height = Props.QRPostion[0].bounds.size.height
        width = Props.QRPostion[0].bounds.size.width;
    }

    const QrResultPress = () => {
        switch (DecodeQR(data)) {
            case "URL":
                openLink(data)
                break;
            case "EMAILADDRESS":

                break;
            case "VCARD":
                var vcardJson = UContact.vcardToJSON(data);
                var contact = UContact.jsonToAndroidContact(vcardJson)
                Contacts.openContactForm(contact).then((contact) => {
                    console.log('Form submitted successfully');
                    console.log(contact)
                })
                    .catch((error) => {
                        console.log('An error occurred:', error);
                    });
                break;
            case "EMAILTO":
                console.log("EMAILTO")
                console.log(data)
                break;
            case "WIFI":

                break;
            case "SMSTO":
                var smsvalue = USms.ConvertQRData2Json(data)
                onSendSMSMessage(smsvalue.Phone, smsvalue.Content)
                break;
            case "LOCATION":

                break;
            case "EVENT":

                break;
            default:

                break;
        }


    }


    const onSendEmail = (toMailId, subject, body) => {
        if (!isUndefined(toMailId)) {
            let link = `mailto:${toMailId}`;
            if (!isUndefined(subject)) {
                link = `${link}?subject=${subject}`;
            }
            if (isUndefined(subject)) {
                link = `${link}?body=${body}`;
            } else {
                link = `${link}&body=${body}`;
            }

            Linking.canOpenURL(link)
                .then(supported => {
                    if (supported) {
                        // 'mailto:support@example.com?subject=Billing Query&body=Description'
                        Linking.openURL(link);
                    }
                })
                .catch(err => console.error('An error occurred', err));
        } else {
            console.log('sendEmailViaEmailApp -----> ', 'mail link is undefined');
        }
    };

    const onSendSMSMessage = async (phoneNumber, message) => {
        const separator = Platform.OS === 'ios' ? '&' : '?'
        const url = `sms:${phoneNumber}${separator}body=${message}`
        await Linking.openURL(url)
    }


    const openLink = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }

    const contentProcess = () => {
        return (<Button type="clear" style={{ flexDirection: 'row', alignItems: 'center' }} onPress={QrResultPress} >
            <Icon
                name={GetIcon(DecodeQR(data))}
                size={15}
                type='ionicon'
                color='#000'
            />
            <Text style={{ marginLeft: 5 }}>{GetText(data)} </Text>
        </Button>)
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
            <View style={{ top: height + 10, flex: 1, alignItems: 'center', position: 'absolute', }}>
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