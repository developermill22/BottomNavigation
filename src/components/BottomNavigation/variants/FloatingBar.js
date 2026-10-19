import { StyleSheet, Text, View } from 'react-native';
import { colors, shadows } from '../../../constants/theme';
import ActionButton from '../ActionButton';
import TabRow, { IconLabel } from '../TabRow';
import { useTabAnimation } from '../useTabAnimation';

export default function FloatingBar({ items, activeIndex, onSelect, bottomInset }) {
  const { progress } = useTabAnimation(activeIndex, items.length);

  return (
    <View style={[styles.bar, { marginBottom: 14 + bottomInset }]}>
      <TabRow
        items={items}
        activeIndex={activeIndex}
        progress={progress}
        onSelect={onSelect}
        style={styles.row}
        lift={2}
        renderAction={(item, onPress) => (
          <View style={styles.action}>
            <ActionButton item={item} onPress={onPress} size={40} />
            <Text style={styles.actionLabel}>{item.label}</Text>
          </View>
        )}
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
    marginHorizontal: 16,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 30,
    backgroundColor: colors.surface,
    boxShadow: shadows.floating,
  },
  row: {
    height: 58,
  },
  action: {
    alignItems: 'center',
    gap: 3,
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
});
