import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StatusBar
} from 'react-native';
import { Plus, Search, Notebook } from 'lucide-react-native';
import NoteCard from './components/NoteCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddNoteModal from './components/AddNoteModal';

const STORAGE_KEY = '@quick_notes_data';

// 1. Mock notes data
const MOCK_NOTES = [
  {
    id: '1',
    title: 'Weekly Groceries 🛒',
    content: 'Milk, Eggs, Bread, Spinach, Avocado, Chicken, Green tea.',
    color: '#2ED573', // Green
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
  {
    id: '2',
    title: 'App Idea: Fitness RPG 🏋️‍♂️',
    content: 'A gym app where workouts level up your avatar. Earn gold for running, strength points for lifting.',
    color: '#FFA502', // Orange
    createdAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
  },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState(MOCK_NOTES); // Initialize with mock notes

  const [modalVisible, setModalVisible] = useState(false);

  // 1. LOAD NOTES ON STARTUP:

  React.useEffect(() => {
    const loadNotesFromDisk = async() => {
      try {
        const rawJsonString = await AsyncStorage.getItem(STORAGE_KEY)

        if(rawJsonString !== null){
          setNotes(JSON.parse(rawJsonString))
        }
        else{

        }
      } catch (error) {
        Alert.alert('Database Error', 'Failed to load notes from device storage.');
      }
    }

    loadNotesFromDisk();
  })

  // 2. SAVE NOTES HELPER:
  // when we add or delete notes
  const saveNotesToDatabase = async(newNotesList) => {
    try {
      setNotes(newNotesList)

      //convert the JS array to flat text
      const flatTextString = JSON.stringify(newNotesList);

      //now write the text string permanently onto the phones storage chip
      await AsyncStorage.setItem(STORAGE_KEY, flatTextString)
    } catch (error) {
      Alert.alert('Database Error', 'Failed to save notes to device storage.');
    }
  }


  // Delete Note handler
  const handleDeleteNote = (id) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedNotes = notes.filter((note) => note.id !== id);
            saveNotesToDatabase(updatedNotes);
          }
        }
      ]
    );
  };

  // 3. Open Note handler
  const handlePressNote = (note) => {
    Alert.alert('Note Opened', `You opened: "${note.title}"`);
  };

  const handleSaveNote = (noteData) => {
     const newNote = {
      id: Math.random().toString(36).substring(2, 9), // Generates a random 7-character ID
      title: noteData.title,
      content: noteData.content,
      color: noteData.color,
      createdAt: Date.now(), // Unique time in milliseconds
    };

     const updatedNotes = [newNote, ...notes];
    
    // Write the new list permanently to AsyncStorage and RAM state
    saveNotesToDatabase(updatedNotes);
  }


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

      {/* Search Bar Section */}
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

      {/* 4. Notes List */}
      {notes.length === 0 ? (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>No notes yet. Tap the button below to add one!</Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteCard
              note={item}
              onDelete={handleDeleteNote}
              onPress={() => handlePressNote(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
      >
        <Plus size={28} color='#FFFFFF' />
      </TouchableOpacity>

      <AddNoteModal
       visible={modalVisible}
       onClose={() => setModalVisible(false)}
       onSave={handleSaveNote}
      />
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
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 80, // Space so cards don't hide behind the FAB
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
});
