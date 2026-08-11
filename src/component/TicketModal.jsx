import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TicketModal({ visible, onClose, ticket }) {
    if (!ticket) return null;

    const { movie, date, time, seats, totalPrice, orderId } = ticket;
    const formattedSeats = Array.isArray(seats) ? seats.join(', ') : seats;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <FontAwesome6 name="arrow-left" size={20} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My ticket</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.cardContainer}>
                        {/* Movie Info */}
                        <View style={styles.topSection}>
                            <Image
                                source={
                                    movie?.img
                                        ? typeof movie.img === 'string'
                                            ? { uri: movie.img }
                                            : movie.img
                                        : { uri: 'https://image.tmdb.org/t/p/w500/7WsyChLLEz33623R339R1X3y3p0.jpg' }
                                }
                                style={styles.poster}
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

                        {/* Grid Section */}
                        <View style={styles.gridSection}>
                            <View style={styles.gridItem}>
                                <MaterialCommunityIcons name="calendar-month-outline" size={28} color="#000" />
                                <View>
                                    <Text style={styles.gridMainText}>{time?.replace(':', 'h') + "'" || "14h15'"}</Text>
                                    <Text style={styles.gridSubText}>{date || '10.12.2022'}</Text>
                                </View>
                            </View>

                            <View style={styles.gridItem}>
                                <MaterialCommunityIcons name="seat-outline" size={28} color="#000" />
                                <View>
                                    <Text style={styles.gridMainText}>Section 4</Text>
                                    <Text style={styles.gridSubText}>Seat {formattedSeats || 'H7, H8'}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        {/* Details Section */}
                        <View style={styles.infoSection}>
                            <View style={styles.infoRow}>
                                <MaterialCommunityIcons name="cash-multiple" size={18} color="#333" />
                                <Text style={styles.boldText}>
                                    {totalPrice ? `${totalPrice.toLocaleString('vi-VN')} VND` : '210.000 VND'}
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

                        {/* Cutout Dividers */}
                        <View style={styles.cutoutContainer}>
                            <View style={styles.leftNotch} />
                            <View style={styles.dashedLine} />
                            <View style={styles.rightNotch} />
                        </View>

                        {/* Barcode Section */}
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
                            <Text style={styles.orderIdText}>Oder ID: {orderId || '78889377726'}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    closeBtn: {
        padding: 8,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginRight: 28,
    },
    scrollContent: {
        padding: 20,
    },
    cardContainer: {
        backgroundColor: '#FCECEB',
        borderRadius: 16,
        overflow: 'hidden',
        paddingTop: 16,
        paddingBottom: 12,
    },
    topSection: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 12,
    },
    poster: {
        width: 90,
        height: 120,
        borderRadius: 10,
    },
    movieDetails: {
        flex: 1,
        justifyContent: 'center',
        gap: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    subText: {
        fontSize: 12,
        color: '#444',
    },
    gridSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 18,
    },
    gridItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    gridMainText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#000',
    },
    gridSubText: {
        fontSize: 12,
        color: '#555',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5D3D2',
        marginHorizontal: 16,
        marginVertical: 14,
    },
    infoSection: {
        paddingHorizontal: 16,
        gap: 10,
    },
    infoRow: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
    },
    boldText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#111',
    },
    lightText: {
        fontSize: 11,
        color: '#555',
    },
    cutoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    leftNotch: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#000',
        marginLeft: -10,
    },
    rightNotch: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#000',
        marginRight: -10,
    },
    dashedLine: {
        flex: 1,
        height: 1,
        borderWidth: 1,
        borderColor: '#BBB',
        borderStyle: 'dashed',
    },
    barcodeSection: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 4,
    },
    barcodeContainer: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bar: {
        height: '100%',
        backgroundColor: '#000',
    },
    orderIdText: {
        fontSize: 11,
        color: '#444',
        marginTop: 6,
    },
});