import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
const QRCodePage = () => {

    return (
        <QRCode style={styles.container} size={300}
            value="Just some string value" />
    );
};


export default QRCodePage;

const styles = StyleSheet.create({
    container: {
      flex: 1 
    },
  });