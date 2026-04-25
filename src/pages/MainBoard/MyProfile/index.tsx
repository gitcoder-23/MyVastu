import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Avatar } from '@kolking/react-native-avatar';
import { COLORS } from '../../../constants/colors';
import AppStatusBar from '../../../app_header/AppStatusBar';
import { useAppDispatch, useAppSelector } from '../../../app/redux/hooks';
import {
  GetCreditAction,
  GetProfileAction,
  PostPurchaseCreditAction,
} from '../../../app/redux/actions/profileAction';
import { CREDIT_LIST } from '../../../constants/mock_data';

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const [selectedCreditId, setSelectedCreditId] = useState<
    string | number | null
  >(null);

  const { accessToken } = useAppSelector(state => state.authApp);

  const { profileResponse, creditResponse } = useAppSelector(
    state => state.profile,
  );

  useEffect(() => {
    dispatch(GetProfileAction({}));
    dispatch(GetCreditAction({}));
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

  const isCreditAvailable = !!(
    creditResponse?.data?.credits && creditResponse?.data?.credits > 0
  );

  const handleCreditPurchase = (amount: number, id: string | number) => {
    console.log('amount', amount);
    setSelectedCreditId(id);
    dispatch(PostPurchaseCreditAction({ amount }))
      .unwrap()
      .then(res => {
        dispatch(GetCreditAction({}));
        Alert.alert(`Success`, 'Credit Added Successfully');
      })
      .catch(() => {
        Alert.alert(`Failed`, 'Credit Not Added.');
        setSelectedCreditId(null);
      });
  };

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

            <Text style={styles.creditTitle}>
              Credit Point:{' '}
              <Text style={styles.creditValue}>
                {creditResponse?.data?.credits}
              </Text>
            </Text>
          </View>
          <View>
            <Text style={styles.buyTitle}>Buy Credits</Text>

            <View style={styles.creditSelectionRow}>
              {CREDIT_LIST.map(amount => {
                const isSelected = selectedCreditId === amount.id;

                return (
                  <TouchableOpacity
                    key={amount.id}
                    // disabled={isCreditAvailable}
                    style={[
                      styles.creditCard,
                      // isCreditAvailable && {
                      //   opacity: 0.5,
                      //   borderColor: COLORS.inputBorder,
                      // },
                      isSelected &&
                        !isCreditAvailable && {
                          borderColor: COLORS.primaryRed,
                          borderWidth: 1,
                        },
                    ]}
                    onPress={() =>
                      handleCreditPurchase(amount.value, amount.id)
                    }
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="add-circle"
                      size={18}
                      color={COLORS.primaryRed}
                      // color={
                      //   isCreditAvailable ? COLORS.iconGrey : COLORS.primaryRed
                      // }
                    />
                    <Text style={styles.creditCardLabel}>Credit</Text>
                    <Text
                      style={[
                        styles.creditCardValue,
                        isCreditAvailable && { color: COLORS.greyText },
                      ]}
                    >
                      {amount.value}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
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
  creditTitle: {
    fontSize: 14,
    color: COLORS.greyText,
    marginTop: 4,
    fontWeight: 'bold',
  },
  creditValue: {
    fontSize: 14,
    color: COLORS.primaryRed,
    fontWeight: 'bold',
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
  /////////
  buyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkCharcoal,
    marginTop: 20,
    marginLeft: 10,
  },
  creditSelectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 0,
  },
  creditCard: {
    flex: 1,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    elevation: 4,
    shadowColor: COLORS.primaryBlack,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.secondaryRed,
  },
  creditCardLabel: {
    fontSize: 12,
    color: COLORS.greyText,
    fontWeight: '600',
    marginTop: 4,
  },
  creditCardValue: {
    fontSize: 18,
    color: COLORS.primaryRed,
    fontWeight: 'bold',
  },
});
