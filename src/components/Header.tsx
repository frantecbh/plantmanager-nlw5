import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import colors from '../styles/colors'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage';

import userImage from '../assets/francisco.png'
import fonts from '../styles/fonts'


export function Header() {
  const [userName, setUsername] = useState<string>()

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem('@plantmanager:user')

      setUsername(user || '')
    }


    loadStorageUserName()

  }, [userName])


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.saudacao}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <Image source={userImage} style={styles.image} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,

    marginTop: getStatusBarHeight(),
    // padding: 20

  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35


  },
  saudacao: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text

  },
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40
  }
})
