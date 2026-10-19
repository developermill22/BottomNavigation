import { BlurTargetView } from 'expo-blur';
import { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenBackdrop from '../ScreenBackdrop';
import { SCREENS } from '../../constants/screens';

// Bottom inset the preview passes to the bar, leaving room for the fake
// home indicator. In a real screen use useSafeAreaInsets().bottom.
export const PREVIEW_INSET = 16;

// The bottom of a phone: black bezel, rounded corners, a fake screen with the
// bar docked to its bottom edge. Tapping the screen above the bar calls onPressScreen.
export default function PhonePreview({
  screen = 'light',
  homeIndicator = 'dark',
  title,
  renderBar,
  onPressScreen,
  accessibilityLabel,
}) {
  const blurTarget = useRef(null);
  const tone = SCREENS[screen] ?? SCREENS.light;

  return (
    <View style={styles.frame}>
      <View style={[styles.screen, { backgroundColor: tone.background }]}>
        {/* Everything the glass and dock bars should blur goes in here. */}
        <BlurTargetView ref={blurTarget} style={StyleSheet.absoluteFill}>
          <ScreenBackdrop screen={screen} />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            onPress={onPressScreen}
            style={StyleSheet.absoluteFill}
          >
            <View style={styles.content}>
              <Text style={[styles.title, { color: tone.text }]}>{title}</Text>
              <View style={[styles.skeleton, { backgroundColor: tone.skeleton, width: '72%' }]} />
              <View style={[styles.skeleton, { backgroundColor: tone.skeleton, width: '48%' }]} />
            </View>
          </Pressable>
        </BlurTargetView>
        <View style={styles.barSlot} pointerEvents="box-none">
          {renderBar(blurTarget)}
        </View>
        <View
          pointerEvents="none"
          style={[
            styles.homeIndicator,
            { backgroundColor: homeIndicator === 'light' ? '#FFFFFF' : '#111111' },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: '#111111',
    paddingHorizontal: 7,
    paddingBottom: 7,
    borderBottomLeftRadius: 46,
    borderBottomRightRadius: 46,
  },
  screen: {
    height: 230,
    borderBottomLeftRadius: 39,
    borderBottomRightRadius: 39,
    overflow: 'hidden',
  },
  content: {
    padding: 18,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  skeleton: {
    height: 10,
    borderRadius: 5,
  },
  barSlot: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 7,
    alignSelf: 'center',
    width: 120,
    height: 4,
    borderRadius: 2,
    opacity: 0.85,
  },
});
