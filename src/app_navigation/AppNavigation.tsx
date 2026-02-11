import { StyleSheet, View } from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { COLORS } from '../constants/colors';
import { AppNavigationStackParamList } from './navigation_types';
import RegisterScreen from '../pages/AuthScreen/Register';
import LoginScreen from '../pages/AuthScreen/Login';
import DashboardScreen from '../pages/MainBoard/Dashboard';
import HouseSearch from '../pages/MainBoard/HouseSearch';

const Stack = createStackNavigator<AppNavigationStackParamList>();
const myOptions: StackNavigationOptions = {
  headerTintColor: COLORS.whiteColor,
  headerStyle: {
    backgroundColor: COLORS.primaryRed,
  },
  headerTitleAlign: 'left',
  headerTitleStyle: {
    fontSize: 20,
    color: COLORS.whiteColor,
  },
  headerBackTitle: '',
};

const AppNavigation = () => {
  return (
    <>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ ...myOptions, headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ ...myOptions, headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ ...myOptions, headerShown: false }}
          />
          <Stack.Screen
            name="Location"
            component={HouseSearch}
            options={{ ...myOptions, headerShown: true }}
          />
        </Stack.Navigator>
      </View>
    </>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
});
