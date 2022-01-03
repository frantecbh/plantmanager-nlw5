import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform, TouchableWithoutFeedback, Keyboard, Alert
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export function UserIdetification() {

  const navigation = useNavigation()

  const [isFocused, setIsFocused] = useState(false)
  const [isPreenchido, setIsPreenchido] = useState(false)
  const [name, setName] = useState<string>()




  async function handleSubmit() {

    if (!name)
      return Alert.alert('Me diz como chamar você 😥!')

    await AsyncStorage.setItem('@plantmanager:user', name)


    navigation.navigate('Confirmation')



  }


  function handleInputBlur() {
    setIsFocused(false)
    setIsPreenchido(!!name)
  }

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputChange(value: string) {
    setIsPreenchido(!!value)
    setName(value)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


          <View style={styles.content}>
            <View style={styles.form}>
              <Text style={styles.emoji}>
                {isPreenchido ? '😀' : '😄'}
              </Text>
              <Text style={styles.title}>Como podemos{'\n'}chamar você?</Text>
              <TextInput
                style={[styles.imput,
                (isFocused || isPreenchido) && { borderColor: colors.green }
                ]}
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}

              />
              <View style={styles.footer}>
                <Button title='Confirmar' onPress={handleSubmit} />

              </View>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center'
  },
  emoji: {
    fontSize: 44
  },
  imput: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20

  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20
  }

});
