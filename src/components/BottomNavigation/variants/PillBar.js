import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '../../../constants/theme';
import TabRow, { IconLabel } from '../TabRow';
import { useIndicatorX, useLayoutWidth, useTabAnimation } from '../useTabAnimation';

const ROW = 58;
const PILL_MAX = 68;

export default function PillBar({ items, activeIndex, onSelect, bottomInset }) {
  const { position, progress } = useTabAnimation(activeIndex, items.length);
  const [width, onLayout] = useLayoutWidth();
  const tabWidth = width / items.length;
  const pillWidth = Math.max(Math.min(tabWidth - 6, PILL_MAX), 0);
  const translateX = useIndicatorX(position, tabWidth, pillWidth);

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
            <Animated.View
              style={[styles.pill, { width: pillWidth, transform: [{ translateX }] }]}
            />
          ) : null
        }
        renderLayer={(item, active) => (
          <IconLabel
            icon={item.icon}
            label={item.label}
            active={active}
            cutoutColor={colors.primarySoft}
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
    paddingHorizontal: 8,
  },
  row: {
    height: ROW,
  },
  pill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: ROW,
    borderRadius: 18,
    backgroundColor: colors.primarySoft,
  },
});
