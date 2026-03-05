import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../../constants/colors';
import AppStatusBar from '../../../app_header/AppStatusBar';
import { Entypo } from '@expo/vector-icons';
import { useAppDispatch } from '../../../app/redux/hooks';
import { uploadFloorSidePlanAction } from '../../../app/redux/actions/sidePlanAction';
import { styles } from './styles';
import { launchImageLibrary } from 'react-native-image-picker';

const HouseSearch = () => {
  const dispatch = useAppDispatch();

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

  const onUploadImage = () => {
    const options: any = {
      mediaType: 'photo' as const,
      maxWidth: 1024, // Optional: Resize for faster uploads
      maxHeight: 1024,
      quality: 1, // Keep original quality
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled');
      } else if (response.errorCode) {
        Alert.alert('Picker Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];

        // Constructing file data for multipart/form-data
        const fileData = {
          uri:
            Platform.OS === 'ios'
              ? asset.uri?.replace('file://', '')
              : asset.uri,
          name: asset.fileName || `upload_${Date.now()}.jpg`,
          type: asset.type || 'image/jpeg',
        };

        // Proceed to your existing handleUpload logic
        handleUpload(fileData);
      }
    });
  };

  const handleUpload = (imageAsset: any) => {
    const fileData = {
      uri:
        Platform.OS === 'ios'
          ? imageAsset.uri.replace('file://', '')
          : imageAsset.uri,
      name: imageAsset.fileName || 'upload.jpg',
      type: imageAsset.mimeType || 'image/jpeg',
    };
    dispatch(uploadFloorSidePlanAction({ file: fileData }))
      .unwrap()
      .then((res: any) => {
        Alert.alert('Success', 'Floor plan extracted successfully!');
      })
      .catch((err: any) => {
        Alert.alert('Error', err?.message || 'Failed to upload image');
      });
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
                    <Text style={styles.label}>Facing:</Text>
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
                  <View style={styles.compassContainer}>
                    <Text style={styles.compassNorthLabel}>N</Text>
                    <View style={styles.compassCircle}>
                      {/* This is the needle that rotates */}
                      <View
                        style={[
                          styles.needleWrapper,
                          {
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
                          },
                        ]}
                      >
                        <Ionicons
                          name="navigate"
                          size={30}
                          color={COLORS.whiteColor}
                        />
                      </View>
                    </View>
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
                <TouchableOpacity
                  onPress={onUploadImage}
                  style={styles.uploadButtonContainer}
                >
                  <View style={styles.uploadButton}>
                    <Entypo name="upload" size={24} color={COLORS.whiteColor} />
                    <Text style={styles.uploadButtonText}>
                      Upload Floor Plan
                    </Text>
                  </View>
                </TouchableOpacity>
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
