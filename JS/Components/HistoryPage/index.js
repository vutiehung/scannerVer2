import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, FlatList, StyleSheet, Text, View,Button } from 'react-native';
import { GlobalContext } from '../../GlobalContext';
import { ListItem, Avatar,Icon } from '@rneui/themed';
import { DecodeQR, GetIcon, GetText, GetTextToHistory } from '../../Utility'
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import QRCodePage from '../QRCodePage/index';
const HistoryPage = ({ navigaton }) => {
    const {
        data_his
    } = useContext(GlobalContext);
    const [scanValue, set_scanValue] = useState([]);
    const Item = ({ title, navigation }) => {
        return (
            <ListItem bottomDivider onPress={() => {
                navigation.navigate('QRCode', { data: title });
            }}>
             <View style={styles.Icon }>
                            <Icon name={GetIcon(DecodeQR(title))}  type='ionicon' size={20} color={ '#fff' }    />
                        </View>               
                <ListItem.Content>
                    <ListItem.Subtitle>{GetTextToHistory(title)}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    };
    const Historylist = ({ navigation }) => { 
        
        return (
            <FlatList
                data={data_his}
                renderItem={({ item }) => <Item title={item.data} navigation={navigation} />}
                keyExtractor={
                    (item, index) => (index)

                } />
        );
    }

    const RightButton=()=>{
        return( <Icon
            name="share-outline"
            type='ionicon' size={30} 
            color="#000"
          />)
    }

    const Stack = createNativeStackNavigator();
    return (
       
            <Stack.Navigator>
                <Stack.Screen name="History" component={Historylist} />
                <Stack.Screen name="QRCode" options={{headerRight:RightButton}} component={QRCodePage} />
            </Stack.Navigator>

    );
}
const styles = StyleSheet.create({

    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    Icon:{
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c2c2c2'
    }
});

export default HistoryPage;
