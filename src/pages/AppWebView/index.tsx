import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';

const AppWebView = () => {
  const route: any = useRoute();

  const { webUrl } = route.params;
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.whiteColor }}>
      <WebView
        source={{ uri: webUrl }}
        style={{ flex: 1 }}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <Text style={{ color: COLORS.black1 }}>Loading Vastu...</Text>
          </View>
        )}
      />
    </View>
  );
};

export default AppWebView;

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
