import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Input, Icon, Button, CheckBox } from '@rneui/themed';
import { UContact } from '../../Utility/UContact';
import GlobalCSS from '../../CSS/GlobalCSS';
//#region VcardInput
const VCardInput = ({ navigation, onSave }) => {
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
        onSave(vcard)
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
                        leftIcon={<Icon name="user" type="font-awesome" iconStyle={styles.iconintext} />}
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
                leftIcon={<Icon name="envelope" type="font-awesome" iconStyle={styles.iconintext} />}
                value={email}
                onChangeText={setEmail}
            />
            <Input
                placeholder="PhoneNumber"
                leftIcon={<Icon name="phone" type="font-awesome" iconStyle={styles.iconintext} />}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="number-pad"
            />
            <Input
                placeholder="Address"
                leftIcon={<Icon name="map-marker" type="font-awesome" iconStyle={styles.iconintext} />}
                value={address}
                onChangeText={setAddress}
            />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '60%' }}>
                    <Input
                        placeholder="Organization"
                        leftIcon={<Icon name="building" type="font-awesome" iconStyle={styles.iconintext} />}
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
                        buttonStyle={styles.button}
                        containerStyle={styles.submitButton}
                    /></View>
                <View style={{ width: '65%' }}>
                    <Button
                        title="Create QRCode"
                        onPress={handleSubmit}
                        buttonStyle={styles.button}
                        containerStyle={styles.submitButton}
                    /></View>
            </View>


        </KeyboardAvoidingView>
    </View>
    )
}

export default VCardInput;

const styles = StyleSheet.create( {
    borderinput: {
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#ffffff',
        borderColor: "#f1f1f4",
        marginBottom: 10,
    },
    button:{backgroundColor:GlobalCSS.Main_Color
    },
//#region Vcard Style
    submitButton: {
        margin: 20,
        borderRadius: 10,
    },
    iconintext: {
      
        color: GlobalCSS.Main_Color,
        fontSize: 20,
        width: 20,
    }}
)