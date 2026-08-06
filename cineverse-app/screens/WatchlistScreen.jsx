import React from "react";
import {StyleSheet, Text, View} from 'react-native';


export default function WatchlistScreen() {
    <View style={styles.container}>
        <Text style={styles.text}> My Watchlist 🍿</Text>
      <Text style={styles.subtext}> Your saved movies live here</Text>
    </View>
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