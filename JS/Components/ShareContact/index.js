import React, { useState } from 'react';

import { PermissionsAndroid, StyleSheet, View, SectionList, Text, TouchableOpacity, VirtualizedList } from 'react-native';
import Contacts from 'react-native-contacts';
import { SearchBar, Button } from '@rneui/themed';
import { UContact } from '../../Utility/UContact';
const ShareContact = ({ navigation }) => {
  const [search, setsearch] = useState("");
  const [lstcontacts, setlstcontacts] = useState([]);
  const [isfilter, setisfilter] = useState(false)
  const [lstcontactsfilter, setlstcontactsfilter] = useState([]);
  const [AllContacts,setAllContact]= useState([]);
  const renderContactItem = ({ item }) => {
    return ((
      <TouchableOpacity style={styles.item} onPress={() => CreateQRCode(item)}>
        <Text>{item.displayName}</Text>
      </TouchableOpacity>
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
         contact.givenName.charAt(0).toUpperCase().indexOf("A")>=0
     ))
    }

  };
  const getItemCount = () => {
    return 100;
  };

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
          getItemCount={getItemCount}
          keyExtractor={(item, index) => item.id}
        />
          : <SectionList
            sections={lstcontacts}
            renderItem={renderContactItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item, index) => index.toString()}
          />
      }

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