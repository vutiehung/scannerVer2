import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Input, Icon, Button, CheckBox } from '@rneui/themed';
import GlobalCSS from '../../CSS/GlobalCSS';
import { UWifi } from '../../Utility/UWifi';
//#region WIFI Input
const WIFIInputForm = ({ navigation, onSave }) => {
    const [SSID, setSSID] = useState('');
    const [Password, setPassword] = useState('');
    const [selectedIndex, setIndex] = useState(0);
    const handleSubmit = () => {
        // Xử lý dữ liệu và lưu vào hệ thống hoặc gửi lên máy chủ
        var Encryption = "WPA"
        if (selectedIndex == 1) Encryption = "WEP"
        if (selectedIndex == 2) Encryption = "nopass"
        var wifiData = UWifi.CreatedataQRData(SSID, Password, Encryption);
        onSave(wifiData)
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
                    leftIcon={<Icon name="wifi" type="font-awesome" iconStyle={styles.iconintext} />}
                    value={SSID}
                    onChangeText={setSSID}
                />
                <Input
                    placeholder="Password"
                    leftIcon={<Icon name="lock" type="font-awesome" iconStyle={styles.iconintext} />}
                    value={Password} secureTextEntry={true}
                    onChangeText={setPassword}
                />

                <View style={{ flexDirection: 'row' }}>

                    <CheckBox containerStyle={{ padding: 5 }}
                        checked={selectedIndex === 0}
                        title="WPA/WPA2"
                        onPress={() => setIndex(0)}
                        checkedColor={GlobalCSS.Main_Color}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"

                    />
                    <CheckBox containerStyle={{ padding: 5 }}
                        checked={selectedIndex === 1}
                        onPress={() => setIndex(1)}
                        title="WEP"
                        checkedColor={GlobalCSS.Main_Color}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                    <CheckBox containerStyle={{ padding: 5 }}
                        checked={selectedIndex === 2}
                        onPress={() => setIndex(2)}
                        title="None"
                        checkedColor={GlobalCSS.Main_Color}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                </View>
                <View style={{ flex: 1 }}>
                    
                        <Button
                            title="Create QRCode"
                            onPress={handleSubmit}
                            buttonStyle={styles.button}
                            containerStyle={styles.submitButton}
                        />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}
//#endregion
export default WIFIInputForm;

const styles = StyleSheet.create({
    borderinput: {
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#ffffff',
        borderColor: "#f1f1f4",
        marginBottom: 10,
    },
    button: {
        backgroundColor: GlobalCSS.Main_Color
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
    }
}
)