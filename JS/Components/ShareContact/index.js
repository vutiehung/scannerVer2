import React, { useState } from 'react';

import { PermissionsAndroid, StyleSheet, View, SectionList, Text, ActivityIndicator, VirtualizedList } from 'react-native';
import Contacts from 'react-native-contacts';
import { SearchBar, ListItem } from '@rneui/themed';
import { UContact } from '../../Utility/UContact';
const ShareContact = ({ navigation }) => {
  const [search, setsearch] = useState("");
  const [lstcontacts, setlstcontacts] = useState([]);
  const [isfilter, setisfilter] = useState(false)
  const [lstcontactsfilter, setlstcontactsfilter] = useState([]);
  const [AllContacts,setAllContact]= useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const renderContactItem = ({ item }) => {
    return ((

        <ListItem bottomDivider onPress={() => CreateQRCode(item)}>               
            <ListItem.Content>
                <ListItem.Subtitle>{item.displayName}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>

     
    ));
  };

  const renderSectionHeader = ({ section: { title } }) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    );
  };

  const CreateQRCode = (item) => {
    var vcard = UContact.createVcard(
      item.givenName,
      item.familyName,
      item.emailAddresses,
      item.phoneNumbers[0].number,
      '',
      '',
      item.company,)
    navigation.navigate('QRCode21', { data: vcard });
  }

  const addContactList = (Contacts) => {
    var Value = []
    if (Contacts.length > 0) {
      var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      for (var i = 0; i < alphabet.length; i++) {
        var letter = alphabet[i]
        var lstContact = Contacts.filter(contact =>
          contact.givenName.charAt(0).toUpperCase() == letter
        )
        Value.push({ 'title': letter, 'data': lstContact })
      }
    }
    return Value
  }
  React.useEffect(() => {
    checkContact = async () => {
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
            setlstcontacts(addContactList(contacts))
            setAllContact(contacts)
            setIsLoading(false)
          })

        } else {
          console.log("Contacts permission denied");
        }
      } catch (err) {
        console.log(err);
      }
    }
    checkContact()
  }, []);
  const updateSearch = (value) => {
    if (value == "") {
      setisfilter(false)
    }
    else {
      setisfilter(true)
      setlstcontactsfilter(
        AllContacts.filter(contact =>
            contact.displayName.toLowerCase().includes(value.toLowerCase())
     ))
     
    }
    setsearch(value)
  };
 
  const renderItem = ({ item }) => (
    <View>
      <Text>{item.displayName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar lightTheme={true}
        
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        
      />
      {
        isfilter ? <VirtualizedList
        data={lstcontactsfilter}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.recordID}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
      />
          : 
          (isLoading?<ActivityIndicator size="large" color="#0000ff" />:
          <SectionList
            sections={lstcontacts}
            renderItem={renderContactItem}
            renderSectionHeader={renderSectionHeader}
            scrollIndicatorInsets={{ right: 1 }}
            keyExtractor={(item, index) => index.toString()}
          />)
      }

    </View>

  );
}

export default ShareContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
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