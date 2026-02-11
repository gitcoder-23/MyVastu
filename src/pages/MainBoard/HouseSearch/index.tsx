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

  // Logic to determine cardinal orientation and rotation angle
  const getPoleData = (lat: number, lng: number) => {
    let vertical = lat >= 0 ? 'North' : 'South';
    let horizontal = lng >= 0 ? 'East' : 'West';

    let label = '';
    let angle = 0;

    if (Math.abs(lat) > Math.abs(lng) * 2) {
      label = `${vertical} Facing`;
      angle = vertical === 'North' ? 0 : 180;
    } else if (Math.abs(lng) > Math.abs(lat) * 2) {
      label = `${horizontal} Facing`;
      angle = horizontal === 'East' ? 90 : 270;
    } else {
      label = `${vertical}-${horizontal} Facing`;
      if (vertical === 'North') angle = horizontal === 'East' ? 45 : 315;
      else angle = horizontal === 'East' ? 135 : 225;
    }

    return { label, angle };
  };

  const handleClear = () => {
    ref.current?.setAddressText('');
    setPlaceDetails(null);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <AppStatusBar
        backgroundColor={COLORS.primaryRed}
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
              <Ionicons name="location" size={24} color={COLORS.primaryRed} />
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
                <View style={styles.poleContainer}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Pole Facing:</Text>
                    <Text
                      style={[
                        styles.value,
                        { color: COLORS.primaryRed, fontWeight: 'bold' },
                      ]}
                    >
                      {
                        getPoleData(
                          placeDetails.geometry.location.lat,
                          placeDetails.geometry.location.lng,
                        ).label
                      }
                    </Text>
                  </View>

                  {/* COMPASS VISUAL */}
                  <View style={styles.compassWrapper}>
                    <Ionicons
                      name="compass"
                      size={50}
                      color={COLORS.primaryRed}
                      style={{
                        transform: [
                          {
                            rotate: `${
                              getPoleData(
                                placeDetails.geometry.location.lat,
                                placeDetails.geometry.location.lng,
                              ).angle
                            }deg`,
                          },
                        ],
                      }}
                    />
                    <Text style={styles.compassNorth}>N</Text>
                  </View>
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
              color={COLORS.secondaryRed}
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
    backgroundColor: COLORS.primaryRed,
    zIndex: 1,
    elevation: 5,
    shadowColor: '#000',
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
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryRed,
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
  poleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: COLORS.backgroundCream,
    padding: 10,
    borderRadius: 10,
  },
  compassWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassNorth: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primaryRed,
    position: 'absolute',
    top: -2,
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
    backgroundColor: COLORS.secondaryRed,
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
    color: COLORS.primaryRed,
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
