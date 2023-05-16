import React,{useState,useEffect,useContext} from 'react';
import { StyleSheet, Text, View,SafeAreaView  } from 'react-native'
import { GlobalProvider } from './GlobalContext'; 
import LoadingScreen from './Components/LoadingPage';
import TabPage from './Components/TabPage';
import { GlobalContext } from './GlobalContext';
const Main = () => {
    const [isLoading, setIsLoading] = useState(true);
   
  
    return (
      <GlobalProvider>
      <SafeAreaView style={styles.container}>
      
        {isLoading ? (
          <LoadingScreen loadingComplete={(value)=>setIsLoading(value)}/>
        ) : <TabPage/>
        
        
        }
      
      </SafeAreaView>
      </GlobalProvider>
    );
}

export default Main;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    }
  });
  