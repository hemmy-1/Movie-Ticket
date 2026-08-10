import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import Header from '../../component/Header'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import images from '../../Constant/images';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Button from '../../component/Button';



export default function MovieD({ route }) {
    const { MOVIES } = route.params
    const navigation = useNavigation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedCinema, setSelectedCinema] = useState('1');

    const storylineText =
        "The analysis of the story structure in Avengers: Infinity War highlights how the film pulls off the immense challenge of juggling a massive ensemble cast and five separate Infinity Stone quests. While traditional films focus on a clear protagonist from Earth, structuralists and screenwriters often evaluate this film by making Thanos the central protagonist and main driver of the plot. The narrative cleverly intercuts multiple secondary character storylines—such as Iron Man, Thor, and Scarlet Witch—against Thanos's singular, relentless goal to reshape reality and save the universe from resource depletion.";


    const DIRECTORS = [
        {
            id: '1',
            name: 'Anthony Russo',
            img: images.actor,
        },
        {
            id: '2',
            name: 'Joe Russo',
            img: images.actor1,
        },
    ];

    const DirectorView = ({ item }) => (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#1C1C1E',
                borderRadius: 12,
                padding: 10,
                width: 160,
                gap: 10,
            }}
        >
            <Image
                source={item.img}
                style={{ width: 44, height: 44, borderRadius: 22 }}
            />
            <Text
                style={{ color: '#FFF', fontSize: 13, fontWeight: '600', flex: 1 }}
                numberOfLines={2}
            >
                {item.name}
            </Text>
        </View>
    )

    const ACTORS = [
        {
            id: '1',
            name: 'Robert Downey Jr.',
            img: images.actor2,
        },
        {
            id: '2',
            name: 'Chris Hemsworth',
            img: images.actor3,
        },
        {
            id: '3',
            name: 'Chris Evans',
            img: images.actor4,
        }
    ];

    const ActorsView = ({ item }) => (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#1C1C1E',
                borderRadius: 12,
                padding: 10,
                width: 160,
                gap: 10,
            }}
        >
            <Image
                source={item.img}
                style={{ width: 44, height: 44, borderRadius: 22 }}
            />
            <Text
                style={{ color: '#FFF', fontSize: 13, fontWeight: '600', flex: 1 }}
                numberOfLines={2}
            >
                {item.name}
            </Text>
        </View>
    )

    const CINEMAS = [
        {
            id: '1',
            name: 'Vincom Ocean Park CGV',
            distance: '4.55 km',
            address: 'Da Ton, Gia Lam, Ha Noi',
            logo: images.logo1
        },
        {
            id: '2',
            name: 'Aeon Mall CGV',
            distance: '9.32 km',
            address: '27 Co Linh, Long Bien, Ha Noi',
            logo: images.logo1,
        },
        {
            id: '3',
            name: 'Lotte Cinema Long Bien',
            distance: '14.3 km',
            address: '7-9 Nguyen Van Linh, Long Bien, Ha Noi',
            logo: images.logo2,
        },
    ];
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#120202' }}>
            <ImageBackground source={MOVIES?.img2}
                style={{ width: '100%', height: 241, }}
                resizeMode='stretch'>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                    position: 'absolute',
                    top: 50, 
                    left: 20,
                    zIndex: 999, 
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: 10,
                    borderRadius: 20,
                    
                    }}>
                    <FontAwesome6 name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
            </ImageBackground>

            <View style={{ alignSelf: 'center', width: '90%', marginTop: -100, gap: 30 }}>

                <View style={{ height: 198, width: '100%', backgroundColor: '#1C1C1C', padding: 20, justifyContent: 'space-between', borderRadius: 20 }}>

                    <View style={{ gap: 5 }}>
                        <Text style={{ fontSize: 24, color: 'white', fontWeight: '800' }}>{MOVIES?.title}</Text>

                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            <Text style={{ fontSize: 16, color: 'white', }}>{MOVIES?.duration}</Text>
                            <Text style={{ fontSize: 16, color: 'white', }}>*</Text>
                            <Text style={{ fontSize: 16, color: 'white', }}>{MOVIES?.date}</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '800', color: 'white' }}>Review ⭐ <Text>{MOVIES?.rating}
                            <Text style={{ fontSize: 12, color: '#888' }}> ({MOVIES?.reviews})</Text>
                        </Text></Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 50 }}>
                            <Image source={images.stars} />
                            <TouchableOpacity style={{ height: 34, width: 122, borderWidth: 1, borderColor: '#BFBFBF', borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                                <FontAwesome5 name="play" size={18} color="white" />
                                <Text style={{ fontSize: 12, color: 'white' }}>Watch Trailer</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 50 }}>

                    <View style={{ gap: 15 }}>
                        <Text style={{ fontSize: 16, color: '#CDCDCD' }}>Movie genre:</Text>
                        <Text style={{ fontSize: 16, color: '#CDCDCD' }}>Censorship:</Text>
                        <Text style={{ fontSize: 16, color: '#CDCDCD' }}>Language</Text>
                    </View>
                    <View style={{ gap: 15 }}>
                        <Text style={{ fontWeight: '800', fontSize: 16, color: 'white' }}>{MOVIES?.genre}</Text>
                        <Text style={{ fontWeight: '800', fontSize: 16, color: 'white' }}>{MOVIES?.censorship}</Text>
                        <Text style={{ fontWeight: '800', fontSize: 16, color: 'white' }}>{MOVIES?.language}</Text>
                    </View>
                </View>

                <View>
                    <Text
                        style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20 }}>Storyline</Text>
                    <Text
                        onPress={() => setIsExpanded(!isExpanded)}
                        style={{ color: '#DDD', fontSize: 16, lineHeight: 24 }}
                        numberOfLines={isExpanded ? undefined : 3}
                    >
                        {storylineText}
                    </Text>
                    <Text

                        style={{ color: '#FCC434', fontWeight: 'bold' }}
                    >
                        {isExpanded ? ' See less' : '... See more'}
                    </Text>

                </View>

                <View style={{gap:10, marginVertical:20}}>
                    <Text style={{ color: '#FFF', fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>
                        Director
                    </Text>
                    <FlatList
                        data={DIRECTORS}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 12, marginBottom: 24 }}
                        renderItem={DirectorView}
                    />

                    <Text style={{ color: '#FFF', fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>
                        Actor
                    </Text>
                    <FlatList
                        data={ACTORS}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 12, marginBottom: 24 }}
                        renderItem={ActorsView}
                    />

                    <Text style={{ color: '#FFF', fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>
                        Cinema
                    </Text>
                    <View style={{ gap: 12, marginBottom: 24 }}>
                        {CINEMAS.map((cinema) => {
                            const isSelected = selectedCinema === cinema.id;
                            return (
                                <TouchableOpacity
                                    key={cinema.id}
                                    activeOpacity={0.8}
                                    onPress={() => setSelectedCinema(cinema.id)}
                                    style={{
                                        backgroundColor: isSelected ? '#1E180A' : '#1C1C1E',
                                        borderWidth: isSelected ? 1.5 : 0,
                                        borderColor: isSelected ? '#FCC434' : 'transparent',
                                        borderRadius: 16,
                                        padding: 16,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <View style={{ flex: 1, paddingRight: 10 }}>
                                        <Text
                                            style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 6 }}
                                            numberOfLines={1}
                                        >
                                            {cinema.name}
                                        </Text>
                                        <Text style={{ color: '#8E8E93', fontSize: 13 }} numberOfLines={1}>
                                            {cinema.distance}  |  {cinema.address}
                                        </Text>
                                    </View>

                                    <Image
                                        source={cinema.logo}
                                        style={{ width: 36, height: 24, borderRadius: 4 }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <Button onPress={()=> navigation.navigate('seat', {MOVIES})}/>

                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})