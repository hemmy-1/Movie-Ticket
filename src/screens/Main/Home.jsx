import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home({route}) {

  const username = route.params
  return (
    <SafeAreaView style={{backgroundColor:'black', flex:1, padding:10}}>
      <Text style={{color:'white'}}>Hi, {username} </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})