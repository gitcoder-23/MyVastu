import { StyleSheet, View } from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { COLORS } from '../constants/colors';
import { AppNavigationStackParamList } from './navigation_types';
import RegisterScreen from '../pages/AuthScreen/Register';

const Stack = createStackNavigator<AppNavigationStackParamList>();
const myOptions: StackNavigationOptions = {
  headerTintColor: COLORS.whiteColor,
  headerStyle: {
    backgroundColor: COLORS.primaryBlack,
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
        <Stack.Navigator initialRouteName="Register">
          <>
            {/* Authless Routes */}
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ ...myOptions, headerShown: false }}
            />
          </>
        </Stack.Navigator>
      </View>
    </>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
});
