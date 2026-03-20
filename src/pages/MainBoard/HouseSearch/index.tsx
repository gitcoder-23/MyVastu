import React, { useState, useRef } from 'react';
import {
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
import { styles } from './styles';
import { GOOGLE_PLACES_API_KEY } from '../../../app/api/config';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';

const HouseSearch = () => {
  const [placeDetails, setPlaceDetails] = useState<any>(null);
  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  const rotation = useSharedValue(0);
  const [displayFacing, setDisplayFacing] = useState('North');
  const lastDirection = useSharedValue('North');
  const CENTER = 75;
  const getDirectionLabel = (angle: number) => {
    'worklet';
    const normalizedAngle = ((angle % 360) + 360) % 360;

    if (normalizedAngle >= 337.5 || normalizedAngle < 22.5) return 'North';
    if (normalizedAngle >= 22.5 && normalizedAngle < 67.5) return 'North-East';
    if (normalizedAngle >= 67.5 && normalizedAngle < 112.5) return 'East';
    if (normalizedAngle >= 112.5 && normalizedAngle < 157.5)
      return 'South-East';
    if (normalizedAngle >= 157.5 && normalizedAngle < 202.5) return 'South';
    if (normalizedAngle >= 202.5 && normalizedAngle < 247.5)
      return 'South-West';
    if (normalizedAngle >= 247.5 && normalizedAngle < 292.5) return 'West';
    if (normalizedAngle >= 292.5 && normalizedAngle < 337.5)
      return 'North-West';

    return 'North';
  };

  const gesture = Gesture.Pan()
    .onBegin(event => {
      // Calculate initial touch angle
      const x = event.x - CENTER;
      const y = event.y - CENTER;
      let deg = Math.atan2(y, x) * (180 / Math.PI) + 90;
      if (deg < 0) deg += 360;

      rotation.value = deg;
      const label = getDirectionLabel(deg);

      if (label !== lastDirection.value) {
        lastDirection.value = label;
        runOnJS(setDisplayFacing)(label);
      }
    })
    .onUpdate(event => {
      const x = event.x - CENTER;
      const y = event.y - CENTER;

      let deg = Math.atan2(y, x) * (180 / Math.PI) + 90;
      if (deg < 0) deg += 360;

      rotation.value = deg;
      const label = getDirectionLabel(deg);

      if (label !== lastDirection.value) {
        lastDirection.value = label;
        runOnJS(setDisplayFacing)(label);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

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
                    <GestureDetector gesture={gesture}>
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
                    </GestureDetector>
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
