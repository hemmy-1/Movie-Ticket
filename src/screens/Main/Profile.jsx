import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#120A08" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Profile Section */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250' }}
              style={styles.avatar}
            />
          </View>

          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>Angelina</Text>
              <TouchableOpacity style={styles.editButton}>
                <Octicons name="pencil" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.contactRow}>
              <Ionicons name="call-outline" size={14} color="#8E8E93" />
              <Text style={styles.contactText}>(704) 555-0127</Text>
            </View>

            <View style={styles.contactRow}>
              <Ionicons name="mail-outline" size={14} color="#8E8E93" />
              <Text style={styles.contactText}>angelina@example.com</Text>
            </View>
          </View>
        </View>

        {/* Menu Options List */}
        <View style={styles.menuContainer}>
          {/* My Ticket */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialCommunityIcons name="ticket-confirmation-outline" size={24} color="#FFFFFF" />
              <Text style={styles.menuText}>My ticket</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>

          {/* Payment History */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
              <Text style={styles.menuText}>Payment history</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>

          {/* Change Language */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialCommunityIcons name="translate" size={24} color="#FFFFFF" />
              <Text style={styles.menuText}>Change language</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>

          {/* Change Password */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="lock-closed-outline" size={24} color="#FFFFFF" />
              <Text style={styles.menuText}>Change password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>

          {/* Face ID / Touch ID Switch */}
          <View style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialCommunityIcons name="face-recognition" size={24} color="#FFFFFF" />
              <Text style={styles.menuText}>Face ID / Touch ID</Text>
            </View>
            <Switch
              trackColor={{ false: '#241410', true: '#FFB800' }}
              thumbColor={isBiometricEnabled ? '#FFFFFF' : '#8E8E93'}
              onValueChange={() => setIsBiometricEnabled((prev) => !prev)}
              value={isBiometricEnabled}
            />
          </View>
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120A08',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  editButton: {
    padding: 4,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  contactText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  menuContainer: {
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#241410',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#180E0C',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#241410',
  },
  navItem: {
    alignItems: 'center',
  },
});