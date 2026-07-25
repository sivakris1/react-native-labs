import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Modal, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView 
} from 'react-native';

import {X} from 'lucide-react-native'

const COLORS =  [
  { label: 'Work', value: '#FF4757' },       // Red
  { label: 'Ideas', value: '#FFA502' },      // Orange
  { label: 'Personal', value: '#2ED573' },   // Green
  { label: 'Reminders', value: '#1E90FF' },  // Blue
];

export default function AddNoteModal({visible, onClose, onSave}) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedColor, setSelectedColor] = useState(COLORS[0].value);

    const handleSave = () => {
        if(!title.trim() && !content.trim()){
            alert('Please Write Something before saving!');
            return;
        }

        onSave({
            title : title.trim(),
            content : content.trim(),
            color : selectedColor
        });

         setTitle('');
         setContent('');
         setSelectedColor(COLORS[0].value);

         onClose();
    }

    return(
        <Modal
          animationType='slide'
          transparent = {true}
          visible = {visible}
          onRequestClose={onClose}
        >

        <KeyboardAvoidingView 
          behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
          style = {styles.overlay}
        >

        <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Create Note</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <X size={20} color="#8E8E93"></X>
                </TouchableOpacity>
            </View>

             <ScrollView style={styles.form}>
            {/* Title Input */}
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Give your note a title..."
              placeholderTextColor="#8E8E93"
              value={title}
              onChangeText={setTitle}
            />

            {/* Content Input  */}
            <Text style={styles.label}> Note Details</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="Start writing something amazing..."
              placeholderTextColor="#8E8E93"
              multiline
              textAlignVertical="top"
              value={content}
              onChangeText={setContent}
            />

               {/* Content Input */}
            <Text style={styles.label}>Note Details</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="Start writing something amazing..."
              placeholderTextColor="#8E8E93"
              multiline
              textAlignVertical="top"
              value={content}
              onChangeText={setContent}
            />

            {/* Color Picker */}
            <Text style={styles.label}>Category Color</Text>
            <View style={styles.colorRow}>
              {COLORS.map((c) => (
                <TouchableOpacity
                  key={c.value}
                  style={[
                    styles.colorCircle,
                    { backgroundColor: c.value },
                    selectedColor === c.value && styles.colorCircleSelected,
                  ]}
                  onPress={() => setSelectedColor(c.value)}
                >
                  {selectedColor === c.value && <View style={styles.innerCheck} />}
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Note</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
    )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end', // Aligns modal to the bottom of the screen
  },
  modalContent: {
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
    borderColor: '#2C2C2E',
    borderTopWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    color: '#8E8E93',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  titleInput: {
    backgroundColor: '#2C2C2E',
    color: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  contentInput: {
    backgroundColor: '#2C2C2E',
    color: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    minHeight: 120,
    marginBottom: 16,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  colorCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorCircleSelected: {
    borderColor: '#FFFFFF',
  },
  innerCheck: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#1E90FF',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});