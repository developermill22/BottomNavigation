import { Animated, StyleSheet, View } from 'react-native';
import { colors, shadows } from '../../../constants/theme';
import TabRow, { IconLabel } from '../TabRow';
import { useIndicatorX, useLayoutWidth, useTabAnimation } from '../useTabAnimation';

const ROW = 58;
const WELL_INSET = 4;

// Raised bar with a sliding "pressed-in" well under the active tab.
export default function NeumorphicBar({ items, activeIndex, onSelect, bottomInset }) {
  const { position, progress } = useTabAnimation(activeIndex, items.length);
  const [width, onLayout] = useLayoutWidth();
  const tabWidth = width / items.length;
  const wellWidth = Math.max(tabWidth - WELL_INSET * 2, 0);
  const translateX = useIndicatorX(position, tabWidth, wellWidth);

  return (
    <View style={[styles.bar, { marginBottom: 14 + bottomInset }]}>
      <TabRow
        items={items}
        activeIndex={activeIndex}
        progress={progress}
        onSelect={onSelect}
        onLayout={onLayout}
        style={styles.row}
        underlay={
          width > 0 ? (
            <Animated.View
              style={[styles.well, { width: wellWidth, transform: [{ translateX }] }]}
            />
          ) : null
        }
        renderLayer={(item, active) => (
          <IconLabel
            icon={item.icon}
            label={item.label}
            active={active}
            filled={false}
            strokeWidth={active ? 2.2 : 1.9}
            color={active ? colors.primary : '#7B8299'}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    marginHorizontal: 14,
    padding: 6,
    borderRadius: 24,
    backgroundColor: colors.neu,
    boxShadow: shadows.neuRaised,
  },
  row: {
    height: ROW,
  },
  well: {
    position: 'absolute',
    left: 0,
    top: 2,
    height: ROW - 4,
    borderRadius: 18,
    backgroundColor: colors.neu,
    boxShadow: shadows.neuInset,
  },
});
