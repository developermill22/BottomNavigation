import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '../../../constants/theme';
import TabRow, { IconLabel } from '../TabRow';
import { useIndicatorX, useLayoutWidth, useTabAnimation } from '../useTabAnimation';

// Indicator line along the top edge of the bar, above the active tab.
export default function IndicatorBar({ items, activeIndex, onSelect, bottomInset }) {
  const { position, progress } = useTabAnimation(activeIndex, items.length);
  const [width, onLayout] = useLayoutWidth();
  const tabWidth = width / items.length;
  const lineWidth = tabWidth * 0.6;
  const translateX = useIndicatorX(position, tabWidth, lineWidth);

  return (
    <View style={[styles.bar, { paddingBottom: 6 + bottomInset }]} onLayout={onLayout}>
      {width > 0 ? (
        <Animated.View
          style={[styles.line, { width: lineWidth, transform: [{ translateX }] }]}
        />
      ) : null}
      <TabRow
        items={items}
        activeIndex={activeIndex}
        progress={progress}
        onSelect={onSelect}
        style={styles.row}
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
    paddingTop: 10,
  },
  row: {
    height: 54,
  },
  line: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: colors.primary,
  },
});
