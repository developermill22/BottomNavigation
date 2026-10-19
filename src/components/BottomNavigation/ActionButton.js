import { useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import Icon from '../Icon';
import { colors, shadows } from '../../constants/theme';

// Round "create" button used by the floating and center-FAB bars. The plus
// spins a quarter turn and the button pops on every press.
export default function ActionButton({ item, onPress, size = 44, style }) {
  const spin = useRef(new Animated.Value(0)).current;
  const press = useRef(new Animated.Value(1)).current;
  const turns = useRef(0);

  const handlePress = () => {
    turns.current += 1;
    Animated.spring(spin, {
      toValue: turns.current,
      damping: 12,
      stiffness: 160,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  const springTo = (toValue) =>
    Animated.spring(press, { toValue, speed: 40, bounciness: 14, useNativeDriver: true }).start();

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '90deg'] });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.label}
      onPress={handlePress}
      onPressIn={() => springTo(0.88)}
      onPressOut={() => springTo(1)}
      hitSlop={8}
    >
      <Animated.View
        style={[
          styles.button,
          { width: size, height: size, borderRadius: size / 2, transform: [{ scale: press }] },
          style,
        ]}
      >
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Icon name={item.icon} size={size * 0.5} color="#FFFFFF" strokeWidth={2.4} />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    boxShadow: shadows.fab,
  },
});
