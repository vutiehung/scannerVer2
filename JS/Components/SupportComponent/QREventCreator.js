import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Input, Icon, Button, CheckBox } from '@rneui/themed';
import { UEvent } from '../../Utility/UEvent';
import DatePicker from 'react-native-date-picker'
import GlobalCSS from '../../CSS/GlobalCSS';
//#region Event Input
const EventInputForm = ({ navigation, onSave }) => {
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
        onSave(data)
        navigation.navigate('QRCode2', { data: data });
    };
    //#endregion

    return (<View style={{ ...styles.borderinput, flexDirection: 'row', }}>
        <View style={{ width: "100%" }}>
            <KeyboardAvoidingView>

                <Input
                    placeholder="Event name"
                    value={eventName}
                    leftIcon={<Icon name="calendar" type="font-awesome" iconStyle={styles.iconintext} />}
                    onChangeText={setEventName}
                />
                <Input
                    placeholder="Description"
                    value={description}
                    leftIcon={<Icon name="file" type="font-awesome" iconStyle={styles.iconintext} />}
                    onChangeText={setDescription}
                />
                <Input
                    placeholder="Address"
                    leftIcon={<Icon name="map-marker" type="font-awesome" iconStyle={styles.iconintext} />}
                    value={location}
                    onChangeText={setLocation}
                />
                <View style={{ textAlign: "left", flexDirection: 'column', width: "100%", }}>
                    <View style={styles.input_datetime} >
                        <Text style={styles.labelTimePicker}><Icon name="clock-o" type="font-awesome" iconStyle={styles.iconintext} />Starts: </Text>
                        <Text style={styles.labelTimePickerValue} onPress={() => setShowStartDatePicker(true)}
                        >{startDate.toLocaleString()}</Text>

                        <DatePicker modal open={showStartDatePicker}
                            onConfirm={(date) => {
                                setShowStartDatePicker(false)
                                setStartDate(date)
                            }}
                            onCancel={() => {
                                setShowStartDatePicker(false)
                            }}
                            date={startDate} onDateChange={setStartDate} />
                    </View>
                    <View style={styles.input_datetime}>
                        <Text style={styles.labelTimePicker}><Icon name="clock-o" type="font-awesome" iconStyle={styles.iconintext} />Ends: </Text>
                        <Text style={styles.labelTimePickerValue} onPress={() => {
                            setShowEndDatePicker(true)
                            console.log("setShowEndDatePicker", showEndDatePicker)
                        }}>{endDate.toLocaleString()}</Text>


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
    </View>)
}
//#endregion
export default EventInputForm;
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
    },
    
    input_datetime: {
        flexDirection: 'row',
        borderBottomColor: "#9fa5aa",
        borderBottomWidth: 1,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 25,
        justifyContent:"space-between",
       
        
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
)