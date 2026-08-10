import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import images from '../../Constant/images';

const PAYMENT_METHODS = [
    {
        id: 'zalo',
        name: 'Zalo Pay',
        img: images.atm5
    },
    {
        id: 'momo',
        name: 'MoMo',
        img: images.atm
    },
    {
        id: 'shopee',
        name: 'Shopee Pay',
        img: images.atm1
    },
    {
        id: 'atm',
        name: 'ATM Card',
        img: images.atm2
    },
    {
        id: 'card',
        name: 'International payments',
        subText: '(Visa, Master, JCB, Amex)',
        img: images.atm4
    },
];

export default function PaymentScreen({ route }) {
    const { bookingData } = route?.params || {};
    const movie = bookingData?.movie || {};
    const navigation = useNavigation();

    const [selectedMethod, setSelectedMethod] = useState('shopee');
    const [discountCode, setDiscountCode] = useState('');
    const [timeLeft, setTimeLeft] = useState(900); // 15:00 countdown timer

    useEffect(() => {
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    const formatTimer = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formattedSeats = bookingData?.seats?.length
        ? bookingData.seats.join(', ')
        : 'None';

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10, borderRadius: 10 }}>
                    <FontAwesome6 name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: 28, fontWeight: '800', paddingRight: 30 }}>Payment</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Movie Info Card */}
                <View style={styles.card}>
                    <Image
                        source={movie.img}
                        style={styles.poster}
                        resizeMode="cover"
                    />
                    <View style={styles.cardDetails}>
                        <Text style={styles.movieTitle} numberOfLines={1}>
                            {movie.title}
                        </Text>
                        <View style={{ marginTop: 10, gap: 7 }}>

                            <View style={styles.infoRow}>
                                <MaterialCommunityIcons name="video-outline" size={14} color="#E6E6E6" />
                                <Text style={styles.infoText} numberOfLines={1}>
                                    {movie.genre || 'Action, adventure, sci-fi'}
                                </Text>
                            </View>

                            <View style={styles.infoRow}>
                                <MaterialCommunityIcons name="map-marker-outline" size={14} color="#E6E6E6" />
                                <Text style={styles.infoText} numberOfLines={1}>
                                    {movie.cinemaName || 'Vincom Ocean Park CGV'}
                                </Text>
                            </View>

                            <View style={styles.infoRow}>
                                <MaterialCommunityIcons name="clock-outline" size={14} color="#E6E6E6" />
                                <Text style={styles.infoText}>
                                    {bookingData?.date} • {bookingData?.time}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Order Details */}
                <View style={{ marginTop: 10, gap: 7 }} >

                    <View style={styles.detailsGroup}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Order ID</Text>
                            <Text style={styles.detailValue}>{bookingData?.orderId || '78889377726'}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Seat</Text>
                            <Text style={styles.detailValue}>{formattedSeats}</Text>
                        </View>
                    </View>

                    {/* Discount Code */}
                    <View style={styles.discountContainer}>
                        <View style={styles.inputWrapper}>
                            <MaterialCommunityIcons name="ticket-percent-outline" size={20} color="#8E8E93" />
                            <TextInput
                                value={discountCode}
                                onChangeText={setDiscountCode}
                                placeholder="discount code"
                                placeholderTextColor="#555"
                                style={styles.textInput}
                            />
                        </View>

                        <TouchableOpacity style={styles.applyBtn}>
                            <Text style={styles.applyBtnText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Total Price */}
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>
                        {bookingData?.totalPrice
                            ? `${bookingData.totalPrice.toLocaleString('vi-VN')} VND`
                            : '0 VND'}
                    </Text>
                </View>

                {/* Payment Methods */}
                <Text style={styles.sectionTitle}>Payment Method</Text>

                <View style={styles.methodsContainer}>
                    {PAYMENT_METHODS.map((method) => {
                        const isSelected = selectedMethod === method.id;
                        return (
                            <TouchableOpacity
                                key={method.id}
                                activeOpacity={0.8}
                                onPress={() => setSelectedMethod(method.id)}
                                style={[
                                    styles.methodCard,
                                    isSelected && styles.selectedMethodCard,
                                ]}
                            >
                                <Image
                                    source={method.img}
                                    style={styles.methodLogo}
                                    resizeMode="contain"
                                />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.methodName}>{method.name}</Text>
                                    {method.subText && (
                                        <Text style={styles.methodSubText}>{method.subText}</Text>
                                    )}
                                </View>
                                <FontAwesome6 name="chevron-right" size={14} color="#8E8E93" />
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Countdown Timer Banner */}
                <View style={{ marginTop: 10, }}>

                    <View style={styles.timerBanner}>
                        <Text style={styles.timerText}>Complete your payment in</Text>
                        <Text style={styles.timerCount}>{formatTimer(timeLeft)}</Text>
                    </View>

                    
                    <TouchableOpacity activeOpacity={0.8} style={styles.continueBtn}>
                        <Text style={styles.continueBtnText}>Continue</Text>
                    </TouchableOpacity>
                </View>

                
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    backBtn: {
        padding: 8,
        zIndex: 10,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginRight: 28,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 30,
    },
    card: {
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        // padding: 12,
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
        height: 141,
        alignItems: 'center'
    },
    poster: {
        width: 100,
        height: 141,
        borderRadius: 10,
    },
    cardDetails: {
        flex: 1,
        justify: 'center',
        gap: 6,
    },
    movieTitle: {
        color: '#FCC434',
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    infoText: {
        color: '#E6E6E6',
        fontSize: 12,
    },
    detailsGroup: {
        gap: 12,
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailLabel: {
        color: '#E6E6E6',
        fontSize: 16,
    },
    detailValue: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    discountContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
        height: 40
    },
    inputWrapper: {
        flex: 1,
        backgroundColor: '#1C1C1E',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    textInput: {
        flex: 1,
        color: '#FFF',
        marginLeft: 8,
        fontSize: 14,
    },
    applyBtn: {
        backgroundColor: '#FCC434',
        paddingHorizontal: 24,
        justifyContent: 'center',
        borderRadius: 10,
    },
    applyBtnText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: '#222',
        marginBottom: 20,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    totalLabel: {
        color: '#AAA',
        fontSize: 16,
    },
    totalValue: {
        color: '#FCC434',
        fontSize: 24,
        fontWeight: 'bold',
    },
    sectionTitle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 14,
    },
    methodsContainer: {
        gap: 12,
        marginBottom: 24,
        
    },
    methodCard: {
        backgroundColor: '#1C1C1E',
        borderRadius: 14,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'transparent',
        height: 100
    },
    selectedMethodCard: {
        borderColor: '#FCC434',
    },
    methodLogo: {
        width: 84,
        height: 48,
        borderRadius: 6,
        marginRight: 12,
    },
    methodName: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    methodSubText: {
        color: '#8E8E93',
        fontSize: 11,
        marginTop: 2,
    },
    timerBanner: {
        backgroundColor: '#1E180A',
        borderRadius: 12,
        padding: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    timerText: {
        color: '#DDD',
        fontSize: 14,
    },
    timerCount: {
        color: '#FCC434',
        fontSize: 16,
        fontWeight: 'bold',
    },
    continueBtn: {
        backgroundColor: '#FCC434',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    continueBtnText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});