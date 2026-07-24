import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
NodeCard
import{
StyleSheet,
Text,
View,
SafeAreaView,
TextInput,
TouchableOpacity,
StatusBar,
FlatList
}from 'react-native'

import { Plus, Search, Notebook } from 'lucide-react-native';
import NoteCard from './components/NoteCard';


export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0F12" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.appTitleContainer}>
          <Notebook size={24} color="#1E90FF" style={styles.titleIcon}/>
          <Text style={styles.titleText}>QuickNotes</Text>
        </View>
        <Text style={styles.subtitleText}>Capture ideas instantly</Text>
      </View>

      {/* Search Bar Section  */}
       <View style={styles.searchBar}>
        <Search size={18} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes..."
          placeholderTextColor="#8E8E93"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
         <NoteCard
           note={item}
           onDelete={(id) => alert(`Delete note ${id}`)}
           onPress={() => alert(`Clicked note: ${item.title}`)}
       />
      )}
      contentContainerStyle={styles.listContent}
      />

      {/* Floating Action Button  */}
      <TouchableOpacity
      style={styles.fab}
      activeOpacity={0.8}
      onPress={() => alert('Add Note Clicked!')}
      >
        <Plus size={28} color='#FFFFFF' />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F12', // Premium deep dark theme
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  appTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  titleIcon: {
    marginRight: 8,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: '#8E8E93',
    fontSize: 13,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 44,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    height: '100%',
  },
  placeholderContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  placeholderText: {
    color: '#8E8E93',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 25,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1E90FF', // Accent blue color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#1E90FF',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
    listContent: {
    paddingHorizontal: 20,
    paddingBottom: 80, // Extra padding at bottom so cards don't hide behind the FAB button
  },

});
