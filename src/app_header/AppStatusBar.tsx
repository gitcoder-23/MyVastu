import { StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';

// const STATUSBAR_HEIGHT = StatusBar.currentHeight;

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
    <StatusBar
      translucent
      backgroundColor={backgroundColor}
      barStyle={barStyle}
      {...props}
    />
  </View>
);

export default AppStatusBar;

const styles = StyleSheet.create({
  statusBar: {
    // height: STATUSBAR_HEIGHT,
  },
});
