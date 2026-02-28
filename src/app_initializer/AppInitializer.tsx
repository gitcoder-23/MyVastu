// app_initializer/AppInitializer.tsx
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from '../app_navigation/AppNavigation';
import { COLORS } from '../constants/colors';
import AppStatusBar from '../app_header/AppStatusBar';
import { useAppSelector, useAppDispatch } from '../app/redux/hooks';
import { resetInterceptor } from '../app/api/rootApi';
import React, { useEffect, useState } from 'react';
import {
  loadTokensFromStorage,
  restoreTokens,
} from '../app/redux/slices/authAppSlice';

export const AppInitializer = () => {
  const dispatch = useAppDispatch();
  const { accessToken, refreshToken } = useAppSelector(state => state.authApp);
  const [isLoading, setIsLoading] = useState(true);

  // Load tokens from AsyncStorage on app start
  useEffect(() => {
    const loadStoredTokens = async () => {
      try {
        const tokens = await loadTokensFromStorage();
        if (tokens?.accessToken && tokens?.refreshToken) {
          dispatch(restoreTokens(tokens));
        }
      } catch (error) {
        console.error('Error loading stored tokens:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredTokens();
  }, [dispatch]);

  // Reset interceptor when accessToken changes
  useEffect(() => {
    if (accessToken) {
      resetInterceptor(accessToken);
    } else {
      resetInterceptor('');
    }
  }, [accessToken]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <AppStatusBar
          backgroundColor={COLORS.darkCharcoal}
          barStyle="dark-content"
        />
        <ActivityIndicator size="large" color={COLORS.primaryRed} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppStatusBar
        backgroundColor={COLORS.darkCharcoal}
        barStyle="dark-content"
      />
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlack,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// import { StyleSheet, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigation from '../app_navigation/AppNavigation';
// import { COLORS } from '../constants/colors';
// import AppStatusBar from '../app_header/AppStatusBar';
// import { useAppSelector } from '../app/redux/hooks';
// import { resetInterceptor } from '../app/api/rootApi';
// import React from 'react';

// export const AppInitializer = () => {
//   const { accessToken, refreshToken } = useAppSelector(state => state.authApp);

//   React.useEffect(() => {
//     if (accessToken) {
//       resetInterceptor(accessToken);
//     }
//   }, [accessToken]);
//   return (
//     <>
//       <View style={styles.container}>
//         <AppStatusBar
//           backgroundColor={COLORS.darkCharcoal}
//           barStyle="dark-content"
//         />
//         <NavigationContainer>
//           <AppNavigation />
//         </NavigationContainer>
//       </View>
//     </>
//   );
// };``

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.primaryBlack,
//   },
// });
