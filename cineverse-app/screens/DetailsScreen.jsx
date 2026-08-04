import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { Calendar, Star, ChevronLeft, Heart } from 'lucide-react-native';


export default function DetailsScreen({route, navigation}) {
    const {movie} = route.params;

     return (
    <SafeAreaView style={styles.container}>
      {/* 1. Custom Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => navigation.goBack()} // Go back to the previous screen in the stack
        >
          <ChevronLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>Details</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Heart color="#FFFFFF" size={20} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 2. Massive Movie Poster */}
        <Image source={{ uri: movie.poster }} style={styles.poster} />
        <View style={styles.infoSection}>
          {/* 3. Movie Title */}
          <Text style={styles.title}>{movie.title}</Text>
          {/* 4. Release Year and Rating */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Calendar size={16} color="#8E8E93" style={styles.metaIcon} />
              <Text style={styles.metaText}>{movie.releaseDate}</Text>
            </View>
            <View style={styles.metaItem}>
              <Star size={16} color="#FFD700" style={styles.metaIcon} />
              <Text style={styles.ratingText}>{movie.rating} / 10</Text>
            </View>
          </View>
          {/* Divider line */}
          <View style={styles.divider} />
          {/* 5. Movie Overview Synopsis */}
          <Text style={styles.sectionLabel}>Synopsis</Text>
          <Text style={styles.overviewText}>{movie.overview}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>

     );
}