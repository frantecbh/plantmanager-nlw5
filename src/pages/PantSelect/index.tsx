import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import { EnviromentButton } from '../../components/EnviromentButton'
import { Header } from '../../components/Header'
import { PlantCardPrimary } from '../../components/PlantCardPrimary'
import { Load } from '../../components/Load'


import api from '../../services/api'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

interface EnvironmentProps {
  key: string,
  title: string
}

interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [
    string
  ];
  frequency: {
    times: number;
    repeat_every: string
  }

}

export default function PlantSelect() {
  const navigation = useNavigation()

  const [enviroments, setEnviroments] = useState<EnvironmentProps[]>([])
  const [plants, setPlants] = useState<PlantProps[]>([])
  //filtro
  const [filterPlants, setFilterPlants] = useState<PlantProps[]>([])

  const [enviromentsSelected, setEnviromentsSelected] = useState('all')

  const [loading, setLoading] = useState(true)


  function handleEnviromentSelected(enviroment: string) {

    setEnviromentsSelected(enviroment)

    if (enviroment === 'all')
      return setFilterPlants(plants)

    const filtered = plants.filter(plant => plant.environments.includes(enviroment))
    setFilterPlants(filtered)
  }

  async function fetchPlants() {
    const { data } = await api.get('plants?_sort=name&_order=asc')

    setPlants(data)
    setFilterPlants(data)
    setLoading(false)


  }

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api.get('plants_environments?_sort=title&_order=asc')

      // console.log(data)

      setEnviroments([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data

      ])


    }

    fetchEnviroment()
  }, [])


  useEffect(() => {


    fetchPlants()
  }, [])

  if (loading)
    return <Load />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>
      <View>
        <FlatList
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton title={item.title}
              active={item.key === enviromentsSelected}
              onPress={() => handleEnviromentSelected(item.key)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviornmentList}
        >

        </FlatList>

      </View>

      <View style={styles.plants}>
        <FlatList data={filterPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary data={item} />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}


        />


      </View>


    </View>
  )
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    backgroundColor: '#fff',

  },
  header: {
    padding: 30

  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 20

  },
  enviornmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32

  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  }
})
