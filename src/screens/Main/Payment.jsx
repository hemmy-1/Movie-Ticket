import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../../Constant/images';

const STORAGE_KEY = '@my_tickets';

const getLocalStorageItem = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        console.error('Error reading key:', key, error);
        return null;
    }
};

const setLocalStorageItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error('Error setting key:', key, error);
    }
};

const PAYMENT_METHODS = [
    { id: 'zalo', name: 'Zalo Pay', img: images.atm5 },
    { id: 'momo', name: 'MoMo', img: images.atm },
    { id: 'shopee', name: 'Shopee Pay', img: images.atm1 },
    { id: 'atm', name: 'ATM Card', img: images.atm2 },
    { id: 'card', name: 'International payments', subText: '(Visa, Master, JCB, Amex)', img: images.atm4 },
];

export default function PaymentScreen({ route }) {
    const { bookingData } = route?.params || {};
    const movie = bookingData?.movie || {};
    const navigation = useNavigation();

    const [isTicketModal, setTicketModal] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('shopee');
    const [discountCode, setDiscountCode] = useState('');
    const [timeLeft, setTimeLeft] = useState(900);
    const [activeTicket, setActiveTicket] = useState(null);

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

    const handlePaymentSuccess = async () => {
        try {
            // Generate unique identifiers for this transaction
            const uniqueOrderId = bookingData?.orderId || `${Math.floor(10000000000 + Math.random() * 90000000000)}`;
            const uniqueTicketId = `TICKET_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

            const newTicket = {
                ...bookingData,
                id: uniqueTicketId,
                orderId: uniqueOrderId,
                ticketName: `${movie?.title || 'Movie'} Ticket - ${uniqueOrderId.slice(-4)}`,
                purchaseTimestamp: new Date().toISOString(),
                paymentMethod: selectedMethod,
            };

            const existingTicketsRaw = await getLocalStorageItem(STORAGE_KEY);
            const existingTickets = existingTicketsRaw ? JSON.parse(existingTicketsRaw) : [];
            const updatedTickets = [newTicket, ...existingTickets];

            await setLocalStorageItem(STORAGE_KEY, JSON.stringify(updatedTickets));

            // Set current ticket to render in the Modal
            setActiveTicket(newTicket);
            setTicketModal(true);
        } catch (error) {
            console.error('Failed to save ticket:', error);
        }
    };

    const displayedTicket = activeTicket || bookingData;

    return (
        <SafeAreaView style={styles.container}>
            {/* Main Header */}
            <View style={styles.mainHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <FontAwesome6 name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.screenTitle}>Payment</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Movie Info Card */}
                <View style={styles.card}>
                    <Image source={movie.img} style={styles.poster} resizeMode="cover" />
                    <View style={styles.cardDetails}>
                        <Text style={styles.movieTitle} numberOfLines={1}>{movie.title}</Text>
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
                <View style={{ marginTop: 10, gap: 7 }}>
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

                    {/* Discount Input */}
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
                                style={[styles.methodCard, isSelected && styles.selectedMethodCard]}
                            >
                                <Image source={method.img} style={styles.methodLogo} resizeMode="contain" />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.methodName}>{method.name}</Text>
                                    {method.subText && <Text style={styles.methodSubText}>{method.subText}</Text>}
                                </View>
                                <FontAwesome6 name="chevron-right" size={14} color="#8E8E93" />
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Countdown & Action */}
                <View style={{ marginTop: 10 }}>
                    <View style={styles.timerBanner}>
                        <Text style={styles.timerText}>Complete your payment in</Text>
                        <Text style={styles.timerCount}>{formatTimer(timeLeft)}</Text>
                    </View>
                    <TouchableOpacity onPress={handlePaymentSuccess} activeOpacity={0.8} style={styles.continueBtn}>
                        <Text style={styles.continueBtnText}>Continue</Text>
                    </TouchableOpacity>
                </View>

                {/* Ticket Modal */}
                <Modal
                    visible={isTicketModal}
                    animationType="slide"
                    transparent={false}
                    onRequestClose={() => setTicketModal(false)}
                >
                    <SafeAreaView style={styles.modalOverlay}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={() => setTicketModal(false)} style={styles.backBtn}>
                                <FontAwesome6 name="arrow-left" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.modalHeaderTitle}>My ticket</Text>
                        </View>

                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            <View style={styles.cardContainer}>
                                <View style={styles.topSection}>
                                    <Image
                                        source={
                                            movie?.img
                                                ? typeof movie.img === 'string'
                                                    ? { uri: movie.img }
                                                    : movie.img
                                                : { uri: 'https://image.tmdb.org/t/p/w500/7WsyChLLEz33623R339R1X3y3p0.jpg' }
                                        }
                                        style={styles.modalPoster}
                                    />
                                    <View style={styles.movieDetails}>
                                        <Text style={styles.title}>{movie?.title || 'Avengers: Infinity War'}</Text>
                                        <View style={styles.row}>
                                            <MaterialCommunityIcons name="clock-outline" size={14} color="#555" />
                                            <Text style={styles.subText}>{movie?.duration || '2 hours 29 minutes'}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <MaterialCommunityIcons name="video-outline" size={14} color="#555" />
                                            <Text style={styles.subText}>{movie?.genre || 'Action, adventure, sci-fi'}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.gridSection}>
                                    <View style={styles.gridItem}>
                                        <MaterialCommunityIcons name="calendar-month-outline" size={28} color="#000" />
                                        <View>
                                            <Text style={styles.gridMainText}>
                                                {displayedTicket?.time ? displayedTicket.time.replace(':', 'h') + "'" : "14h15'"}
                                            </Text>
                                            <Text style={styles.gridSubText}>{displayedTicket?.date || '10.12.2022'}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.gridItem}>
                                        <MaterialCommunityIcons name="seat-outline" size={28} color="#000" />
                                        <View>
                                            <Text style={styles.gridMainText}>Section 4</Text>
                                            <Text style={styles.gridSubText}>Seat {formattedSeats}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.modalDivider} />

                                <View style={styles.infoSection}>
                                    <View style={styles.infoRow}>
                                        <MaterialCommunityIcons name="cash-multiple" size={18} color="#333" />
                                        <Text style={styles.boldText}>
                                            {displayedTicket?.totalPrice
                                                ? `${displayedTicket.totalPrice.toLocaleString('vi-VN')} VND`
                                                : '210.000 VND'}
                                        </Text>
                                    </View>

                                    <View style={styles.infoRow}>
                                        <MaterialCommunityIcons name="map-marker-outline" size={18} color="#333" />
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.boldText}>
                                                {movie?.cinemaName || 'Vincom Ocean Park'}{' '}
                                                <Text style={{ color: '#E50914', fontWeight: 'bold' }}>CGV</Text>
                                            </Text>
                                            <Text style={styles.lightText}>
                                                4th floor, Vincom Ocean Park, Da Ton, Gia Lam, Ha Noi
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.infoRow}>
                                        <MaterialCommunityIcons name="clipboard-text-outline" size={18} color="#333" />
                                        <Text style={styles.lightText}>
                                            Show this QR code to the ticket counter to receive your ticket
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.cutoutContainer}>
                                    <View style={styles.leftNotch} />
                                    <View style={styles.dashedLine} />
                                    <View style={styles.rightNotch} />
                                </View>

                                <View style={styles.barcodeSection}>
                                    <View style={styles.barcodeContainer}>
                                        {Array.from({ length: 32 }).map((_, i) => (
                                            <View
                                                key={i}
                                                style={[
                                                    styles.bar,
                                                    { width: i % 3 === 0 ? 3 : i % 2 === 0 ? 1.5 : 2.5, marginRight: i % 4 === 0 ? 3 : 1.5 },
                                                ]}
                                            />
                                        ))}
                                    </View>
                                    <Text style={styles.orderIdText}>Order ID: {displayedTicket?.orderId}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    mainHeader: { marginTop: 10, flexDirection: 'row', alignItems: 'center' },
    backBtn: { padding: 10, borderRadius: 10 },
    screenTitle: { flex: 1, textAlign: 'center', color: 'white', fontSize: 28, fontWeight: '800', paddingRight: 30 },
    scrollContent: { padding: 20, paddingBottom: 30 },
    card: { backgroundColor: '#1C1C1E', borderRadius: 16, flexDirection: 'row', gap: 12, marginBottom: 20, height: 141, alignItems: 'center' },
    poster: { width: 100, height: 141, borderRadius: 10 },
    cardDetails: { flex: 1, justifyContent: 'center', gap: 6 },
    movieTitle: { color: '#FCC434', fontSize: 20, fontWeight: 'bold' },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    infoText: { color: '#E6E6E6', fontSize: 12 },
    detailsGroup: { gap: 12, marginBottom: 16 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between' },
    detailLabel: { color: '#E6E6E6', fontSize: 16 },
    detailValue: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
    discountContainer: { flexDirection: 'row', gap: 10, marginBottom: 20, height: 40 },
    inputWrapper: { flex: 1, backgroundColor: '#1C1C1E', borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
    textInput: { flex: 1, color: '#FFF', marginLeft: 8, fontSize: 14 },
    applyBtn: { backgroundColor: '#FCC434', paddingHorizontal: 24, justifyContent: 'center', borderRadius: 10 },
    applyBtnText: { color: '#000', fontWeight: 'bold', fontSize: 14 },
    divider: { height: 1, backgroundColor: '#222', marginBottom: 20 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    totalLabel: { color: '#AAA', fontSize: 16 },
    totalValue: { color: '#FCC434', fontSize: 24, fontWeight: 'bold' },
    sectionTitle: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 14 },
    methodsContainer: { gap: 12, marginBottom: 24 },
    methodCard: { backgroundColor: '#1C1C1E', borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: 'transparent', height: 100 },
    selectedMethodCard: { borderColor: '#FCC434' },
    methodLogo: { width: 84, height: 48, borderRadius: 6, marginRight: 12 },
    methodName: { color: '#FFF', fontSize: 16, fontWeight: '600' },
    methodSubText: { color: '#8E8E93', fontSize: 11, marginTop: 2 },
    timerBanner: { backgroundColor: '#1E180A', borderRadius: 12, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    timerText: { color: '#DDD', fontSize: 14 },
    timerCount: { color: '#FCC434', fontSize: 16, fontWeight: 'bold' },
    continueBtn: { backgroundColor: '#FCC434', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
    continueBtnText: { color: '#000', fontSize: 18, fontWeight: 'bold' },

    // Modal Specific Styles
    modalOverlay: { flex: 1, backgroundColor: '#000' },
    modalHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
    modalHeaderTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold', flex: 1, textAlign: 'center', marginRight: 28 },
    cardContainer: { backgroundColor: '#FCECEB', borderRadius: 16, overflow: 'hidden', paddingTop: 16, paddingBottom: 12 },
    topSection: { flexDirection: 'row', paddingHorizontal: 16, gap: 12 },
    modalPoster: { width: 90, height: 120, borderRadius: 10 },
    movieDetails: { flex: 1, justifyContent: 'center', gap: 6 },
    title: { fontSize: 16, fontWeight: 'bold', color: '#000' },
    row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    subText: { fontSize: 12, color: '#444' },
    gridSection: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 18 },
    gridItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    gridMainText: { fontWeight: 'bold', fontSize: 14, color: '#000' },
    gridSubText: { fontSize: 12, color: '#555' },
    modalDivider: { height: 1, backgroundColor: '#E5D3D2', marginHorizontal: 16, marginVertical: 14 },
    infoSection: { paddingHorizontal: 16, gap: 10 },
    boldText: { fontSize: 13, fontWeight: 'bold', color: '#111' },
    lightText: { fontSize: 11, color: '#555' },
    cutoutContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
    leftNotch: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#000', marginLeft: -10 },
    rightNotch: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#000', marginRight: -10 },
    dashedLine: { flex: 1, height: 1, borderWidth: 1, borderColor: '#BBB', borderStyle: 'dashed' },
    barcodeSection: { alignItems: 'center', paddingHorizontal: 20, paddingTop: 4 },
    barcodeContainer: { flexDirection: 'row', height: 50, alignItems: 'center', justifyContent: 'center' },
    bar: { height: '100%', backgroundColor: '#000' },
    orderIdText: { fontSize: 11, color: '#444', marginTop: 6 },
});