import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'

import { Button } from '../../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export function Confirmation() {

  const navigation = useNavigation()

  function handleMoveON() {
    navigation.navigate('PlantSelect')
  }

  return (
    <SafeAreaView style={styles.container}>


      <View style={styles.content}>

        <Text style={styles.emoji}>😃</Text>

        <Text style={styles.title}> Prontinho </Text>

        <Text style={styles.subtitle} >Agora vamos começar a cuidar das suas plantinhas com muito cuidado.</Text>

        <View style={styles.footer}>
          <Button title='Começar' onPress={handleMoveON} />
        </View>

      </View>



    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  emoji: {
    fontSize: 78
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '100%'
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15
  },

  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    textAlign: 'center',
    color: colors.heading,
    paddingVertical: 10

  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20

  }


})
