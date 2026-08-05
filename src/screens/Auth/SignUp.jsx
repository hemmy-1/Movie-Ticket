import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import images from '../../Constant/images';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#120202', padding: 10 }}>
      <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={{padding:10, borderRadius:10}}>
        <FontAwesome6 name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', color: 'white', flex: 1, fontSize: 30, fontWeight: '700' }}>Sign Up</Text>
      </View>

      <View style={{ marginTop: 100, padding: 10, gap: 40 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Ionicons name="call-outline" size={30} color="white" />
          <TextInput
            placeholder='(234) 567 8909'
            placeholderTextColor={'white'}
            style={{ fontSize: 24, color: 'white', width: '90%' }}
            inputMode='tel'
            maxLength={14}
          />
        </View>

        <View style={{ borderWidth: 1, borderColor: '#888', marginTop: -35 }} />

        <TouchableOpacity onPress={()=> navigation.navigate('otp')} style={{ width: '100%', backgroundColor: '#FCC434', borderRadius: 40, justifyContent: 'center', alignItems: 'center', paddingVertical: 16 }}>
          <Text style={{ color: '#030303', fontWeight: 'bold', fontSize: 20 }}>Continue</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', padding:10, alignItems:'center', gap:20 }}>

        <View style={{flexDirection:'row', alignItems:'center'}}>
          <View style={{ borderWidth: 0.5, borderColor: '#888',width:'35%', height:0 }} />
          <Text style={{color:'white', paddingHorizontal:10 }}>Or continue with</Text>
          <View style={{ borderWidth: 0.5, borderColor: '#888',width:'35%', height:0 }} />
        </View>

        <TouchableOpacity style={{ width: '100%', backgroundColor: '#1A1A1A', borderRadius: 40, justifyContent: 'center', alignItems: 'center', paddingVertical: 16, flexDirection:'row', gap:10}}>
          <Image source={images.facebook} style={{height:24, width:12}}/>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '100%', backgroundColor: '#1A1A1A', borderRadius: 40, justifyContent: 'center', alignItems: 'center', paddingVertical: 16, flexDirection:'row', gap:10}}>
          <Image source={images.google} style={{height:20, width:20}}/>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Google</Text>
        </TouchableOpacity>

        <View style={{marginTop:20}}>
          <Text style={{textAlign:'center', color:'white'}}>
            By sign in or sign up, you agree to our Terms of Service
            and Privacy Policy
          </Text>
        </View>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})