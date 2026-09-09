import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOVIES_DATA = [
  {
    id: '1',
    title: 'Shang chi: Legend of the Ten Rings',
    poster: 'https://m.media-amazon.com/images/M/MV5BNTliYjlkNDQtMjFlYi00ZjgzLTg0MzktNjJiU2I1MTUyMDA3XkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_.jpg',
    rating: '4.0',
    reviews: '(982)',
    duration: '2 hour 12 minutes',
    genre: 'Action, Sci-fi',
  },
  {
    id: '2',
    title: 'Batman v Superman: Dawn of Justice',
    poster: 'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDY0LTgwMWQtZmE3NzkzNzc2ZmcxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    rating: '4.0',
    reviews: '(982)',
    duration: '2 hour 31 minutes',
    genre: 'Action, Sci-fi',
  },
  {
    id: '3',
    title: 'Avengers: Infinity War',
    poster: 'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg',
    rating: '4.8',
    reviews: '(1.2k)',
    duration: '2 hour 29 minutes',
    genre: 'Action, Sci-fi',
  },
  {
    id: '4',
    title: 'Guardians of the Galaxy',
    poster: 'https://m.media-amazon.com/images/M/MV5NDIzMTk4NDYtMjg5OS00ZGUgLTkzNTctOWJhOGAyN2YwZjE0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    rating: '4.5',
    reviews: '(850)',
    duration: '2 hour 01 minutes',
    genre: 'Action, Sci-fi',
  },
];

export default function MovieScreen() {
  const [activeTab, setActiveTab] = useState('nowPlaying');

  const renderMovieCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={{ uri: item.poster }} style={styles.posterImage} resizeMode="cover" />

      <Text style={styles.movieTitle} numberOfLines={2}>
        {item.title}
      </Text>

      {/* Rating Row */}
      <View style={styles.infoRow}>
        <Ionicons name="star" size={14} color="#FFB800" />
        <Text style={styles.ratingText}>{item.rating}</Text>
        <Text style={styles.subText}>{item.reviews}</Text>
      </View>

      {/* Duration Row */}
      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={14} color="#8E8E93" />
        <Text style={styles.subText}>{item.duration}</Text>
      </View>

      {/* Genre Row */}
      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="ticket-outline" size={14} color="#8E8E93" />
        <Text style={styles.subText}>{item.genre}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#120A08" />

      {/* Custom Segmented Tab Toggle */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'nowPlaying' && styles.activeTabButton]}
          onPress={() => setActiveTab('nowPlaying')}
        >
          <Text style={[styles.tabText, activeTab === 'nowPlaying' && styles.activeTabText]}>
            Now playing
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'comingSoon' && styles.activeTabButton]}
          onPress={() => setActiveTab('comingSoon')}
        >
          <Text style={[styles.tabText, activeTab === 'comingSoon' && styles.activeTabText]}>
            Coming soon
          </Text>
        </TouchableOpacity>
      </View>

      {/* 2-Column Grid Movie List */}
      <FlatList
        data={MOVIES_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderMovieCard}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120A08',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#241410',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#FFB800',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#000000',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardContainer: {
    width: '48%',
  },
  posterImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFB800',
    marginBottom: 6,
    lineHeight: 18,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  subText: {
    fontSize: 11,
    color: '#8E8E93',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#180E0C',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#241410',
  },
  navItem: {
    alignItems: 'center',
  },
});