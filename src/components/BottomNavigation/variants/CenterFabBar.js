import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../../constants/theme';
import ActionButton from '../ActionButton';
import TabRow, { IconLabel } from '../TabRow';
import { useLayoutWidth, useTabAnimation } from '../useTabAnimation';

const FAB = 58;
// The FAB overhangs the bar by half its height. That space is part of this
// view so the whole FAB stays tappable on Android.
const RISE = FAB / 2;
const NOTCH_DEPTH = 36;
const NOTCH_HALF_WIDTH = 50;

function notchEdge(width) {
  const c = width / 2;
  const w = NOTCH_HALF_WIDTH;
  return (
    `M0 0H${c - w}` +
    `C${c - w + 16} 0 ${c - 40} ${NOTCH_DEPTH} ${c} ${NOTCH_DEPTH}` +
    `C${c + 40} ${NOTCH_DEPTH} ${c + w - 16} 0 ${c + w} 0H${width}`
  );
}

export default function CenterFabBar({ items, activeIndex, onSelect, bottomInset }) {
  const { progress } = useTabAnimation(activeIndex, items.length);
  const [width, onLayout] = useLayoutWidth();
  const actionIndex = items.findIndex((item) => item.action);
  const action = items[actionIndex];
  const edge = width > 0 ? notchEdge(width) : null;

  return (
    <View style={styles.container}>
      <View style={[styles.bar, { paddingBottom: 6 + bottomInset }]} onLayout={onLayout}>
        {edge ? (
          <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
            <Path d={`${edge}V600H0Z`} fill={colors.surface} />
            <Path d={edge} fill="none" stroke={colors.border} strokeWidth={1} />
          </Svg>
        ) : null}
        <TabRow
          items={items}
          activeIndex={activeIndex}
          progress={progress}
          onSelect={onSelect}
          style={styles.row}
          lift={2}
          renderAction={() => null}
          renderLayer={(item, active) => (
            <IconLabel
              icon={item.icon}
              label={item.label}
              active={active}
              color={active ? colors.ink : colors.muted}
            />
          )}
        />
      </View>
      {action ? (
        <View style={styles.fabSlot} pointerEvents="box-none">
          <ActionButton item={action} onPress={() => onSelect(actionIndex)} size={FAB} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: RISE,
  },
  bar: {
    paddingTop: 14,
    paddingHorizontal: 6,
  },
  row: {
    height: 56,
  },
  fabSlot: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
