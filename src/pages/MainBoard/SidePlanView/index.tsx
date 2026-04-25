import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {
  Canvas,
  Image,
  useImage,
  Rect,
  Shadow,
  useFont,
} from '@shopify/react-native-skia';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { COLORS } from '../../../constants/colors';
import AppStatusBar from '../../../app_header/AppStatusBar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Draggable Label Component
const DraggableRoomLabel = ({ initialText }: { initialText: string }) => {
  const translateX = useSharedValue(100);
  const translateY = useSharedValue(100);
  const context = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate(event => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.labelWrapper, animatedStyle]}>
        <Text style={styles.labelText}>{initialText}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const SidePlanView = ({ route, navigation }: any) => {
  const { imageUri, extractedData, direction } = route.params;
  console.log('direction===>', direction);
  console.log('extractedData===>', extractedData);
  console.log('imageUri===>', imageUri);
  const skiaImage = useImage(imageUri);
  const [labels, setLabels] = useState<any[]>(extractedData?.rooms || []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <AppStatusBar
        backgroundColor={COLORS.primaryRed}
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerAction}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Floor Plan Analysis</Text>
        <TouchableOpacity
          onPress={() => Alert.alert('Saved', 'Analysis complete')}
        >
          <Text style={styles.headerAction}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Skia Canvas Area */}
      <View style={styles.canvasContainer}>
        <Canvas style={styles.skiaCanvas}>
          {skiaImage && (
            <Image
              image={skiaImage}
              x={0}
              y={0}
              width={SCREEN_WIDTH}
              height={500}
              fit="contain"
            />
          )}
        </Canvas>

        {/* Draggable Overlays */}
        {labels.map((room: any, index: number) => (
          <DraggableRoomLabel
            key={index}
            initialText={room.name || `Room ${index + 1}`}
          />
        ))}
      </View>

      {/* Footer Info Card */}
      <View style={styles.footerCard}>
        <Text style={styles.footerTitle}>Analysis Summary</Text>
        <Text style={styles.footerText}>
          Total Rooms Detected: {labels.length}
        </Text>
        <Text style={styles.instruction}>
          Drag labels to their exact location
        </Text>
      </View>
    </GestureHandlerRootView>
  );
};

export default SidePlanView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.primaryRed,
  },
  headerTitle: {
    color: COLORS.whiteColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerAction: {
    color: COLORS.whiteColor,
    fontSize: 14,
  },
  canvasContainer: {
    height: 500,
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  skiaCanvas: {
    flex: 1,
  },
  labelWrapper: {
    position: 'absolute',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.primaryRed,
    elevation: 5, // Android Shadow
    shadowColor: '#000', // iOS Shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  labelText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryRed,
  },
  footerCard: {
    padding: 20,
    margin: 16,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 12,
    elevation: 3,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.darkCharcoal,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.iconGrey,
  },
  instruction: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 10,
    color: COLORS.secondaryRed,
  },
});
