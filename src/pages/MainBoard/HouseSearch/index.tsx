import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../../constants/colors';
import AppStatusBar from '../../../app_header/AppStatusBar';

const HouseSearch = () => {
  const [placeDetails, setPlaceDetails] = useState<any>(null);
  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  const GOOGLE_PLACES_API_KEY = 'AIzaSyBUOey4Ezc9bmlVZbvSv5QNFaUprO9Mgwg';

  // Logic to determine cardinal orientation/pole based on coordinates
  const getPoleFacing = (lat: number, lng: number) => {
    let vertical = lat >= 0 ? 'North' : 'South';
    let horizontal = lng >= 0 ? 'East' : 'West';

    // Simple logic: If it's heavily tilted one way, return that, else combined
    if (Math.abs(lat) > Math.abs(lng) * 2) return `${vertical} Facing`;
    if (Math.abs(lng) > Math.abs(lat) * 2) return `${horizontal} Facing`;
    return `${vertical}-${horizontal} Facing`;
  };

  //   export const getDirection = (angle) => {
  //   if ((angle >= 348.75 && angle <= 360) || (angle >= 0 && angle <= 11.25)) {
  //     return "North";
  //   }
  //   if (angle <= 33.75) return "North-northeast";
  //   if (angle <= 56.25) return "Northeast";
  //   if (angle <= 78.75) return "East-northeast";
  //   if (angle <= 101.25) return "East";
  //   if (angle <= 123.75) return "East-southeast";
  //   if (angle <= 146.25) return "Southeast";
  //   if (angle <= 168.75) return "South-southeast";
  //   if (angle <= 191.25) return "South";
  //   if (angle <= 213.75) return "South-southwest";
  //   if (angle <= 236.25) return "Southwest";
  //   if (angle <= 258.75) return "West-southwest";
  //   if (angle <= 281.25) return "West";
  //   if (angle <= 303.75) return "West-northwest";
  //   if (angle <= 326.25) return "Northwest";
  //   if (angle <= 348.75) return "North-northwest";

  //   return "Unknown";
  // };

  const handleClear = () => {
    ref.current?.setAddressText('');
    setPlaceDetails(null);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <AppStatusBar
        backgroundColor={COLORS.primaryBlue}
        barStyle="light-content"
      />

      <View style={styles.searchSection}>
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder="Search House or Location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            setPlaceDetails(details);
          }}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: 'en',
          }}
          renderRightButton={() => (
            <TouchableOpacity onPress={handleClear} style={styles.clearIcon}>
              <Ionicons name="close-circle" size={20} color={COLORS.iconGrey} />
            </TouchableOpacity>
          )}
          styles={{
            textInputContainer: styles.autocompleteContainer,
            textInput: styles.autocompleteInput,
            listView: styles.resultList,
            description: { color: COLORS.black1 },
            row: { backgroundColor: COLORS.whiteColor, padding: 13 },
          }}
          enablePoweredByContainer={false}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          keyboardShouldPersistTaps="handled"
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {placeDetails ? (
          <View style={styles.detailsCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="location" size={24} color={COLORS.primaryBlue} />
              <Text style={styles.locationName}>
                {placeDetails.name || 'Location Found'}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>Full Address:</Text>
              <Text style={styles.value}>{placeDetails.formatted_address}</Text>
            </View>

            {placeDetails.geometry?.location && (
              <>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Pole Facing:</Text>
                  <Text
                    style={[
                      styles.value,
                      { color: COLORS.primaryBlue, fontWeight: 'bold' },
                    ]}
                  >
                    {getPoleFacing(
                      placeDetails.geometry.location.lat,
                      placeDetails.geometry.location.lng,
                    )}
                  </Text>
                </View>

                <View style={styles.coordinatesContainer}>
                  <View style={styles.coordBox}>
                    <Text style={styles.coordLabel}>Latitude</Text>
                    <Text style={styles.coordValue}>
                      {placeDetails.geometry.location.lat.toFixed(6)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.coordBox,
                      { borderLeftWidth: 1, borderColor: COLORS.inputBorder },
                    ]}
                  >
                    <Text style={styles.coordLabel}>Longitude</Text>
                    <Text style={styles.coordValue}>
                      {placeDetails.geometry.location.lng.toFixed(6)}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons
              name="search-outline"
              size={80}
              color={COLORS.secondaryBlue}
            />
            <Text style={styles.emptyText}>
              Start typing to find a house or location
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HouseSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundCream,
  },
  searchSection: {
    padding: 15,
    backgroundColor: COLORS.primaryBlue,
    zIndex: 1,
    elevation: 5,
    shadowColor: COLORS.primaryBlack,
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  autocompleteContainer: {
    backgroundColor: 'transparent',
  },
  autocompleteInput: {
    height: 50,
    color: COLORS.black1,
    fontSize: 16,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: COLORS.whiteColor,
  },
  clearIcon: {
    position: 'absolute',
    right: 25,
    top: 15,
    zIndex: 10,
  },
  resultList: {
    backgroundColor: COLORS.whiteColor,
    borderRadius: 8,
    marginTop: 5,
    elevation: 5,
    shadowColor: COLORS.primaryBlack,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    position: 'absolute',
    top: 55,
    width: '100%',
  },
  content: {
    padding: 15,
    paddingTop: 10,
    flexGrow: 1,
  },
  detailsCard: {
    backgroundColor: COLORS.whiteColor,
    marginTop: 40,
    borderRadius: 15,
    padding: 20,
    elevation: 4,
    shadowColor: COLORS.primaryBlue,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryBlue,
    marginLeft: 10,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.inputBorder,
    marginBottom: 15,
  },
  infoRow: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: COLORS.greyText,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: COLORS.black1,
    lineHeight: 22,
  },
  coordinatesContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondaryBlue,
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
  },
  coordBox: {
    flex: 1,
    alignItems: 'center',
  },
  coordLabel: {
    fontSize: 12,
    color: COLORS.primaryBlue,
    fontWeight: '600',
    marginBottom: 4,
  },
  coordValue: {
    fontSize: 15,
    color: COLORS.black1,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: COLORS.lightGreyText,
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});
