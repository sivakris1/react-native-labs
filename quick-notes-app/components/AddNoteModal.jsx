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
  ScrollView,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { X, Camera, Trash2 } from 'lucide-react-native';

const COLORS = [
  { label: 'Work', value: '#FF4757' },       // Red
  { label: 'Ideas', value: '#FFA502' },      // Orange
  { label: 'Personal', value: '#2ED573' },   // Green
  { label: 'Reminders', value: '#1E90FF' },  // Blue
];

export default function AddNoteModal({ visible, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
  const [imageUri, setImageUri] = useState(null); // Local photo URI path

  const takePhoto = async () => {
    // Request permission from the device
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('We need camera permission to attach photos to notes!');
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Save the photo path in state
    }
  };

  const handleSave = () => {
    if (!title.trim() && !content.trim()) {
      alert('Please write something before saving!');
      return;
    }

    // Pass all note data (including the image) back to App.js
    onSave({
      title: title.trim(),
      content: content.trim(),
      color: selectedColor,
      image: imageUri,
    });

    // Reset input fields
    setTitle('');
    setContent('');
    setSelectedColor(COLORS[0].value);
    setImageUri(null);

    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create Note</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color="#8E8E93" />
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

            {/* Photo Section */}
            <Text style={styles.label}>Attachment</Text>
            {imageUri ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                <TouchableOpacity 
                  style={styles.removeImageButton} 
                  onPress={() => setImageUri(null)}
                >
                  <Trash2 size={16} color="#FF4757" />
                  <Text style={styles.removeImageText}>Remove Photo</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
                <Camera size={20} color="#1E90FF" style={styles.cameraIcon} />
                <Text style={styles.cameraButtonText}>Take Photo</Text>
              </TouchableOpacity>
            )}

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
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
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
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#3A3A3C',
    borderStyle: 'dashed',
  },
  cameraIcon: {
    marginRight: 8,
  },
  cameraButtonText: {
    color: '#1E90FF',
    fontSize: 15,
    fontWeight: '600',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  imagePreview: {
    width: 80,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#1C1C1E',
  },
  removeImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    padding: 8,
    backgroundColor: 'rgba(255, 71, 87, 0.1)',
    borderRadius: 8,
  },
  removeImageText: {
    color: '#FF4757',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
});