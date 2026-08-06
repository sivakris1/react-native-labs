import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar, Star, ChevronLeft, Heart } from 'lucide-react-native';

const WATCHLIST_KEY = '@cineverse_watchlist';

export default function DetailsScreen({ route, navigation }) {
  const { movie } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async() => {
      try {
        const rawWatchList = await AsyncStorage.getItem(WATCHLIST_KEY);
        if(rawWatchList !== null){
          const watchlistArray = JSON.parse(rawWatchList);

          const exists = watchlistArray.some(item => item.id === movie.id);
          setIsFavorite(exists);
        }
      } catch (error) {
        console.error('Failed to load watchlist status');
      }
    }

    checkFavoriteStatus();
  },[movie.id])

  const toggleFavorite = async() => {
    try {
      const rawWatchlist = await AsyncStorage.getItem(WATCHLIST_KEY);
      let watchlistArray = [];

      if (rawWatchlist !== null) {
        watchlistArray = JSON.parse(rawWatchlist);
      }

      if(isFavorite){
        watchlistArray = watchlistArray.filter(item => item.id !== movie.id);
        setIsFavorite(false);
      }
      else{
        watchlistArray.push(movie);
        setIsFavorite(true);
      }

      await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlistArray))
    } catch (error) {
      Alert.alert('Database Error', 'Failed to update watchlist.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Custom Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => navigation.goBack()} // Go back to previous screen
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F12',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C1E',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  poster: {
    width: '100%',
    height: 380,
    backgroundColor: '#2C2C2E',
  },
  infoSection: {
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 30,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  metaIcon: {
    marginRight: 6,
  },
  metaText: {
    color: '#8E8E93',
    fontSize: 14,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#1C1C1E',
    marginBottom: 20,
  },
  sectionLabel: {
    color: '#8E8E93',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  overviewText: {
    color: '#E5E5EA',
    fontSize: 15,
    lineHeight: 24,
  },
});
