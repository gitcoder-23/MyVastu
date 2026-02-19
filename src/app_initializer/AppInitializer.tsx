import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from '../app_navigation/AppNavigation';
import { COLORS } from '../constants/colors';
import AppStatusBar from '../app_header/AppStatusBar';

export const AppInitializer = () => {
  return (
    <>
      <View style={styles.container}>
        <AppStatusBar backgroundColor={COLORS.black4} barStyle="dark-content" />
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlack,
  },
});
