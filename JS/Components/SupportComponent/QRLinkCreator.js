import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Input, Icon, Button, CheckBox } from '@rneui/themed';
import GlobalCSS from '../../CSS/GlobalCSS';
//#region URLFromInput

const URLFromInput = ({ navigation, onSave }) => {
    const [url, setUrl] = useState('https://');

    const handleUrlChange = text => {
        setUrl(text);
    };
    const handleSubmit = () => {
        // do something with the URL, e.g. navigate to it
        onSave(url)
        navigation.navigate('QRCode2', { data: url });

    };
    return (
        <View style={{ ...styles.borderinput, flexDirection: 'column' }}>

            <View style={styles.inputContainer}>
                <Input
                    label="URL"
                    labelStyle={{ fontWeight: "normal" }}
                    style={styles.input}
                    placeholder="Enter URL here"
                    onChangeText={handleUrlChange}
                    value={url}
                />
            </View>
            <View style={{ flex:1 }}>                
                <View>
                    <Button
                        title="Create QRCode"
                        onPress={handleSubmit}
                        buttonStyle={styles.button}
                        containerStyle={styles.submitButton}
                    /></View>
            </View>            

        </View>
    )
}
//#endregion
export default URLFromInput;

const styles = StyleSheet.create({
    borderinput: {
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#ffffff',
        borderColor: GlobalCSS.Input_border_background,
        marginBottom: 10,
    },
    button:{backgroundColor:GlobalCSS.Main_Color
    },
//#region Vcard Style
    submitButton: {
        margin: 20,
        borderRadius: 10,
    },
    button: {
        backgroundColor: GlobalCSS.Main_Color
    },

    inputContainer: {
        flex: 3,
    },
    input: {
        fontSize: 16,
    },
    viewButton: {
        flex: 1,
        margin: 10
    },

}
)