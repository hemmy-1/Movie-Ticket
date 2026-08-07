<<<<<<< HEAD
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
=======
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
>>>>>>> 0127e38d083332c2bca2fb2f319a8fa0f60d7648
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState, useRef, useEffect } from 'react';
import OTPTextInput from 'react-native-otp-textinput';
import Button from '../../component/Button';



export default function OTP() {
    const navigation = useNavigation();

    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(59);
    const otpInputRef = useRef(null);

    const isOtpComplete = otp.length < 6;

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Format seconds to 00:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
                <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10, borderRadius: 10 }}>
                        <FontAwesome6 name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>

                </View>


                <View style={{ padding: 10, marginTop: 90 }}>

                    <Text style={styles.title}>Confirm OTP code</Text>

                    {/* Subtitle */}
                    <Text style={styles.subtitle}>
                        You just need to enter the OTP sent to the registered phone number (704) 555-0127.
                    </Text>

                    {/* OTP Input Component */}
                    <View style={styles.otpWrapper}>
                        <OTPTextInput
                            ref={otpInputRef}
                            inputCount={6}
                            handleTextChange={(text) => setOtp(text)}
                            tintColor="#EFA636"
                            offTintColor="#EFA636"
                            textInputStyle={styles.otpBox}
                            containerStyle={styles.otpContainer}
                        />
                    </View>

                    {/* Timer */}
                    <View style={styles.timerContainer}>
                        <Text style={styles.timerText}>{formatTime(timer)}</Text>
                    </View>
                </View>

<<<<<<< HEAD
                

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{flex:1, justifyContent:'flex-end'}}
                    >
                    
                    <Button disabled={isOtpComplete} onPress={() => navigation.navigate('username')}/>

                </KeyboardAvoidingView>
=======


                <Button disabled={isOtpComplete} onPress={() => navigation.navigate('username')} />
>>>>>>> 0127e38d083332c2bca2fb2f319a8fa0f60d7648

            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#160806',
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#EFA636',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 15,
        color: '#D2B3A4',
        lineHeight: 22,
        marginBottom: 32,
    },
    otpWrapper: {
        marginBottom: 24,
    },
    otpContainer: {
        justifyContent: 'space-between',
    },
    otpBox: {
        width: 48,
        height: 60,
        backgroundColor: '#351B10',
        borderWidth: 1,
        borderRadius: 8,
        borderBottomWidth: 1,
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    timerContainer: {
        alignItems: 'flex-end',
    },
    timerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
})