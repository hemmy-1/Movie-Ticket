import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Button({
    title = 'Continue',
    onPress,
    disabled = false,
    style,
    textStyle,
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
            style={[
                styles.button,
                disabled ? styles.disabledButton : styles.activeButton,
                style,
            ]}
        >
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    activeButton: {
        backgroundColor: '#FCC434',
    },
    disabledButton: {
        backgroundColor: '#584e35',
    },
    buttonText: {
        color: '#030303',
        fontWeight: 'bold',
        fontSize: 20,
    },
});