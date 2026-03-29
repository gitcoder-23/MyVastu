import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants/colors';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AppWebView = () => {
  const route: any = useRoute();
  const navigation = useNavigation();
  const { webUrl } = route.params;
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.whiteColor }}>
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={COLORS.black1} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vastu Result</Text>
      </View> */}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  loadingContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
