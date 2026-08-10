import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import images from '../../Constant/images';
import { useNavigation

 } from '@react-navigation/native';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'];
const COLS_LEFT = [2, 3, 4, 5, 6, 7];
const COLS_RIGHT = [8, 9, 10, 11, 12, 13];

const INITIAL_RESERVED = ['D6', 'D7', 'D8', 'D9', 'D10', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12', 'F7', 'F8', 'F9', 'F10'];

const DATES = [
    { day: 'Dec', date: '07' },
    { day: 'Dec', date: '08' },
    { day: 'Dec', date: '09' },
    { day: 'Dec', date: '10' },
    { day: 'Dec', date: '11' },
    { day: 'Dec', date: '12' },
    { day: 'Dec', date: '13' },
];

const SHOWTIMES = ['09:30', '11:05', '14:15', '16:30', '20:00'];

export default function SelectSeat({ route }) {
    const navigation = useNavigation();
    const [selectedSeats, setSelectedSeats] = useState(['H7', 'H8']);
    const [selectedDate, setSelectedDate] = useState('10');
    const [selectedTime, setSelectedTime] = useState('14:15');
    const { MOVIES } = route.params || {}

    const ticketPrice = 105000;
    const totalPrice = selectedSeats.length * ticketPrice;

    const toggleSeat = (seatId) => {
        if (INITIAL_RESERVED.includes(seatId)) return;
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const renderSeat = (seatId) => {
        const isReserved = INITIAL_RESERVED.includes(seatId);
        const isSelected = selectedSeats.includes(seatId);

        let bgColor = '#221515';
        let textColor = '#888';

        if (isReserved) {
            bgColor = '#3B2012';
            textColor = '#A6612A';
        }
        if (isSelected) {
            bgColor = '#FCC434';
            textColor = '#000';
        }

        return (
            <TouchableOpacity
                key={seatId}
                activeOpacity={0.7}
                disabled={isReserved}
                onPress={() => toggleSeat(seatId)}
                style={{
                    width: 27,
                    height: 27,
                    borderRadius: 4,
                    backgroundColor: bgColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: textColor, fontSize: 14, fontWeight: '600' }}>
                    {seatId}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#230404', flex: 1, padding: 10 }}>
            <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10, borderRadius: 10 }}>
                    <FontAwesome6 name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: 28, fontWeight: '800', paddingRight: 30 }}>Select seat</Text>
            </View>

            <Image source={images.lamp} style={{ alignSelf: 'center', marginTop: 20 }} />

            <View style={{ gap: 20 }}>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    {ROWS.map((row) => (
                        <View key={row} style={{ flexDirection: 'row', marginBottom: 8 }}>
                            <View style={{ flexDirection: 'row', gap: 6 }}>
                                {COLS_LEFT.map((col) => renderSeat(`${row}${col}`))}
                            </View>
                            <View style={{ width: 20 }} />
                            <View style={{ flexDirection: 'row', gap: 6 }}>
                                {COLS_RIGHT.map((col) => renderSeat(`${row}${col}`))}
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 24, gap: 30 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <View style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: '#221515' }} />
                        <Text style={{ color: '#AAA', fontSize: 13 }}>Available</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <View style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: '#3B2012' }} />
                        <Text style={{ color: '#AAA', fontSize: 13 }}>Reserved</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <View style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: '#FCC434' }} />
                        <Text style={{ color: '#AAA', fontSize: 13 }}>Selected</Text>
                    </View>
                </View>

                <View>
                    <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>
                        Select Date & Time
                    </Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12, marginBottom: 16 }}>
                        {DATES.map((item) => {
                            const isSelected = selectedDate === item.date;
                            return (
                                <TouchableOpacity
                                    key={item.date}
                                    activeOpacity={0.8}
                                    onPress={() => setSelectedDate(item.date)}
                                    style={{
                                        width: 52,
                                        height: 104,
                                        borderRadius: 26,
                                        backgroundColor: isSelected ? '#FCC434' : '#1A0E0E',
                                        borderWidth: isSelected ? 2 : 0,
                                        borderColor: '#FCC434',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ color: isSelected ? '#000' : '#888', fontSize: 16, marginTop: 15 }}>
                                        {item.day}
                                    </Text>
                                    <View
                                        style={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 40,
                                            backgroundColor: isSelected ? '#0D0505' : '#281717',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text style={{ color: isSelected ? '#FFF' : '#AAA', fontSize: 14, fontWeight: 'bold' }}>
                                            {item.date}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
                    {SHOWTIMES.map((time) => {
                        const isSelected = selectedTime === time;
                        return (
                            <TouchableOpacity
                                key={time}
                                activeOpacity={0.8}
                                onPress={() => setSelectedTime(time)}
                                style={{
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 20,
                                    backgroundColor: '#1A0E0E',
                                    borderWidth: isSelected ? 1.5 : 0,
                                    borderColor: '#FCC434',
                                }}
                            >
                                <Text style={{ color: isSelected ? '#FFF' : '#777', fontSize: 14, fontWeight: '600' }}>
                                    {time}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <View
                    style={{
                        backgroundColor: '#0D0505',
                        borderTopWidth: 0.5,
                        borderTopColor: '#221515',
                        paddingHorizontal: 24,
                        paddingVertical: 16,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: 100,
                        borderRadius: 30
                    }}
                >
                    <View>
                        <Text style={{ color: '#888', fontSize: 16, marginBottom: 2 }}>Total</Text>
                        <Text style={{ color: '#FCC434', fontSize: 22, fontWeight: 'bold' }}>
                            {totalPrice.toLocaleString('vi-VN')} VND
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            navigation.navigate('payment', {
                                bookingData: {
                                    movie: MOVIES,
                                    date: `${selectedDate}.12.2022`,
                                    time: selectedTime,
                                    seats: selectedSeats,
                                    totalPrice: totalPrice,
                                    orderId: '78889377726',
                                },
                            });
                        }}
                        style={{
                            backgroundColor: '#FCC434',
                            paddingVertical: 16,
                            paddingHorizontal: 36,
                            borderRadius: 30,
                        }}
                    >
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
                            Buy ticket
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}