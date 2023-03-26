import React,{useState} from 'react';

import { PermissionsAndroid,StyleSheet,View,SectionList,Text } from 'react-native';
import Contacts from 'react-native-contacts';
import { SearchBar } from '@rneui/themed';
const contacts = [
    { title: 'A', data: ['Alice', 'Anna'] },
    { title: 'B', data: ['Bob', 'Bill'] },
    { title: 'C', data: ['Charlie', 'Cindy', 'Claire'] },
  ];
  

const ContactItem = ({ name }) => {
    return (
      <View style={styles.item}>
        <Text>{name}</Text>
      </View>
    );
  };
  
  const renderContactItem = ({ item }) => {
    return <ContactItem name={item} />;
  };
  
  const renderSectionHeader = ({ section: { title } }) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    );
  };
  
const ShareContact = () => {
    const [search, setSearch] = useState("");
    checkContact= async()=>{
        try {
            const andoidContactPermission = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
              {
                title: "Contacts Permission",
                message:
                  "This app would like to view your contacts.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
            );
            if (andoidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
              console.log("Contacts Permission granted");
              Contacts.getAll().then(contacts => {
                contacts.forEach(contact => {
                  console.log(contact)
                  console.log(contact.givenName)
                  console.log(contact.phoneNumbers)
                })
              })
            } else {
              console.log("Contacts permission denied");
            }
          } catch (err) {
            console.log(err);
     }
    }
    checkContact()
    const updateSearch = (search) => {
        setSearch(search);
      };
      
    return (
        <View style={styles.container}>
         <SearchBar lightTheme={true}
      placeholder="Type Here..."
      onChangeText={updateSearch}
      value={search}
    />
        <SectionList
          sections={contacts}
          renderItem={renderContactItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

    );
}

export default ShareContact;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
    },
    header: {
      backgroundColor: '#f9c2ff',
      padding: 10,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });