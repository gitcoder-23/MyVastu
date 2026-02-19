
// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { COLORS } from '../../../constants/colors';
// import AppStatusBar from '../../../app_header/AppStatusBar';

// const { width } = Dimensions.get('window');

// const HouseSearch = () => {
//   const [placeDetails, setPlaceDetails] = useState<any>(null);

//   const GOOGLE_PLACES_API_KEY = 'AIzaSyDaRsmbuko1fmTPFLEWlg3rqHFDV-rwKrg';
//   console.log('placeDetails', placeDetails);
//   const handleClear = () => {
//     setPlaceDetails(null);
//   };

//   return (
//     <View style={styles.container}>
//       <AppStatusBar
//         backgroundColor={COLORS.primaryBlue}
//         barStyle="light-content"
//       />

//       {/* Search Header */}
//   <View style={styles.searchContainer}>
//     <GooglePlacesAutocomplete
//       placeholder="Search House or Location"
//       fetchDetails={true}
//       onPress={(data, details = null) => {
//         // 'details' is provided when fetchDetails = true
//         console.log('details', details);
//         console.log('data', data);

//         setPlaceDetails(details);
//       }}
//       query={{
//         key: GOOGLE_PLACES_API_KEY,
//         language: 'en',
//         // types: 'address',
//       }}
//       renderRightButton={() => (
//         <TouchableOpacity onPress={handleClear} style={styles.clearIcon}>
//           <Ionicons name="close-circle" size={20} color={COLORS.iconGrey} />
//         </TouchableOpacity>
//       )}
//       styles={{
//         textInputContainer: styles.autocompleteContainer,
//         textInput: styles.autocompleteInput,
//         listView: styles.resultList,
//       }}
//       enablePoweredByContainer={false}
//       nearbyPlacesAPI="GooglePlacesSearch"
//       debounce={400}
//     />
//   </View>

//       <ScrollView contentContainerStyle={styles.content}>
//         {placeDetails ? (
//           <View style={styles.detailsCard}>
//             <View style={styles.cardHeader}>
//               <Ionicons name="location" size={24} color={COLORS.primaryBlue} />
//               <Text style={styles.locationName}>{placeDetails.name}</Text>
//             </View>

//             <View style={styles.divider} />

//             <View style={styles.infoRow}>
//               <Text style={styles.label}>Full Address:</Text>
//               <Text style={styles.value}>{placeDetails.formatted_address}</Text>
//             </View>

//             <View style={styles.coordinatesContainer}>
//               <View style={styles.coordBox}>
//                 <Text style={styles.coordLabel}>Latitude</Text>
//                 <Text style={styles.coordValue}>
//                   {placeDetails.geometry.location.lat.toFixed(6)}
//                 </Text>
//               </View>
//               <View
//                 style={[
//                   styles.coordBox,
//                   { borderLeftWidth: 1, borderColor: COLORS.inputBorder },
//                 ]}
//               >
//                 <Text style={styles.coordLabel}>Longitude</Text>
//                 <Text style={styles.coordValue}>
//                   {placeDetails.geometry.location.lng.toFixed(6)}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         ) : (
//           <View style={styles.emptyState}>
//             <Ionicons
//               name="search-outline"
//               size={80}
//               color={COLORS.secondaryBlue}
//             />
//             <Text style={styles.emptyText}>
//               Start typing to find a house or location
//             </Text>
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// export default HouseSearch;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.backgroundCream,
//   },
//   searchContainer: {
//     padding: 15,
//     backgroundColor: COLORS.primaryBlue,
//     zIndex: 1, // Ensures dropdown stays on top
//   },
//   autocompleteContainer: {
//     backgroundColor: 'transparent',
//   },
//   autocompleteInput: {
//     height: 50,
//     color: COLORS.black1,
//     fontSize: 16,
//     borderRadius: 8,
//     paddingHorizontal: 15,
//   },
//   resultList: {
//     backgroundColor: COLORS.whiteColor,
//     borderRadius: 8,
//     marginTop: 5,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//   },
//   content: {
//     padding: 20,
//     paddingTop: 10,
//   },
//   detailsCard: {
//     backgroundColor: COLORS.whiteColor,
//     borderRadius: 15,
//     padding: 20,
//     elevation: 4,
//     shadowColor: COLORS.primaryBlue,
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//   },
//   clearIcon: {
//     position: 'absolute',
//     right: 12,
//     top: 15,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   locationName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: COLORS.primaryBlue,
//     marginLeft: 10,
//     flex: 1,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: COLORS.inputBorder,
//     marginBottom: 15,
//   },
//   infoRow: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     color: COLORS.greyText,
//     marginBottom: 5,
//   },
//   value: {
//     fontSize: 16,
//     color: COLORS.black1,
//     lineHeight: 22,
//   },
//   coordinatesContainer: {
//     flexDirection: 'row',
//     backgroundColor: COLORS.secondaryBlue,
//     borderRadius: 12,
//     padding: 15,
//   },
//   coordBox: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   coordLabel: {
//     fontSize: 12,
//     color: COLORS.primaryBlue,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   coordValue: {
//     fontSize: 15,
//     color: COLORS.black1,
//     fontWeight: 'bold',
//   },
//   emptyState: {
//     alignItems: 'center',
//     marginTop: 100,
//   },
//   emptyText: {
//     color: COLORS.lightGreyText,
//     fontSize: 16,
//     marginTop: 20,
//     textAlign: 'center',
//   },

//////////// Extra


  //   searchSection: {
  //     backgroundColor: COLORS.whiteColor,
  //     marginTop: 20,
  //     paddingHorizontal: 15,
  //     paddingBottom: 20,
  //     zIndex: 1,
  //   },
  //   autocompleteContainer: {
  //     backgroundColor: COLORS.whiteColor,
  //     elevation: 1,
  //     position: 'absolute',
  //     borderRadius: 8,
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //   },
  //   autocompleteInput: {
  //     height: 50,
  //     color: COLORS.black1,
  //     fontSize: 16,
  //     backgroundColor: 'transparent',
  //     marginRight: 40,
  //     zIndex: 999,
  //   },
// });