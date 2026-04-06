import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
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
import ContactUs from '../pages/MainBoard/ContactUs';
import { useAppDispatch, useAppSelector } from '../app/redux/hooks';
import { resetInterceptor } from '../app/api/rootApi';
import SidePlanView from '../pages/MainBoard/SidePlanView';
import AppWebView from '../pages/AppWebView';
import { GetProfileAction } from '../app/redux/actions/authAction';

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
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector(state => state.authApp);
  console.log('@@@accessToken-nav', accessToken);

  useEffect(() => {
    if (accessToken) {
      resetInterceptor(accessToken);
      dispatch(GetProfileAction({}));
    }
  }, [accessToken]);

  return (
    <>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName={accessToken ? 'Dashboard' : 'Login'}>
          {accessToken ? (
            <Stack.Group>
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
              <Stack.Screen
                name="ContactUs"
                component={ContactUs}
                options={{ ...myOptions, headerShown: true, title: 'Profile' }}
              />
              <Stack.Screen
                name="SidePlanView"
                component={SidePlanView}
                options={{
                  ...myOptions,
                  headerShown: true,
                  title: 'View Plan',
                }}
              />
              <Stack.Screen
                name="AppWebView"
                component={AppWebView}
                // component={(webUrl: string) => <AppWebView webUrl={webUrl} />}
                options={{
                  ...myOptions,
                  headerShown: true,
                  title: 'Vastu Analysis',
                }}
              />
            </Stack.Group>
          ) : (
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ ...myOptions }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ ...myOptions }}
              />
            </Stack.Group>
          )}
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
