
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { UserIdetification } from '../pages/UserIdetification';
import { Confirmation } from '../pages/Confirmation';
import colors from '../styles/colors';

const StackRoutes = createStackNavigator();

export default function AppRoutes() {
  return (

    <StackRoutes.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white
        }
      }}>
      <StackRoutes.Screen name="Welcome" component={Welcome} />
      <StackRoutes.Screen name="UserIdetification" component={UserIdetification} />
      <StackRoutes.Screen name="Confirmation" component={Confirmation} />
    </StackRoutes.Navigator>

  );
}