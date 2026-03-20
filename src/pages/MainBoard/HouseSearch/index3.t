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
import { useAppDispatch, useAppSelector } from '../../../app/redux/hooks';
import {
  FloorPlanAnalysisAction,
  UploadFloorSidePlanAction,
} from '../../../app/redux/actions/sidePlanAction';
import { styles } from './styles';
import { launchImageLibrary } from 'react-native-image-picker';
import { GOOGLE_PLACES_API_KEY } from '../../../app/api/config';
import { setFloorPlanAnalysisResponseData } from '../../../app/redux/slices/floorSidePlanSlice';
import { useNavigation } from '@react-navigation/native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';

const HouseSearch = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const { isSidePlanUploadLoading } = useAppSelector(
    state => state.floorSidePlan,
  );

  const [placeDetails, setPlaceDetails] = useState<any>(null);
  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  const rotation = useSharedValue(0);
  // const [manualFacing, setManualFacing] = useState('North');
  const [displayFacing, setDisplayFacing] = useState('North');
  // 2. Logic to convert Degrees to Vastu Directions
  // const getDirectionLabel = (deg: number) => {
  //   'worklet';
  //   const angle = ((deg % 360) + 360) % 360; // Normalize to 0-359
  //   if (angle >= 337.5 || angle < 22.5) return 'North';
  //   if (angle >= 22.5 && angle < 67.5) return 'North-East';
  //   if (angle >= 67.5 && angle < 112.5) return 'East';
  //   if (angle >= 112.5 && angle < 157.5) return 'South-East';
  //   if (angle >= 157.5 && angle < 202.5) return 'South';
  //   if (angle >= 202.5 && angle < 247.5) return 'South-West';
  //   if (angle >= 247.5 && angle < 292.5) return 'West';
  //   return 'North-West';
  // };
  const getDirectionLabel = (angle: number) => {
    // Normalize angle to be between 0 and 360
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

  const gesture = Gesture.Pan().onUpdate(event => {
    // Calculate the angle based on the center of the compass circle
    const rad = Math.atan2(event.y, event.x);
    const deg = (rad * 180) / Math.PI + 90; // Adjusting offset so 0 is North

    rotation.value = deg;

    // Update state to show the correct text label
    const label = getDirectionLabel(deg);
    runOnJS(setDisplayFacing)(label);
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  // 3. Gesture Handler for rotating the needle
  // const gesture = Gesture.Pan().onUpdate(event => {
  //   // Calculate angle based on touch coordinates relative to center
  //   const rad = Math.atan2(event.y, event.x);
  //   const deg = (rad * 180) / Math.PI + 90;
  //   rotation.value = deg;

  //   // Update the UI label
  //   const label = getDirectionLabel(deg);
  //   runOnJS(setManualFacing)(label);
  // });

  // const animatedNeedleStyle = useAnimatedStyle(() => ({
  //   transform: [{ rotate: `${rotation.value}deg` }],
  // }));

  // Logic to determine cardinal orientation and rotation angle
  // const getPoleData = (lat: number, lng: number) => {
  //   let vertical = lat >= 0 ? 'North' : 'South';
  //   let horizontal = lng >= 0 ? 'East' : 'West';

  //   let label = '';
  //   let angle = 0;

  //   if (Math.abs(lat) > Math.abs(lng) * 2) {
  //     label = `${vertical}`;
  //     angle = vertical === 'North' ? 0 : 180;
  //   } else if (Math.abs(lng) > Math.abs(lat) * 2) {
  //     label = `${horizontal}`;
  //     angle = horizontal === 'East' ? 90 : 270;
  //   } else {
  //     label = `${vertical}-${horizontal}`;
  //     if (vertical === 'North') angle = horizontal === 'East' ? 45 : 315;
  //     else angle = horizontal === 'East' ? 135 : 225;
  //   }

  //   return { label, angle };
  // };

  const handleClear = () => {
    ref.current?.setAddressText('');
    setPlaceDetails(null);
    Keyboard.dismiss();
  };

  const onUploadImage = () => {
    const options: any = {
      mediaType: 'photo' as const,
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled');
      } else if (response.errorCode) {
        Alert.alert('Picker Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];

        const fileData = {
          uri:
            Platform.OS === 'ios'
              ? asset.uri?.replace('file://', '')
              : asset.uri,
          name: asset.fileName || `floorplan_upload_${Date.now()}.jpg`,
          type: asset.type || 'image/jpeg',
        };

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
      name: imageAsset.fileName || `floorplan_upload_${Date.now()}.jpg`,
      type: imageAsset.mimeType || 'image/jpeg',
    };
    dispatch(UploadFloorSidePlanAction({ file: fileData }))
      .unwrap()
      .then((res: any) => {
        console.log('then.response===>', res);
        Alert.alert(
          `Success`,
          'Floor plan uploaded successfully',
          [
            {
              text: 'OK',
              onPress: () => {
                // navigation.navigate('SidePlanView', {
                //   direction: getPoleData(
                //     placeDetails.geometry?.location?.lat,
                //     placeDetails.geometry?.location?.lng,
                //   ).label,
                //   imageUri: imageAsset.uri, // Pass the local or remote URI
                //   extractedData: res, // Pass the API response (rooms, etc.)
                // });
                // const postFloorPlanAnalysis = {
                //   direction: getPoleData(
                //     placeDetails.geometry?.location?.lat,
                //     placeDetails.geometry?.location?.lng,
                //   ).label,
                //   rooms: res.rooms,
                // };
                // dispatch(FloorPlanAnalysisAction(postFloorPlanAnalysis))
                //   .unwrap()
                //   .then((res: any) => {
                //     console.log('analysis.response===>', res);
                //   })
                //   .catch((err: any) => {
                //     console.log('analysis.error===>', err);
                //   });
              },
            },
          ],
          { cancelable: false },
        );

        Alert.alert('Success', 'Floor plan uploaded successfully!');
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
                {/* <View style={styles.poleContainer}>
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

                  <View style={styles.compassContainer}>
                    <Text style={styles.compassNorthLabel}>N</Text>
                    <View style={styles.compassCircle}>
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
                </View> */}

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
                {/* <TouchableOpacity
                  onPress={isSidePlanUploadLoading ? () => {} : onUploadImage}
                  style={styles.uploadButtonContainer}
                  disabled={isSidePlanUploadLoading}
                >
                  <View
                    style={[
                      styles.uploadButton,
                      isSidePlanUploadLoading ? { opacity: 0.5 } : null,
                    ]}
                  >
                    <Entypo name="upload" size={24} color={COLORS.whiteColor} />
                    <Text style={styles.uploadButtonText}>
                      {isSidePlanUploadLoading
                        ? 'Uploading...'
                        : 'Upload Floor Plan'}
                    </Text>
                  </View>
                </TouchableOpacity> */}
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
