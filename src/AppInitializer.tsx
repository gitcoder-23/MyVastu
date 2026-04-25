import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAppSelector } from './app/redux/hooks';
import { resetInterceptor } from './app/api/rootApi';
import AppStatusBar from './app_header/AppStatusBar';
import AppNavigation from './app_navigation/AppNavigation';
import { COLORS } from './constants/colors';
import SessionHandler from './SessionHandler';

export const AppInitializer = () => {
  const { accessToken } = useAppSelector(state => state.authApp);

  React.useEffect(() => {
    if (accessToken) {
      resetInterceptor(accessToken);
    }
  }, [accessToken]);
  return (
    <>
      <SessionHandler>
        <View style={styles.container}>
          <AppStatusBar
            backgroundColor={COLORS.darkCharcoal}
            barStyle="dark-content"
          />
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </View>
      </SessionHandler>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlack,
  },
});
