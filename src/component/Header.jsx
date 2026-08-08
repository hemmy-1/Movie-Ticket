import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Header({ text, onPress }) {
    return (
        <View
            style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
            }}
        >
            
            <TouchableOpacity
                onPress={onPress}
                style={{
                    padding: 8,
                    borderRadius: 10,
                    zIndex: 1, 
                }}
            >
                <FontAwesome6 name="arrow-left" size={24} color="white" />
            </TouchableOpacity>

            {/* Centered Title */}
            <Text
                style={{
                    textAlign: 'center',
                    color: 'white',
                    flex: 1,
                    fontSize: 24, 
                    fontWeight: '700',
                }}
                numberOfLines={1}
            >
                {text}
            </Text>

            <View style={{ width: 40 }} />
        </View>
    );
}