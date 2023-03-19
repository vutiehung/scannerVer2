import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,SafeAreaView  } from 'react-native'
import { GlobalProvider } from './GlobalContext'; 
import LoadingScreen from './Components/LoadingPage';
import TabPage from './Components/TabPage';
const Main = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Call your API or any other async function here
      // Once the data is loaded, set isLoading to false
      setIsLoading(false);
    }, []);
  
    return (
      <GlobalProvider>
      <SafeAreaView style={styles.container}>
      
        {isLoading ? (
          <LoadingScreen/>
        ) : <TabPage/>}
      
      </SafeAreaView>
      </GlobalProvider>
    );
}

export default Main;

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });
  