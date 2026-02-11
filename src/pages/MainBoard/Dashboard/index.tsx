import React, { ComponentProps } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppStatusBar from '../../../app_header/AppStatusBar';
import { COLORS } from '../../../constants/colors';
import { dashboardMenuItems } from '../../../constants/mock_data';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const navigation: any = useNavigation();

  const onServicePress = (id: number) => {
    if (id === 1) {
      navigation.navigate('Location');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppStatusBar
        backgroundColor={COLORS.backgroundLight}
        barStyle="dark-content"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Row */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.welcomeText}>Namaste,</Text>
            <Text style={styles.userName}>John Doe</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={COLORS.primaryRed}
            />
          </TouchableOpacity>
        </View>

        {/* Featured Vastu Score Card */}
        <View style={styles.mainCard}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Your Home Harmony</Text>
            <Text style={styles.cardScore}>houzez</Text>
            <Text style={styles.cardSubtitle}>Good Vastu Energy</Text>
          </View>
          <View style={styles.cardIconCircle}>
            <Ionicons name="sunny" size={50} color={COLORS.whiteColor} />
          </View>
        </View>

        {/* Section Title */}
        <Text style={styles.sectionTitle}>Explore Services</Text>

        {/* Grid Menu */}
        <View style={styles.gridContainer}>
          {dashboardMenuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuBox}
              activeOpacity={0.7}
              onPress={() => {
                onServicePress(item.id);
              }}
            >
              <View
                style={[
                  styles.iconBg,
                  { backgroundColor: COLORS.transparentColor },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={28}
                  color={COLORS.primaryRed}
                />
              </View>
              <Text style={styles.menuLabel}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily Tip Section */}
        <View style={styles.tipCard}>
          <Ionicons name="home-outline" size={24} color={COLORS.primaryRed} />
          <View style={styles.tipTextContainer}>
            <Text style={styles.tipTitle}>Daily Vastu Ads</Text>
            <Text style={styles.tipDescription}>
              Keep the North-East corner of your living room clean and
              clutter-free to attract positive energy.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  scrollContent: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  welcomeText: {
    fontSize: 16,
    color: COLORS.greyText,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryRed,
  },
  profileButton: {
    backgroundColor: COLORS.whiteColor,
    padding: 10,
    borderRadius: 12,
    elevation: 2,
    shadowColor: COLORS.primaryBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mainCard: {
    backgroundColor: COLORS.primaryRed,
    borderRadius: 24,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 8,
    shadowColor: COLORS.primaryRed,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    color: COLORS.whiteColor,
    fontSize: 16,
    fontWeight: '600',
  },
  cardScore: {
    color: COLORS.whiteColor,
    fontSize: 42,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  cardSubtitle: {
    color: COLORS.whiteColor,
    fontSize: 14,
    opacity: 0.9,
  },
  cardIconCircle: {
    backgroundColor: COLORS.transparentColor,
    padding: 15,
    borderRadius: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primaryRed,
    marginBottom: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuBox: {
    backgroundColor: COLORS.whiteColor,
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: COLORS.primaryBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  iconBg: {
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.greyText,
  },
  tipCard: {
    backgroundColor: COLORS.whiteColor,
    borderRadius: 18,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primaryRed,
  },
  tipTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primaryRed,
  },
  tipDescription: {
    fontSize: 13,
    color: COLORS.greyText,
    marginTop: 2,
    lineHeight: 18,
  },
});
