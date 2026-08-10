import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import TicketCard from './TicketCard'; // Import the component

export default function Ticket({ navigation }) {
  const [tickets, setTickets] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadTickets = async () => {
        try {
          const storedTickets = await AsyncStorage.getItem('@my_tickets');
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 20,
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
});