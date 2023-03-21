import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Icon } from '@rneui/themed';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
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
      color="#000"
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
    <ViewShot ref={viewShotRef} options={{ format: 'png' }}>
      <QRCode style={styles.container} size={300}
        value={value} />
    </ViewShot>

  );
};


export default QRCodePage;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});