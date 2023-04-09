import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { ScrollView, FlatList, StyleSheet, Text, View, Button } from 'react-native';
import { Switch } from '@rneui/themed';
import GlobalCSS from '../../CSS/GlobalCSS';
const ConfigPage = () => {
    const {
        config, saveConfig
    } = useContext(GlobalContext);
    return (
        <View style={styles.container} >
            <View  style={styles.Content} >                
            <Text style={styles.text_Content}>Scanning history </Text>
            <Switch
                    color={GlobalCSS.Main_Color}
                    value={config.saveScan}
                    onValueChange={(value) => saveConfig({ ...config, 'saveScan': value })}
                />
                
            </View>
            <View style={styles.Content_description}>
                <Text>Save history of your scans</Text>
            </View>
            <View  style={styles.Content}>
            <Text style={styles.text_Content}>QRcode history</Text>
                <Switch
                 color={GlobalCSS.Main_Color}
                    value={config.saveCreate}
                    onValueChange={(value) => saveConfig({ ...config, 'saveCreate': value })}
                />
                
            </View>
            <View style={styles.Content_description}>
                <Text>Save history of your creating QRcode</Text>
            </View>
        </View>

    );
}

export default ConfigPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:30
    },
    Content:
    {
        
        flexDirection: 'row',
        backgroundColor:"#fff",
        padding:20,
        borderBottomColor:"#e9e8ea",
        borderBottomWidth:1,
        borderTopColor:"#e9e8ea",
        borderTopWidth:1,
        marginTop:10,
        justifyContent:"space-between"
        
    },
    text_Content:
    {
        color:"#000000",
        fontSize:15,
    }
    ,
    Content_description:
    {
        color:"#86858a",
        marginBottom:20,
        marginTop:5,
        paddingLeft:20,
        
        
    }
    }
    )
