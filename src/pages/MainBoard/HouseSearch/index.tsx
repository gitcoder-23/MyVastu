import React, { useState, useRef, useCallback } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../../constants/colors';
import AppStatusBar from '../../../app_header/AppStatusBar';
import { styles } from './styles';
import {
  GOOGLE_PLACES_API_KEY,
  googleMapStaticFallbackApi,
  googleMapStreetViewMetadataApi,
  googleMapStreetViewUrl,
  googleNoImageFound,
  updatePlaceWebUrl,
} from '../../../app/api/config';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { fetchFacingGoogleDirection } from '../../../app/services/googleServices';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const HouseSearch = () => {
  const navigation: any = useNavigation();
  const [placeDetails, setPlaceDetails] = useState<any>(null);
  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  const rotation = useSharedValue(0);
  const [displayFacing, setDisplayFacing] = useState('');
  const [angleValue, setAngleValue] = useState(0);
  // NEW STATE: For WebView visibility and URL
  const [webUrl, setWebUrl] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLabel, setImageLabel] = useState('Location Preview');
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Define the cleanup logic in a separate function
  // Update your resetAllStates callback
  const resetAllStates = useCallback(() => {
    ref.current?.setAddressText('');
    setPlaceDetails(null);
    setDisplayFacing('');
    rotation.value = 0;
    setWebUrl('');
    setAngleValue(0);
    setImageUrl(null); // Reset image
    setImageLabel('Location Preview');
    Keyboard.dismiss();
  }, [rotation]);

  useFocusEffect(
    useCallback(() => {
      resetAllStates();

      return () => {};
    }, [resetAllStates]),
  );

  const handleClear = () => {
    resetAllStates();
  };

  const getDirection = (angle: number) => {
    if ((angle >= 348.75 && angle <= 360) || (angle >= 0 && angle <= 11.25)) {
      return 'North';
    }
    if (angle <= 33.75) return 'North-northeast';
    if (angle <= 56.25) return 'Northeast';
    if (angle <= 78.75) return 'East-northeast';
    if (angle <= 101.25) return 'East';
    if (angle <= 123.75) return 'East-southeast';
    if (angle <= 146.25) return 'Southeast';
    if (angle <= 168.75) return 'South-southeast';
    if (angle <= 191.25) return 'South';
    if (angle <= 213.75) return 'South-southwest';
    if (angle <= 236.25) return 'Southwest';
    if (angle <= 258.75) return 'West-southwest';
    if (angle <= 281.25) return 'West';
    if (angle <= 303.75) return 'West-northwest';
    if (angle <= 326.25) return 'Northwest';
    if (angle <= 348.75) return 'North-northwest';

    return 'No direction found';
  };

  const fetchFacingDirection = async (lat: number, lng: number) => {
    try {
      const { pseudoAngle } = await fetchFacingGoogleDirection(lat, lng);
      const direction = getDirection(pseudoAngle);
      console.log('fetchFacingDirection-pseudoAngle==>', pseudoAngle);
      console.log('fetchFacingDirection-direction==>', direction);

      // Update UI
      setDisplayFacing(direction);
      rotation.value = pseudoAngle;
      console.log('pseudoAngle==>', pseudoAngle);

      setAngleValue(pseudoAngle);
    } catch (error) {
      console.error('Error fetching direction:', error);
      const direction = getDirection(0);
      setDisplayFacing(direction);
      rotation.value = 0;
      setAngleValue(0);
      throw error;
    }
  };

  const onPressLocationDetails = (details: any, data: any) => {
    console.log('onPressLocationDetails-details==>', details);
    console.log('onPressLocationDetails-data==>', data);
    if (details?.geometry?.location) {
      const { lat, lng } = details.geometry.location;
      fetchFacingDirection(lat, lng);
      fetchStreetView(lat, lng);
    }
    setPlaceDetails(details);
  };
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handleUpdate = (angle: number) => {
    const url = updatePlaceWebUrl(angle);
    console.log('Opening WebView with URL:', url);
    setWebUrl(url);
    navigation.navigate('AppWebView', { webUrl: url });
  };

  console.log('angleValue==>', angleValue);

  const fetchStreetView = async (lat: number, lng: number) => {
    setIsImageLoading(true);
    try {
      const metaUrl = googleMapStreetViewMetadataApi(lat, lng);

      const res = await fetch(metaUrl);
      const data = await res.json();

      if (data.status === 'OK') {
        const isGoogle = data.copyright?.includes('Google');
        const streetUrl = googleMapStreetViewUrl(data.pano_id);

        setImageUrl(streetUrl);
        setImageLabel(isGoogle ? 'Street View' : 'User-contributed image');
      } else {
        // Static Map Fallback if Street View is unavailable
        const staticUrl = googleMapStaticFallbackApi(lat, lng);
        setImageUrl(staticUrl);
        setImageLabel('Map Preview');
      }
    } catch (error) {
      setImageUrl(googleNoImageFound);
      setImageLabel('No Preview Available');
    } finally {
      setIsImageLoading(false);
    }
  };

  const renderPlacePhoto = () => {
    if (isImageLoading) {
      return (
        <View style={styles.noImageContainer}>
          <ActivityIndicator size="large" color={COLORS.primaryRed} />
        </View>
      );
    }

    if (!imageUrl) return null;

    return (
      <View style={styles.imageCard}>
        <Text style={styles.label}>{imageLabel}:</Text>
        <Image
          source={{ uri: imageUrl }}
          style={styles.placeImage}
          resizeMode="cover"
        />
      </View>
    );
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
            onPressLocationDetails(details, data);
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
                      {displayFacing}
                    </Text>
                  </View>

                  <View style={styles.compassContainer}>
                    <Text style={styles.compassNorthLabel}>N</Text>
                    <View style={styles.compassCircle}>
                      <Animated.View
                        style={[styles.needleWrapper, animatedStyle]}
                      >
                        <Ionicons
                          name="navigate"
                          size={30}
                          color={COLORS.whiteColor}
                        />
                      </Animated.View>
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
                {renderPlacePhoto()}
              </>
            )}
            {angleValue > 0 && (
              <TouchableOpacity
                onPress={() => handleUpdate(angleValue)}
                style={styles.uploadButtonContainer}
              >
                <View style={styles.uploadButton}>
                  <Text style={styles.uploadButtonText}>Upload House Plan</Text>
                </View>
              </TouchableOpacity>
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
