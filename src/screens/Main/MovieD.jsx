import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import Header from '../../component/Header'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import images from '../../Constant/images';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default function MovieD({ route }) {
    const navigation = useNavigation();
    const [isExpanded, setIsExpanded] = useState(false);

    const storylineText =
        "The analysis of the story structure in Avengers: Infinity War highlights how the film pulls off the immense challenge of juggling a massive ensemble cast and five separate Infinity Stone quests. While traditional films focus on a clear protagonist from Earth, structuralists and screenwriters often evaluate this film by making Thanos the central protagonist and main driver of the plot. The narrative cleverly intercuts multiple secondary character storylines—such as Iron Man, Thor, and Scarlet Witch—against Thanos's singular, relentless goal to reshape reality and save the universe from resource depletion.";

    const { MOVIES } = route.params
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#120202' }}>
            <ImageBackground source={MOVIES?.img2}
                style={{ width: '100%', height: 241, }}
                resizeMode='stretch'>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 50, left: 20 }}>
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
                        style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom:20 }}>Storyline</Text>
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
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})