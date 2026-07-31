import React from "react";
import {View, Text, StyleSheet} from 'react-native'

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile Settings 👤</Text>
      <Text style={styles.subtext}>Manage your CineVerse account</Text>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F12',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtext: {
    color: '#8E8E93',
    fontSize: 14,
  },
});