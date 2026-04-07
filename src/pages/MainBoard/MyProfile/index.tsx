import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Avatar } from '@kolking/react-native-avatar';
import { COLORS } from '../../../constants/colors';
import AppStatusBar from '../../../app_header/AppStatusBar';
import { useAppDispatch, useAppSelector } from '../../../app/redux/hooks';
import { GetProfileAction } from '../../../app/redux/actions/profileAction';

const MyProfile = () => {
  const dispatch = useAppDispatch();

  const { accessToken } = useAppSelector(state => state.authApp);

  const { profileResponse } = useAppSelector(state => state.profile);

  useEffect(() => {
    dispatch(GetProfileAction({}));
  }, []);

  const makeCall = (phoneNumber: string) => {
    const url = `tel:${phoneNumber.replace(/[^\d]/g, '')}`;
    Linking.openURL(url);
  };

  const makeEmail = (email: string) => {
    const url = `mailto:${email}`;
    Linking.openURL(url);
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(GetProfileAction({})).unwrap();
    }
  }, [accessToken, dispatch]);

  return (
    <View style={styles.container}>
      <AppStatusBar
        backgroundColor={COLORS.darkCharcoal}
        barStyle="light-content"
      />

      <View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.profileCard}>
            <Avatar
              name={profileResponse?.data?.name || 'User'}
              size={80}
              textStyle={{ fontWeight: 'bold' }}
              style={styles.agentImage}
            />

            <Text style={styles.agentName}>{profileResponse?.data?.name}</Text>
            <View style={styles.redUnderline} />
          </View>

          {/* Contact Methods */}
          <View style={styles.infoSection}>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => makeCall(profileResponse?.data?.mobile || '')}
            >
              <View style={styles.iconCircle}>
                <Ionicons name="call" size={22} color={COLORS.primaryRed} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Primary Phone</Text>
                <Text style={styles.value}>
                  {profileResponse?.data?.mobile}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.lightGreyText}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => makeEmail(profileResponse?.data?.email || '')}
            >
              <View style={styles.iconCircle}>
                <Ionicons name="mail" size={22} color={COLORS.primaryRed} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{profileResponse?.data?.email}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.lightGreyText}
              />
            </TouchableOpacity>
            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statsItem}>
                <View style={styles.statsIconCircle}>
                  <Ionicons name="search" size={20} color={COLORS.primaryRed} />
                </View>
                <View style={styles.statsTextContainer}>
                  <Text style={styles.statsLabel}>Room Searches</Text>
                  <Text style={styles.statsValue}>
                    {profileResponse?.data?.total_room_search || 0}
                  </Text>
                </View>
              </View>

              <View style={[styles.statsItem, { marginLeft: 15 }]}>
                <View style={styles.statsIconCircle}>
                  <Ionicons
                    name="cloud-upload"
                    size={20}
                    color={COLORS.primaryRed}
                  />
                </View>
                <View style={styles.statsTextContainer}>
                  <Text style={styles.statsLabel}>Total Uploads</Text>
                  <Text style={styles.statsValue}>
                    {profileResponse?.data?.total_uploads || 0}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  header: {
    backgroundColor: COLORS.darkCharcoal,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    color: COLORS.whiteColor,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileCard: {
    marginTop: 20,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
    shadowColor: COLORS.primaryBlack,
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  agentImage: {
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.primaryRed,
    marginBottom: 20,
  },
  agentName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.darkCharcoal,
  },
  agentTitle: {
    fontSize: 14,
    color: COLORS.greyText,
    marginTop: 4,
  },
  redUnderline: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.primaryRed,
    marginTop: 15,
    borderRadius: 2,
  },
  infoSection: {
    marginTop: 25,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.whiteColor,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: COLORS.primaryBlack,
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: COLORS.secondaryRed,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: COLORS.lightGreyText,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 15,
    color: COLORS.darkCharcoal,
    fontWeight: '600',
    marginTop: 2,
  },
  //
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  statsItem: {
    flex: 1, // Ensures both boxes take equal width
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.whiteColor,
    padding: 12,
    borderRadius: 15,
    elevation: 2,
    shadowColor: COLORS.primaryBlack,
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  statsIconCircle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: COLORS.secondaryRed,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  statsTextContainer: {
    flex: 1,
  },
  statsLabel: {
    fontSize: 10,
    color: COLORS.lightGreyText,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  statsValue: {
    fontSize: 16,
    color: COLORS.darkCharcoal,
    fontWeight: 'bold',
    marginTop: 1,
  },
});
