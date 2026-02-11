import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../../constants/colors';
import AppStatusBar from '../../../app_header/AppStatusBar';
import { AssetImages } from '../../../constants/assetImages';

const ContactUs = () => {
  const address = '43259 Crescent Blvd, Novi, MI 48375';
  const phone1 = '(248) 243-9108';
  const phone2 = '734-674-1927';

  const makeCall = (phoneNumber: string) => {
    const url = `tel:${phoneNumber.replace(/[^\d]/g, '')}`;
    Linking.openURL(url);
  };

  const openMaps = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${address}`,
      android: `geo:0,0?q=${address}`,
    });
    if (url) Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <AppStatusBar
        backgroundColor={COLORS.darkCharcoal}
        barStyle="light-content"
      />

      {/* Header Banner */}
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Contact Us</Text>
      </View> */}
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Agent Profile Card */}
          <View style={styles.profileCard}>
            <Image
              source={AssetImages.sunilPaingolImg}
              style={styles.agentImage}
            />
            <Text style={styles.agentName}>Sunil Paingol</Text>
            <Text style={styles.agentTitle}>Principal Realtor</Text>
            <View style={styles.redUnderline} />
          </View>

          {/* Contact Methods */}
          <View style={styles.infoSection}>
            {/* Phone Numbers */}
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => makeCall(phone1)}
            >
              <View style={styles.iconCircle}>
                <Ionicons name="call" size={22} color={COLORS.primaryRed} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Primary Phone</Text>
                <Text style={styles.value}>{phone1}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.lightGreyText}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => makeCall(phone2)}
            >
              <View style={styles.iconCircle}>
                <Ionicons
                  name="phone-portrait"
                  size={22}
                  color={COLORS.primaryRed}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Secondary Phone</Text>
                <Text style={styles.value}>{phone2}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.lightGreyText}
              />
            </TouchableOpacity>

            {/* Address */}
            <TouchableOpacity style={styles.contactItem} onPress={openMaps}>
              <View style={styles.iconCircle}>
                <Ionicons name="location" size={22} color={COLORS.primaryRed} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Office Address</Text>
                <Text style={styles.value}>{address}</Text>
              </View>
              <Ionicons
                name="map-outline"
                size={20}
                color={COLORS.lightGreyText}
              />
            </TouchableOpacity>
          </View>

          {/* Social / Footer Tagline */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>The Paingol Group Realtors</Text>
            <Text style={styles.tagline}>Excellence in every move.</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  mainContainer: {
    // flex: 1,
    // backgroundColor: COLORS.backgroundLight,
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
    // marginTop: -30, // Overlaps the header
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  agentImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: COLORS.primaryRed,
    marginBottom: 15,
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
    shadowColor: '#000',
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
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkCharcoal,
  },
  tagline: {
    fontSize: 12,
    color: COLORS.primaryRed,
    fontStyle: 'italic',
    marginTop: 5,
  },
});
