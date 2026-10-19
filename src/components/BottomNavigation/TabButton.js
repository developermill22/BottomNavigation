import { useMemo, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

// One tab. `renderLayer(active)` is drawn twice, inactive and active, and the
// two layers crossfade on `progress` so color changes run on the native driver.
export default function TabButton({
  label,
  selected,
  progress,
  onPress,
  renderLayer,
  lift = 0,
  activeScale = 1,
  style,
}) {
  const press = useRef(new Animated.Value(1)).current;

  const animated = useMemo(
    () => ({
      inactiveOpacity: progress.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
      translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [0, -lift] }),
      scale: Animated.multiply(
        press,
        progress.interpolate({ inputRange: [0, 1], outputRange: [1, activeScale] }),
      ),
    }),
    [progress, press, lift, activeScale],
  );

  const springTo = (toValue) =>
    Animated.spring(press, { toValue, speed: 40, bounciness: 12, useNativeDriver: true }).start();

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      onPress={onPress}
      onPressIn={() => springTo(0.86)}
      onPressOut={() => springTo(1)}
      style={[styles.button, style]}
    >
      <Animated.View
        style={{ transform: [{ translateY: animated.translateY }, { scale: animated.scale }] }}
      >
        <Animated.View style={{ opacity: animated.inactiveOpacity }}>
          {renderLayer(false)}
        </Animated.View>
        <Animated.View pointerEvents="none" style={[styles.activeLayer, { opacity: progress }]}>
          {renderLayer(true)}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeLayer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    // Wider than the inactive layer so a bolder label never truncates.
    left: -16,
    right: -16,
    alignItems: 'center',
  },
});
