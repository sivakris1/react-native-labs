import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';

// 1. Mock Movie Data (Includes real movie posters from TMDB)
const MOCK_MOVIES = [
  {
    id: '1',
    title: 'Spider-Man: Across the Spider-Verse',
    rating: 8.9,
    releaseDate: '2023',
    poster: 'https://image.tmdb.org/t/p/w500/8VtBz7c151rj6R7oIXQ2nvv0H86.jpg',
    overview: 'After reuniting with Gwen Stacy, Brooklyn\'s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse.'
  },
  {
    id: '2',
    title: 'Inception',
    rating: 8.8,
    releaseDate: '2010',
    poster: 'https://image.tmdb.org/t/p/w500/o0xl6j5j45LAoK1QnEE6o4uYCcR.jpg',
    overview: 'Cobb, a skilled thief who steals valuable secrets from deep within the subconscious during the dream state.'
  },
  {
    id: '3',
    title: 'Interstellar',
    rating: 8.6,
    releaseDate: '2014',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E7vNIvXTLM3OIpaG2c.jpg',
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.'
  },
  {
    id: '4',
    title: 'The Dark Knight',
    rating: 9.0,
    releaseDate: '2008',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tWGBbeZ1mWmgAwUpu555v5gy.jpg',
    overview: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations.'
  }
];

// Receive the "navigation" prop automatically from React Navigation
export default function DiscoverScreen({ navigation }) {

  // 2. Render each Movie Card in our Grid
  const renderMovieItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.card}
        activeOpacity={0.8}
        // When tapped, navigate to the Details screen and pass the movie object!
        onPress={() => navigation.navigate('MovieDetails', { movie : item})} 
      >
        <Image source={{ uri: item.poster }} style={styles.poster} />
        <View style={styles.cardInfo}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
            <Text style={styles.year}>{item.releaseDate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MOCK_MOVIES}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // 3. Puts our cards into a beautiful 2-column grid!
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper} // Spaces the columns evenly
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F12', // Premium deep dark theme
  },
  listContent: {
    padding: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Spreads the 2 columns to the edges
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    width: '48%', // Ensures 2 columns sit side-by-side with padding in between
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2C2C2E',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  poster: {
    width: '100%',
    height: 220, // Tall poster shape
    backgroundColor: '#2C2C2E',
  },
  cardInfo: {
    padding: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    color: '#FFD700', // Gold color for rating star
    fontSize: 12,
    fontWeight: '600',
  },
  year: {
    color: '#8E8E93',
    fontSize: 12,
  },
});
