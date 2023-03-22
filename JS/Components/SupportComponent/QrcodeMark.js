import React,{useState,useContext} from 'react';
import { Text, View, StyleSheet, Alert, PermissionsAndroid, Linking, Platform } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { DecodeQR, GetIcon, GetText, isUndefined } from '../../Utility'
import { UContact } from '../../Utility/UContact';
import Contacts from 'react-native-contacts';
import { USms } from '../../Utility/USms';
import { UEmail } from '../../Utility/UEmail';
import { UWifi } from '../../Utility/UWifi';
import { UEvent } from '../../Utility/UEvent';
import WifiManager from 'react-native-wifi-reborn';
import { GlobalContext } from '../../GlobalContext';
const QrcodeMark = (Props) => {
    const {
        data_his,saveData
    } = useContext(GlobalContext);
    const [ButtonWidth, set_ButtonWidth] = useState(0);
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
        height = Props.QRPostion[0].bounds.size.height*1,2;
        width = Props.QRPostion[0].bounds.size.width*1,2;
    }

    const QrResultPress = () => {    
        var x=[{'data': data },...data_his ]
        saveData(x)
        console.log(data)
        switch (DecodeQR(data)) {
            case "URL":
                onOpenLink(data)
                break;
            case "VCARD":
                var vcardJson = UContact.vcardToJSON(data);
                onAddContact(vcardJson)
                break;
            case "EMAILTO":
                var emailto = UEmail.ConvertQRData2Json(data)
                onSendEmail(emailto.Email, emailto.Sub, emailto.Content)
                break;
            case "WIFI":
                var wifi = UWifi.ConvertQRData2Json(data)
                onWifiJoin(wifi.SSID, wifi.Password, wifi.Type)
                break;
            case "SMSTO":
                var smsvalue = USms.ConvertQRData2Json(data)
                onSendSMSMessage(smsvalue.Phone, smsvalue.Content)
                break;      
            case "EVENT":
                var event=UEvent.ConvertQRData2Json(data)               
                break;
            default:
                onOpenLink("https://www.amazon.com/s?k="+data)
                break;
        }
    }

    const onWifiJoin = async (ssid, password, type) => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location permission is required for WiFi connections',
                message:
                    'This app needs location permission as this is required  ' +
                    'to scan for wifi networks.',
                buttonNegative: 'DENY',
                buttonPositive: 'ALLOW',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            WifiManager.connectToProtectedSSID(ssid, password, (type == "WEP" ? true : false))
                .then(() => {
                    console.log('Connected to wifi:', ssid);
                })
                .catch((error) => {
                    console.log('Error connecting to wifi:', error);
                });
        } else {
            console.log('Permission denied');
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


    const onOpenLink = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }

    const onAddContact=(vcardJson)=>{
        var contact = UContact.jsonToAndroidContact(vcardJson)
        Contacts.openContactForm(contact).then((contact) => {
            console.log('Form submitted successfully');
            console.log(contact)
        })
            .catch((error) => {
                console.log('An error occurred:', error);
            });
    }

    const getLayout=(event) => {
        var widthButton=event.nativeEvent.layout.width
        set_ButtonWidth((width-widthButton)/2) 
      
      }

    const contentProcess = () => {
        return (<Button type="clear" style={{ flexDirection: 'row', alignItems: 'center' }} onPress={QrResultPress}  onLayout={getLayout}>
            <Icon
                name={GetIcon(DecodeQR(data))}
                size={12}
                type='ionicon'
                color='#000'
            />
            <Text style={{ marginLeft: 5,fontSize:12 }}>{GetText(data)}  </Text>
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
            <View style={{ top: height + 10 ,left:ButtonWidth, flex: 1, alignItems: 'center', position: 'absolute', }}>
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
        padding: 3,
        borderRadius: 15,
    }
});