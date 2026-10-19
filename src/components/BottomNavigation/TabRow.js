import { StyleSheet, Text, View } from 'react-native';
import Icon from '../Icon';
import { colors } from '../../constants/theme';
import TabButton from './TabButton';

// Lays tabs out in equal-width slots. `underlay` (indicators) renders behind
// the tabs; `renderAction` replaces tabs whose item has `action: true`.
export default function TabRow({
  items,
  activeIndex,
  progress,
  onSelect,
  renderLayer,
  renderAction,
  underlay,
  lift,
  activeScale,
  onLayout,
  style,
}) {
  return (
    <View accessibilityRole="tablist" style={[styles.row, style]} onLayout={onLayout}>
      {underlay}
      {items.map((item, index) =>
        item.action && renderAction ? (
          <View key={item.key} style={styles.slot}>
            {renderAction(item, () => onSelect(index))}
          </View>
        ) : (
          <TabButton
            key={item.key}
            label={item.label}
            selected={index === activeIndex}
            progress={progress[index]}
            onPress={() => onSelect(index)}
            renderLayer={(active) => renderLayer(item, active)}
            lift={lift}
            activeScale={activeScale}
          />
        ),
      )}
    </View>
  );
}

export function IconLabel({
  icon,
  label,
  color,
  labelColor = color,
  active,
  filled = active,
  cutoutColor,
  iconSize = 22,
  strokeWidth = 2,
}) {
  return (
    <View style={styles.layer}>
      <Icon
        name={icon}
        size={iconSize}
        color={color}
        filled={filled}
        cutoutColor={cutoutColor}
        strokeWidth={strokeWidth}
      />
      <TabLabel label={label} active={active} color={labelColor} />
    </View>
  );
}

export function TabLabel({ label, active, color }) {
  return (
    <Text numberOfLines={1} style={[styles.label, active && styles.labelActive, { color }]}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  layer: {
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.muted,
  },
  labelActive: {
    fontWeight: '700',
  },
});
