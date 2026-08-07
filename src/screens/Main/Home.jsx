import { StyleSheet, Text, View, Image, TextInput, useWindowDimensions, Animated, ScrollView, FlatList, TouchableOpacity, ImageBackground, ImageBackgroundComponent } from 'react-native'
import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import images from '../../Constant/images';

const MOVIES = [
  {
    id: '1',
    title: 'Avengers - Infinity War',
    duration: '2h29m',
    genre: 'Action, adventure, sci-fi',
    rating: '4.8',
    reviews: '1.222',
    img: images.movie1,
  },
  {
    id: '2',
    title: 'The Dark Knight',
    duration: '2h32m',
    genre: 'Action, crime, drama',
    rating: '4.9',
    reviews: '2.450',
    img: images.movie1,
  },
  {
    id: '3',
    title: 'The Dark Knight',
    duration: '2h32m',
    genre: 'Action, crime, drama',
    rating: '4.9',
    reviews: '2.450',
    img: images.movie1,
  },
  {
    id: '4',
    title: 'The Dark Knight',
    duration: '2h32m',
    genre: 'Action, crime, drama',
    rating: '4.9',
    reviews: '2.450',
    img: images.movie1,
  },
];

const COMING_SOON_MOVIES = [
  {
    id: '1',
    title: 'Avatar 2: The Way Of Water',
    genre: 'Adventure, Sci-fi',
    releaseDate: '20.12.2022',
    img: images.movie4
  },
  {
    id: '2',
    title: 'Ant Man Wasp: Quantumania',
    genre: 'Adventure, Sci-fi',
    releaseDate: '25.12.2022',
    img: images.movie5
  },
  {
    id: '3',
    title: 'Puss in Boots: The Last Wish',
    genre: 'Animation, Adventure',
    releaseDate: '27.12.2022',
    img: images.movie3
  },
];

export default function Home({ route }) {
  const { width } = useWindowDimensions();
  const ITEM_WIDTH = width * 0.72;
  const ITEM_MARGIN = 10;
  const ITEM_SIZE = ITEM_WIDTH + ITEM_MARGIN * 2;
  const ITEM_SPACING = (width - ITEM_WIDTH) / 2;

  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback((event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / ITEM_SIZE
    );
    setActiveIndex(Math.max(0, Math.min(index, MOVIES.length - 1)));
  }, [ITEM_SIZE]);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: handleScroll,
    }
  );

  const { UserName } = route.params
  return (
    <SafeAreaView style={{ backgroundColor: 'black', flex: 1, padding: 10 }}>
      <ScrollView>

        <View style={{ gap: 30 }}>


          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>

            <View>
              <Text style={{ color: 'white', fontSize: 18 }}>Hi, {UserName} 👋</Text>
              <Text style={{ color: 'white', fontSize: 28, fontWeight: '800' }}>Welcome back</Text>
            </View>
            <Image source={images.bell} style={{ height: 26, width: 26 }} />
          </View>

          <View style={{ height: 48, width: '94%', backgroundColor: '#1C1C1C', alignSelf: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10 }}>
            <EvilIcons name="search" size={24} color="white" />
            <TextInput
              placeholder='Search'
              placeholderTextColor={'#8C8C8C'}
              style={{ width: '90%', height: 40, fontSize: 16 }} />
          </View>
        </View>



        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Now playing</Text>
            <Text style={styles.seeAll}>See all ›</Text>
          </View>

          {/* Movie Carousel */}
          <Animated.FlatList
            data={MOVIES}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_SIZE}
            snapToAlignment="start"
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
            onScroll={onScroll}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * ITEM_SIZE,
                index * ITEM_SIZE,
                (index + 1) * ITEM_SIZE,
              ];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.88, 1, 0.88],
                extrapolate: 'clamp',
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.4, 1, 0.4],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  style={[
                    styles.cardContainer,
                    {
                      width: ITEM_WIDTH,
                      marginHorizontal: 10,
                      transform: [{ scale }],
                      opacity,
                    },
                  ]}
                >
                  <Image source={item.img} style={styles.poster} />

                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subtitle}>
                    {item.duration} • {item.genre}
                  </Text>

                  <View style={styles.ratingRow}>
                    <FontAwesome name="star" size={16} color="#FCC434" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Text style={styles.reviewText}>({item.reviews})</Text>
                  </View>
                </Animated.View>
              );
            }}
          />

          <View style={styles.pagination}>
            {MOVIES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeIndex === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Coming soon</Text>
            <Text style={styles.seeAll}>See all ›</Text>
          </View>

          <FlatList
            data={COMING_SOON_MOVIES}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ width: 160 }} activeOpacity={0.8}>
                <Image
                  source={item.img}
                  style={{ width: 160, height: 230, borderRadius: 16, marginBottom: 10, }}
                />

                <Text
                  numberOfLines={2}
                  style={{ color: '#FCC434', fontSize: 16, fontWeight: 'bold', marginBottom: 6, height: 42, }}
                >{item.title}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 6, }}>

                  <MaterialCommunityIcons name="video-outline" size={16} color="#AAA" />
                  numberOfLines={1}
                  <Text style={{ color: '#AAA', fontSize: 12, flex: 1 }}
                  >{item.genre}</Text>
                </View>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 6, }}
                >
                  <MaterialCommunityIcons name="calendar-month-outline" size={16} color="#AAA" />
                  <Text style={{ color: '#AAA', fontSize: 12 }}>
                    {item.releaseDate}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{ marginTop: 20, }}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Promo & Discount</Text>
            <Text style={styles.seeAll}>See all ›</Text>
          </View>

          <ImageBackground resizeMode='contain'
            source={images.discount}
            style={{ height: 268, width: '97%', alignSelf: 'center', borderRadius:20}}>

            <View style={{ alignSelf: 'flex-end', position:'relative', right:40, top:30 }}>

              <View style={{ height: 100, width: 133,alignItems:'flex-end' }}>
                <Image source={images.layer} />

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 83, color: 'white', fontWeight:'900'}}>30</Text>
                  <View>
                    <Text style={{ fontSize: 47, color: 'white' }}>%</Text>
                    <Text style={{ fontSize: 22, color: 'white', marginTop: -10 }}>OFF</Text>
                  </View>

                </View>
                <Text style={{ fontSize: 14, color: 'white', marginTop: -10 }}>Movie Voucher free</Text>

              </View>

            </View>


          </ImageBackground>


        </View>





      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,

  },
  headerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#FCC434',
    fontSize: 16,
  },
  cardContainer: {
    width: '65%',
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
  subtitle: {
    color: '#AAA',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 6,
  },
  reviewText: {
    color: '#888',
    fontSize: 14,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#FCC434',
  },
  inactiveDot: {
    width: 12,
    backgroundColor: '#333',
  },
})