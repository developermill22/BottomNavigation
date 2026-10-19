import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { colors } from '../../constants/theme';

// Small message that pops in, waits, then fades out. Remount it (with a new
// `key`) to show it again.
export default function Toast({ message, bottom }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const show = Animated.sequence([
      Animated.spring(anim, { toValue: 1, damping: 14, stiffness: 180, useNativeDriver: true }),
      Animated.delay(1400),
      Animated.timing(anim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]);
    show.start();
    return () => show.stop();
  }, [anim]);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.toast, { bottom, opacity: anim, transform: [{ translateY }] }]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: colors.ink,
    boxShadow: '0px 8px 20px rgba(17, 12, 46, 0.25)',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
