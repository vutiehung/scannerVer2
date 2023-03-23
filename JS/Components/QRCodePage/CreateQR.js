import React,{useState} from 'react';
import { StyleSheet, View, Text,TouchableOpacity,TextInput } from 'react-native';

const URLFromInput = () => {
    const [url, setUrl] = useState('');

    const handleUrlChange = text => {
      setUrl(text);
    };  
    const handleSubmit = () => {
      // do something with the URL, e.g. navigate to it
      console.log(url);
    };
    return (
        <View style={styles.URLcontainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter URL here"
            onChangeText={handleUrlChange}
            value={url}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
}

const CreateQR = () => {
    return (
        <View style={styles.container}>
            <URLFromInput></URLFromInput>
        </View>
    );
}

export default CreateQR;

const styles = StyleSheet.create({
    container: {
        flex: 1,verticalAlign:"top", backgroundColor: '#ff0000',

    },
    URLcontainer: {
        flexDirection:'row'

    },
    inputContainer: {
      backgroundColor: '#ffffff',
      borderRadius: 5,
      marginHorizontal: 20,
      marginVertical: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '70%',
    },
    input: {
      fontSize: 16,
    },
    button: {
      backgroundColor: '#0080ff',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
 