import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Trash2, Calendar } from 'lucide-react-native';

const NoteCard = ({note, onDelete, onPress}) => {
  
    const dateStr = new Date(note.createdAt).toLocaleDateString(undefined, {
         month: 'short',
         day: 'numeric',
         hour: '2-digit',
         minute: '2-digit',
    })
    return (

       < TouchableOpacity 
      style={[styles.card, { borderLeftColor: note.color || '#FF4757' }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >

        <View style={styles.cardHeader}>
            <Text style={styles.title} numberOfLines={1}>
                {note.title || "untitled"}
            </Text>
            <TouchableOpacity onPress={() => onDelete(note.id)} style={styles.deleteButton}>
                <Trash2 size={18} color="#FF4757"/>
            </TouchableOpacity>
        </View>

         <Text style={styles.content} numberOfLines={3}>
        {note.content || 'No additional content.'}
      </Text>

        <View style={styles.cardFooter}>
          <Calendar size={12} color="#8E8E93" style={styles.icon} />
          <Text style={styles.date}>{dateStr}</Text>
      </View>
      
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    padding: 4,
  },
  content: {
    color: '#E5E5EA',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  date: {
    color: '#8E8E93',
    fontSize: 11,
  },
});

export default NoteCard
