import { StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useMemo, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@expo/vector-icons/Ionicons';
import images from '../../Constant/images';
import Button from '../../component/Button';



export default function LoginScreen() {
  const navigation = useNavigation();


  const bottomSheetRef = useRef(null);
  const snapPoint = useMemo(() => ['20%', '50%'], []);

  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleClosePress = () => bottomSheetRef.current?.close();

  const [language, setLanguage] = useState(false);

  const openModal = () => setLanguage(true);
  const closeModal = () => setLanguage(false);

  const [selected, setSelected] = useState('English')



  return (
    <SafeAreaView style={{ backgroundColor: '#120202', flex: 1 }}>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingRight: 30 }}>

        <Image style={{ height: 70, width: 200 }} source={images.logo} />
        <TouchableOpacity onPress={openModal} style={{ backgroundColor: 'black', borderRadius: 20, borderWidth: 2, borderColor: 'white', height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
          <Ionicons name="language-outline" size={24} color="white" />
          <Text style={{ color: 'white' }}> {selected === 'English' ? 'English' : 'Vietnamese'}</Text>

        </TouchableOpacity>
      </View>

      <View style={{ alignSelf: 'center', height: 459, width: 329, alignItems: 'center', marginTop: 100 }}>
        <Image style={{ height: 329, width: 329 }} source={images.movie1} />

        <View style={{ alignItems: 'center', gap: 24, height: 90, width: 248, flex: 1, justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 32, color: 'white' }}>MBooking hello!</Text>
          <Text style={{ fontSize: 16, color: 'white' }}>Enjoy your favorite movies</Text>

          <View style={{ height: 8, width: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ height: 8, width: 8, backgroundColor: '#FCC434', borderRadius: 8 }}>
            </View>
            <View style={{ height: 8, width: 8, backgroundColor: '#686868', borderRadius: 8 }}>
            </View>
            <View style={{ height: 8, width: 8, backgroundColor: '#686868', borderRadius: 8 }}>
            </View>
          </View>

        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', height: 186, width: '97%', alignItems: 'center', gap: 20, marginBottom: 30 }}>


        <Button title='Sign in' onPress={()=> navigation.navigate('Signup')} />
        <Button title='Sign up' style={{ backgroundColor: 'black', borderWidth: 2, borderColor: 'white' }} textStyle={{ color: 'white' }} />



        <Text style={{ color: '#ffffff', fontSize: 15, textAlign: 'center' }}>
          By sign in or sign up, you agree to our Terms of Service
          and Privac y Policy</Text>
      </View>
      <Modal
        visible={language}
        onRequestClose={closeModal}
        transparent={true}
        animationType='slide'
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={{ height: 400, width: '100%', backgroundColor: '#5b5656', borderRadius: 40, padding: 20 }}>
            <Text style={{ color: 'white', fontSize: 35, fontWeight: '900' }}>Choose Language</Text>
            <Text style={{ color: 'white', fontSize: 15 }}>Which language do you want to use?</Text>

            <View style={{ marginTop: 20, gap: 10 }}>

              <TouchableOpacity onPress={() => setSelected('English')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: selected === 'English' ? '#FCC434' : 'white', fontSize: 25, fontWeight: '800' }}>
                  English
                </Text>
                <Ionicons name={selected === 'English' ? "radio-button-on" : "radio-button-off"} size={34} color={selected === 'English' ? "#FCC434" : "#fff"} />
              </TouchableOpacity>

              <View style={{ borderWidth: 1, borderColor: '#888' }} />

              <TouchableOpacity onPress={() => setSelected('Vietnamese')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: selected === 'Vietnamese' ? '#FCC434' : 'white', fontSize: 25, fontWeight: '800' }}>
                  Vietnamese
                </Text>
                <Ionicons name={selected === 'Vietnamese' ? "radio-button-on" : "radio-button-off"} size={34} color={selected === 'Vietnamese' ? "#FCC434" : "#fff"} />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button onPress={closeModal} title={selected === 'English' ? ' use English' : 'use Vietnamese'} />




            </View>









          </View>

        </View>

      </Modal>






    </SafeAreaView>
  )
}


const styles = StyleSheet.create({})