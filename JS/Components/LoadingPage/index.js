import React, { useState, useEffect,useContext } from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { LinearProgress } from '@rneui/base';
import { GlobalContext } from '../../GlobalContext'; 
const LoadingScreen = ({loadingComplete}) => {
  const [isLoading, setIsLoading] = useState(true);
  const iconpdf = require('../../../assets/images/ic_launcher.png');
  const {Loading} = useContext(GlobalContext);
  useEffect(() => {
    // Call your API or any other async function here
    // Once the data is loaded, set isLoading to false
    // while(Loading)
    // {}
   
      loadingComplete(Loading);
     
   
  }, [Loading]);

  return (
    <View style={styles.container}>
      <View>
        <Image source={iconpdf}></Image>
      </View>
      <LinearProgress style={{ marginVertical: 10,width:250,height:6, position:'absolute',bottom:20 }} color="red"  />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;


