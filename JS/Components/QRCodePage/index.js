import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Icon } from '@rneui/themed';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import { Text } from '@rneui/base';
import { GetText, GetTextToHistory } from '../../Utility';
import GlobalCSS from '../../CSS/GlobalCSS';
const QRCodePage = ({ route, navigation }) => {
  const [value, setValue] = useState("ádfadsf");
  const viewShotRef = useRef();
  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count

    navigation.setOptions({
      headerRight: RightButton
    });
  }, [navigation]);

  const RightButton = () => {
    return (<Icon
      name="share-outline"
      onPress={onShare}
      type='ionicon' size={30}
      color={GlobalCSS.Icon_Color}
    />)
  }
  const onShare = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      await Share.open({ url: uri });
    } catch (error) {
      console.error(error.message);
    }
  };
  React.useEffect(() => {
    if (route.params?.data) {
      setValue(route.params?.data.toString())
    }
  }, [route.params?.data]);

  return (
    <View style={styles.container}>
      <View style={{ borderColor: "#000000", borderWidth: 10, borderRadius:6}}>
        <ViewShot ref={viewShotRef} options={{ format: 'png' }} style={{ height: 300, width: 300 }}>
          <QRCode style={styles.container} size={300}
            value={value} />
        </ViewShot>
      </View>
      <Text style={{ paddingTop: 10 }}>{GetTextToHistory(value)}</Text>
    </View>
  );
};


export default QRCodePage;
const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',

  },
});