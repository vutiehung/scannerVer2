import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Input, Icon, Button, CheckBox } from '@rneui/themed';
import { GlobalContext } from '../../GlobalContext';
import { Picker } from '@react-native-picker/picker';

import { UEvent } from '../../Utility/UEvent';
import DatePicker from 'react-native-date-picker'
import VCardInput from '../SupportComponent/QRCardCreator';
import GlobalCSS from '../../CSS/GlobalCSS';
import URLFromInput from '../SupportComponent/QRLinkCreator';
import WIFIInputForm from '../SupportComponent/QRWifiCreator';
import EventInputForm from '../SupportComponent/QREventCreator';


const CreateQR = ({ navigation }) => {
    const { config, saveData, data_his
    } = useContext(GlobalContext);
    const [QRtype, setQrtype] = useState('EVENT');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'VCard', value: 'VCard' },
        { label: 'Link', value: 'Link' },
        { label: 'WIFI', value: 'WIFI' },
        { label: 'EVENT', value: 'EVENT' }
    ]);
    const SaveData = (value) => {
        var x = [{ 'data': value }, ...data_his]
        if (config.saveCreate)
            saveData(x)
    }
    return (
        <View style={styles.container}>
            <View style={styles.content} >
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={styles.borderinput}>
                            <Picker
                                prompt="Select QRCode type"
                                selectedValue={QRtype}
                                onValueChange={(itemValue, itemIndex) =>
                                    setQrtype(itemValue)
                                }>
                                <Picker.Item label="VCard" value="VCard" />
                                <Picker.Item label="Link" value="Link" />
                                <Picker.Item label="WIFI" value="WIFI" />
                                <Picker.Item label="EVENT" value="EVENT" />
                            </Picker>
                        </View>
                        {QRtype === "Link" && <URLFromInput navigation={navigation} onSave={SaveData}></URLFromInput>}
                        {QRtype === "VCard" && <VCardInput navigation={navigation} onSave={SaveData}></VCardInput>}
                        {QRtype === "WIFI" && <WIFIInputForm navigation={navigation} onSave={SaveData}></WIFIInputForm>}
                        {QRtype === "EVENT" && <EventInputForm navigation={navigation} onSave={SaveData}></EventInputForm>}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

export default CreateQR;

const styles = StyleSheet.create({
    container: {
        flex: 1, verticalAlign: "top", backgroundColor: GlobalCSS.Component_Background, alignItems: 'center',
        padding: 10
    },
    content: {
        flex: 1,
        width: '100%',
        padding: 5,
    }
    , keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    borderinput: {
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#ffffff',
        borderColor: GlobalCSS.Input_border_background,
        marginBottom: 10,
    }
    ,
    //#region url style
    URLFromInput: {
        inputContainer: {
            flex: 3,
        },
        input: {
            fontSize: 16,
        },
        viewButton: {
            flex: 1,
            margin:10
        },
    },
    //#endregion 
  
    //#endregion
    //#region wifi
    WIFIInputForm: {
        iconintext: {
            color: "#5e73e5",
            fontSize: 18,
            width: 20,
        }
    }
    ,
    //#endregion  
    //#region  Event
    EventInputForm: {
        submitButton: {
            flexDirection: 'row',
            borderBottomColor: "#9fa5aa",
            borderBottomWidth: 1,
            marginBottom: 20,
            marginLeft: 10,
            marginRight: 10,
            paddingBottom: 25,
            justifyContent:"space-between"
        },
        labelTimePicker:{
            fontSize: 18
        },
        labelTimePickerValue:{
            fontSize: 18,
            color:"#000"
        },
        buttonSumitView:{margin:10}
    }
    ,
    //#endregion
    button: {

        backgroundColor: '#0080ff',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,

    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
