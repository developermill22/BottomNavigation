import { StyleSheet, View } from 'react-native';
import Icon from '../../Icon';
import GradientFill from '../../GradientFill';
import { gradients } from '../../../constants/theme';
import TabRow, { TabLabel } from '../TabRow';
import { useTabAnimation } from '../useTabAnimation';

const BUBBLE = 34;

export default function GradientBar({ items, activeIndex, onSelect, bottomInset }) {
  const { progress } = useTabAnimation(activeIndex, items.length);

  return (
    <View style={[styles.bar, { paddingBottom: 6 + bottomInset }]}>
      <GradientFill colors={gradients.bold} />
      <TabRow
        items={items}
        activeIndex={activeIndex}
        progress={progress}
        onSelect={onSelect}
        style={styles.row}
        activeScale={1.06}
        renderLayer={(item, active) => (
          <View style={styles.layer}>
            {/* The white bubble lives in the active layer, so it fades and pops in. */}
            <View style={[styles.bubble, active && styles.bubbleActive]}>
              <Icon
                name={item.icon}
                size={20}
                color={active ? gradients.bold[0] : 'rgba(255, 255, 255, 0.85)'}
                strokeWidth={active ? 2.4 : 2}
              />
            </View>
            <TabLabel
              label={item.label}
              active={active}
              color={active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)'}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
    paddingTop: 8,
    paddingHorizontal: 6,
  },
  row: {
    height: 58,
  },
  layer: {
    alignItems: 'center',
    gap: 2,
  },
  bubble: {
    width: BUBBLE,
    height: BUBBLE,
    borderRadius: BUBBLE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleActive: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 10px rgba(60, 20, 120, 0.30)',
  },
});
