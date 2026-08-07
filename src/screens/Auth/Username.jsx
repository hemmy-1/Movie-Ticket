import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Button from '../../component/Button';


export default function Username() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isUsernameIncomplete = username.length < 5;
  // <Button
  //   title="Continue"
  //   disabled={isUsernameIncomplete}
  //   onPress={handleContinue}
  // />

  const handleContinue = () => {
    if(isUsernameIncomplete) return;

    navigation.navigate('tab', {
      screen: 'Home', 
      params: { UserName: username },
    });
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

      <SafeAreaView style={{ backgroundColor: 'black', flex: 1, padding: 10 }}>
        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10, borderRadius: 10 }}>
            <FontAwesome6 name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
        </View>


        <View style={styles.usernameV}>

          <View>
            <Text style={styles.title}>Enter Username</Text>
            <Text style={styles.title1}>Latin characters, no emoji/symbols</Text>
          </View>

          <TextInput
            placeholder='@username'
            placeholderTextColor={'white'}
            value={username}
            onChangeText={setUsername}
            style={styles.textinput}
            
          />
          <View style={{ borderWidth: 1, borderColor: '#888', marginTop: -5 }} />


        </View>

        
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>

            
          <Button disabled={isUsernameIncomplete} onPress={handleContinue} />

          </KeyboardAvoidingView>
        




      </SafeAreaView>
    </TouchableWithoutFeedback>

  )
}

const styles = StyleSheet.create({
  title: {
    color: '#FCC434',
    fontWeight: '900',
    fontSize: 32
  },
  usernameV: {
    marginTop: 50,
    padding: 15,
    gap: 10
  },
  title1: {
    color: 'white',
    fontSize: 16,
    marginTop: 10
  },
  textinput: {
    color: 'white',
    fontSize: 30,
    marginTop: 30,
    width: '97%'
  },
  container: {
    flex: 1,
    justifyContent:'flex-end'
  }
})