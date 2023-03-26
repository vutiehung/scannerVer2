import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Input, Icon, Button, CheckBox } from '@rneui/themed';

import { Picker } from '@react-native-picker/picker';
import { UContact } from '../../Utility/UContact';
import { UWifi } from '../../Utility/UWifi';
import { UEvent } from '../../Utility/UEvent';
import DatePicker from 'react-native-date-picker'
//#region URLFromInput

const URLFromInput = ({ navigation }) => {
    const [url, setUrl] = useState('https://');

    const handleUrlChange = text => {
        setUrl(text);
    };
    const handleSubmit = () => {
        // do something with the URL, e.g. navigate to it

        navigation.navigate('QRCode2', { data: url });

    };
    return (
        <View style={{ ...styles.borderinput, flexDirection: 'row' }}>

            <View style={styles.URLFromInput.inputContainer}>
                <Input
                    label="URL"
                    labelStyle={{ fontWeight: "normal" }}
                    style={styles.URLFromInput.input}
                    placeholder="Enter URL here"
                    onChangeText={handleUrlChange}
                    value={url}
                />
            </View>
            <View style={styles.URLFromInput.viewButton} >
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Create QRCode</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
//#endregion

//#region VcardInput
const VCardInput = ({ navigation }) => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [organization, setOrganization] = useState('');

    const handleSubmit = () => {
        // Xử lý dữ liệu và lưu vào hệ thống hoặc gửi lên máy chủ
        var vcard = UContact.createVcard(firstname, lastname,
            email,
            phoneNumber,
            address,
            jobTitle,
            organization,)
        navigation.navigate('QRCode2', { data: vcard });
    };
    const onReset = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhoneNumber("")
        setAddress("")
        setJobTitle("")
        setOrganization("")
    }
    return (<View style={{ ...styles.borderinput, flexDirection: 'row', }}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}>

            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%' }}>
                    <Input
                        placeholder="First name"
                        leftIcon={<Icon name="user" type="font-awesome" iconStyle={styles.VcardFromInput.iconintext} />}
                        value={firstname}
                        onChangeText={setFirstName}
                    /></View>
                <View style={{ width: '50%' }}>
                    <Input
                        placeholder="Last name"

                        value={lastname}
                        onChangeText={setLastName}
                    /></View>
            </View>
            <Input
                placeholder="Email"
                leftIcon={<Icon name="envelope" type="font-awesome" iconStyle={styles.VcardFromInput.iconintext} />}
                value={email}
                onChangeText={setEmail}
            />
            <Input
                placeholder="PhoneNumber"
                leftIcon={<Icon name="phone" type="font-awesome" iconStyle={styles.VcardFromInput.iconintext} />}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="number-pad"
            />
            <Input
                placeholder="Address"
                leftIcon={<Icon name="map-marker" type="font-awesome" iconStyle={styles.VcardFromInput.iconintext} />}
                value={address}
                onChangeText={setAddress}
            />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '60%' }}>
                    <Input
                        placeholder="Organization"
                        leftIcon={<Icon name="building" type="font-awesome" iconStyle={styles.VcardFromInput.iconintext} />}
                        value={organization}
                        onChangeText={setOrganization}
                    /></View>
                <View style={{ width: '40%' }}>
                    <Input
                        placeholder="Title"
                        value={jobTitle}
                        onChangeText={setJobTitle}
                    /></View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '35%' }}>
                    <Button
                        title="Reset"
                        onPress={onReset}
                        containerStyle={styles.VcardFromInput.submitButton}
                    /></View>
                <View style={{ width: '65%' }}>
                    <Button
                        title="Create QRCode"
                        onPress={handleSubmit}
                        containerStyle={styles.VcardFromInput.submitButton}
                    /></View>
            </View>


        </KeyboardAvoidingView>
    </View>
    )
}

//#endregion
//#region WIFI Input
const WIFIInputForm = ({ navigation }) => {
    const [SSID, setSSID] = useState('');
    const [Password, setPassword] = useState('');
    const [selectedIndex, setIndex] = useState(0);
    const handleSubmit = () => {
        // Xử lý dữ liệu và lưu vào hệ thống hoặc gửi lên máy chủ
        var Encryption = "WPA"
        if (selectedIndex == 1) Encryption = "WEP"
        if (selectedIndex == 2) Encryption = "nopass"
        var wifiData = UWifi.CreatedataQRData(SSID, Password, Encryption);
        navigation.navigate('QRCode2', { data: wifiData });
        // navigation.navigate('QRCode2', );
    };
    return (
        <View style={{ ...styles.borderinput, flexDirection: 'row', }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}>
                <Input
                    placeholder="SSID"
                    leftIcon={<Icon name="wifi" type="font-awesome" iconStyle={styles.WIFIInputForm.iconintext} />}
                    value={SSID}
                    onChangeText={setSSID}
                />
                <Input
                    placeholder="Password"
                    leftIcon={<Icon name="lock" type="font-awesome" iconStyle={styles.WIFIInputForm.iconintext} />}
                    value={Password} secureTextEntry={true}
                    onChangeText={setPassword}
                />

                <View style={{ flexDirection: 'row' }}>

                    <CheckBox
                        checked={selectedIndex === 0}
                        title="WPA/WPA2"
                        onPress={() => setIndex(0)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                    <CheckBox
                        checked={selectedIndex === 1}
                        onPress={() => setIndex(1)}
                        title="WEP"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                    <CheckBox
                        checked={selectedIndex === 2}
                        onPress={() => setIndex(2)}
                        title="None"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                </View>
                <Button
                    title="Create QR"
                    onPress={handleSubmit}
                    containerStyle={styles.VcardFromInput.submitButton}
                />


            </KeyboardAvoidingView>
        </View>
    )
}
//#endregion
//#region Event Input
const EventInputForm = ({ navigation }) => {
    //#region khai báo biên
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    //#endregion
    //#region các funtion


    const handleSubmit = () => {
        // Xử lý dữ liệu và lưu vào hệ thống hoặc gửi lên máy chủ
        var data = UEvent.CreatedataQRData(
            eventName,
            description,
            startDate,
            endDate,
            location,
        );
        navigation.navigate('QRCode2', { data: data });
    };
    //#endregion

    return (<View style={{ ...styles.borderinput, flexDirection: 'row', }}>
        <View style={{ width: "100%" }}>
            <KeyboardAvoidingView>

                <Input
                    placeholder="Event name"
                    value={eventName}
                    leftIcon={<Icon name="calendar" type="font-awesome" iconStyle={styles.WIFIInputForm.iconintext} />}
                    onChangeText={setEventName}
                />
                <Input
                    placeholder="Description"
                    value={description}
                    leftIcon={<Icon name="file" type="font-awesome" iconStyle={styles.WIFIInputForm.iconintext} />}
                    onChangeText={setDescription}
                />
                <View style={{ textAlign: "left", flexDirection: 'column', width: "100%", }}>
                    <Button type="clear"
                        title={`Start: ${startDate.toLocaleString()}`}
                        onPress={() => setShowStartDatePicker(true)}
                        containerStyle={styles.EventInputForm.submitButton}
                    />

                    <DatePicker modal open={showStartDatePicker}
                        onConfirm={(date) => {
                            setShowStartDatePicker(false)
                            setStartDate(date)
                        }}
                        onCancel={() => {
                            setShowStartDatePicker(false)
                        }}
                        date={startDate} onDateChange={setStartDate} />
                    <Button type="clear"
                        title={`End: ${endDate.toLocaleString()}`}
                        onPress={() => {
                            setShowEndDatePicker(true)
                            console.log("setShowEndDatePicker", showEndDatePicker)
                        }}
                        containerStyle={styles.EventInputForm.submitButton}
                    />

                    <DatePicker modal open={showEndDatePicker}
                        onConfirm={(date) => {
                            setShowEndDatePicker(false)
                            setEndDate(date)
                        }}
                        onCancel={() => {
                            setShowEndDatePicker(false)
                        }}
                        date={endDate} onDateChange={setEndDate} />
                </View>
                <Input
                    placeholder="Address"
                    leftIcon={<Icon name="map-marker" type="font-awesome" iconStyle={styles.WIFIInputForm.iconintext} />}
                    value={location}
                    onChangeText={setLocation}
                />
                <Button
                    title="Create QRCode"
                    onPress={handleSubmit}
                    containerStyle={styles.submitButton}
                />

            </KeyboardAvoidingView>
        </View>
    </View>)
}
//#endregion

const CreateQR = ({ navigation }) => {

    const [QRtype, setQrtype] = useState('VCard');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'VCard', value: 'VCard' },
        { label: 'Link', value: 'Link' },
        { label: 'WIFI', value: 'WIFI' },
        { label: 'EVENT', value: 'EVENT' }
    ]);
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
                        {QRtype==="Link"&&<URLFromInput navigation={navigation}></URLFromInput>}
                        {QRtype==="VCard"&&<VCardInput navigation={navigation}></VCardInput>}
                        {QRtype==="WIFI"&&<WIFIInputForm navigation={navigation}></WIFIInputForm>}
                        {QRtype==="EVENT"&&<EventInputForm navigation={navigation}></EventInputForm>}
                    </ScrollView>
                </View>


            </View>

        </View>
    );
}

export default CreateQR;

const styles = StyleSheet.create({
    container: {
        flex: 1, verticalAlign: "top", backgroundColor: '#F4F5F7', alignItems: 'center',
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
        borderColor: "#d9dde3",
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
            justifyContent: 'center', alignItems: 'center',
            alignItems: 'center',
            verticalAlign: 'center'
        },
    },
    //#endregion 
    //#region Vcard Style
    VcardFromInput: {
        submitButton: {
            margin: 20,
        },
        iconintext: {
            color: "#5e73e5",
            fontSize: 20,
            width: 20,
        }
    },
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
            margin: 10,
            textAlign: 'left',

        },
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
