import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const STORAGE_KEY = '@my_tickets';

const getLocalStorageItem = async (key) => {
  if (typeof localStorage === 'undefined' || localStorage === null) return null;
  return localStorage.getItem(key);
};

const TicketCard = ({ ticket }) => {
  const seats = ticket?.seats?.length ? ticket.seats.join(', ') : 'No seats selected';
  const price = ticket?.totalPrice ? `${ticket.totalPrice.toLocaleString('vi-VN')} VND` : '0 VND';

  return (
    <View style={styles.ticketCard}>
      <View style={styles.ticketHeader}>
        <Text style={styles.ticketTitle}>{ticket?.movie?.title || 'Movie Ticket'}</Text>
        <Text style={styles.orderText}>Order ID: {ticket?.orderId || '-'}</Text>
      </View>
      <View style={styles.ticketRow}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{ticket?.date || '-'}</Text>
      </View>
      <View style={styles.ticketRow}>
        <Text style={styles.label}>Time</Text>
        <Text style={styles.value}>{ticket?.time || '-'}</Text>
      </View>
      <View style={styles.ticketRow}>
        <Text style={styles.label}>Seats</Text>
        <Text style={styles.value}>{seats}</Text>
      </View>
      <View style={styles.ticketRow}>
        <Text style={styles.label}>Total</Text>
        <Text style={styles.value}>{price}</Text>
      </View>
    </View>
  );
};

export default function Ticket({ navigation }) {
  const [tickets, setTickets] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadTickets = async () => {
        try {
          const storedTickets = await getLocalStorageItem(STORAGE_KEY);
          if (storedTickets) {
            setTickets(JSON.parse(storedTickets));
          }
        } catch (e) {
          console.error(e);
        }
      };

      loadTickets();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome6 name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My ticket</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {tickets.length > 0 ? (
          tickets.map((ticketItem, index) => (
            <View key={ticketItem.orderId || index} style={styles.ticketWrapper}>
              <TicketCard ticket={ticketItem} />
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No tickets found.</Text>
        )}
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
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
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
  ticketWrapper: {
    marginBottom: 20,
  },
  emptyText: {
    color: '#AAA',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  ticketCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 16,
  },
  ticketHeader: {
    marginBottom: 14,
  },
  ticketTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  orderText: {
    color: '#8E8E93',
    fontSize: 12,
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    color: '#BBB',
    fontSize: 14,
  },
  value: {
    color: '#FFF',
    fontSize: 14,
    flexShrink: 1,
    textAlign: 'right',
  },
});