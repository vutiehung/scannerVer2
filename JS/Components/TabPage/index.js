import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { NavigationContainer } from '@react-navigation/native';
import { View, Text,StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed'
import ScannerPage from '../ScannerPage';
import QRCodePage from '../QRCodePage';
import HistoryPage from '../HistoryPage';
import ShareContactTab from '../ShareContact/ShareContactTab'; 
import TabCreateQR from '../QRCodePage/TabCreateQR';  
import ConfigPage from '../ConfigPage'; 
const Tab = createBottomTabNavigator();
function EmptyScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>EmptyScreen!</Text>
      </View>
    );
  }
const TabPage = () => {     
    return (
        <NavigationContainer>
            <Tab.Navigator  initialRouteName="ShareContact" screenOptions ={{tabBarInactiveTintColor: 'gray',  tabBarActiveTintColor: '#5a95ff',}} >
                <Tab.Screen name="QRcode"    component={TabCreateQR} options={{headerShown: false, tabBarIcon: ({focused}) => (<Icon name='qrcode' type='font-awesome' color={focused ? '#5a95ff': 'gray'  } />) }} />
                <Tab.Screen name="History" component={HistoryPage}   options={{headerShown: false, tabBarIcon: ({focused}) => (<Icon name='history' type='font-awesome' color={focused ? '#5a95ff': 'gray'  } />) }} />
                <Tab.Screen name="Scanner" component={ScannerPage} options={{
                    tabBarLabel: "", tabBarIcon: ({focused}) => (
                        <View style={styles.Tab_BigButton }>
                            <Icon name='barcode-outline' style={{ left: 2 }} type='ionicon' size={55} color={focused ? '#fff' :'#bfbbb0'  }    />
                        </View>
                    ),                   
                }} />
                <Tab.Screen name="Share Contact" component={ShareContactTab} options={{ headerShown: false,tabBarIcon: ({ focused}) => (<Icon name='card-outline' type='ionicon' color={focused ? '#5a95ff': 'gray'  }  />) }} />
                <Tab.Screen name="Settings" component={ConfigPage} options={{ tabBarIcon: ({ focused }) => (<Icon name='cog' type='ionicon' color={focused ?'#5a95ff': 'gray'  }  />) }} />
            </Tab.Navigator>
        </NavigationContainer>
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
        backgroundColor: '#5a95ff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 9,
    }, container: {
        flex: 1,
      }
  });