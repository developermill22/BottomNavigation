import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '../../../constants/theme';
import TabRow, { IconLabel } from '../TabRow';
import { useIndicatorX, useLayoutWidth, useTabAnimation } from '../useTabAnimation';

const UNDERLINE = 18;

export default function OutlineBar({ items, activeIndex, onSelect, bottomInset }) {
  const { position, progress } = useTabAnimation(activeIndex, items.length);
  const [width, onLayout] = useLayoutWidth();
  const translateX = useIndicatorX(position, width / items.length, UNDERLINE);

  return (
    <View style={[styles.bar, { paddingBottom: 6 + bottomInset }]}>
      <TabRow
        items={items}
        activeIndex={activeIndex}
        progress={progress}
        onSelect={onSelect}
        onLayout={onLayout}
        style={styles.row}
        underlay={
          width > 0 ? (
            <Animated.View style={[styles.underline, { transform: [{ translateX }] }]} />
          ) : null
        }
        renderLayer={(item, active) => (
          <IconLabel
            icon={item.icon}
            label={item.label}
            active={active}
            filled={false}
            strokeWidth={1.6}
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
    height: 58,
  },
  underline: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: UNDERLINE,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
