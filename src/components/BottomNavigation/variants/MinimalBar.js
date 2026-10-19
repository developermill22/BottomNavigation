import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '../../../constants/theme';
import TabRow, { IconLabel } from '../TabRow';
import { useIndicatorX, useLayoutWidth, useTabAnimation } from '../useTabAnimation';

const DOT = 5;

export default function MinimalBar({ items, activeIndex, onSelect, bottomInset }) {
  const { position, progress } = useTabAnimation(activeIndex, items.length);
  const [width, onLayout] = useLayoutWidth();
  const translateX = useIndicatorX(position, width / items.length, DOT);

  return (
    <View style={[styles.bar, { paddingBottom: 6 + bottomInset }]}>
      <TabRow
        items={items}
        activeIndex={activeIndex}
        progress={progress}
        onSelect={onSelect}
        onLayout={onLayout}
        style={styles.row}
        lift={2}
        underlay={
          width > 0 ? (
            <Animated.View style={[styles.dot, { transform: [{ translateX }] }]} />
          ) : null
        }
        renderLayer={(item, active) => (
          <IconLabel
            icon={item.icon}
            label={item.label}
            active={active}
            color={active ? colors.primary : colors.muted}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  row: {
    height: 56,
  },
  dot: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    backgroundColor: colors.primary,
  },
});
