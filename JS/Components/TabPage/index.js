import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed'
import ScannerPage from '../ScannerPage';
import QRCodePage from '../QRCodePage';
import HistoryPage from '../HistoryPage';
import ShareContactTab from '../ShareContact/ShareContactTab';
import TabCreateQR from '../QRCodePage/TabCreateQR';
import ConfigPage from '../ConfigPage';
import GlobalCSS from '../../CSS/GlobalCSS';
import GlobalValue from '../../Assets/GlobalValue';
const Tab = createBottomTabNavigator();
import { AdmobBanner,InterstitialView } from 'rnadmob';
function EmptyScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>EmptyScreen!</Text>
        </View>
    );
}
const TabPage = () => {
    return (<>
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Scanner" screenOptions={{ tabBarInactiveTintColor: 'gray', tabBarActiveTintColor: GlobalCSS.Main_Color, }} >
                <Tab.Screen name="QRcode" component={TabCreateQR} options={{ headerShown: false, tabBarIcon: ({ focused }) => (<Icon name='qrcode' type='font-awesome' color={focused ? GlobalCSS.Main_Color : 'gray'} />) }} />
                <Tab.Screen name="History" component={HistoryPage} options={{ headerShown: false, tabBarIcon: ({ focused }) => (<Icon name='history' type='font-awesome' color={focused ? GlobalCSS.Main_Color : 'gray'} />) }} />

                <Tab.Screen name="Scanner" component={ScannerPage} options={{
                    headerTintColor: GlobalCSS.Icon_Color,
                    headerStyle: {
                        backgroundColor: GlobalCSS.Main_Color,
                    },
                    tabBarLabel: "", tabBarIcon: ({ focused }) => (
                        <View style={styles.Tab_BigButton}>
                            <Icon name='barcode-outline' style={{ left: 2 }} type='ionicon' size={55} color={focused ? '#fff' : '#fff'} />
                        </View>
                    ),
                }} />
                <Tab.Screen name="Share Contact" component={ShareContactTab} options={{ headerShown: false, tabBarIcon: ({ focused }) => (<Icon name='card-outline' type='ionicon' color={focused ? GlobalCSS.Main_Color : 'gray'} />) }} />
                <Tab.Screen name="Settings" component={ConfigPage} options={{
                    headerTintColor: GlobalCSS.Icon_Color,
                    headerStyle: {
                        backgroundColor: GlobalCSS.Main_Color,
                    }, tabBarIcon: ({ focused }) => (<Icon name='cog' type='ionicon' color={focused ? GlobalCSS.Main_Color : 'gray'} />)
                }} />
            </Tab.Navigator>
        </NavigationContainer>
        <AdmobBanner adUnitID={GlobalValue.admob_banner_footer_UID}  onAdLoaded={(event)=>{console.log(event.Status)}} height={50}  size={"FULL_BANNER"}  onAdFailedToLoad={(event)=>{console.log(event.messenge)}}></AdmobBanner>
        </>
    );
}
export default TabPage;
const styles = StyleSheet.create({

    Tab_BigButton: {
        position: 'absolute',
        bottom: -10, // space from bottombar
        height: 65,
        width: 65,
        borderRadius: 50,
        backgroundColor: GlobalCSS.Main_Color,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 3,
    }, container: {
        flex: 1,
    }
});