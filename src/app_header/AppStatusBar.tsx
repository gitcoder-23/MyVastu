import { StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

type AppStatusBarType = {
  backgroundColor: string | any;
  barStyle?: string | any;
};

const AppStatusBar = ({
  backgroundColor,
  barStyle,
  ...props
}: AppStatusBarType) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        barStyle={barStyle}
        {...props}
      />
    </SafeAreaView>
  </View>
);

export default AppStatusBar;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
