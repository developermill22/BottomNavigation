import { useMemo } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Icon from '../../Icon';
import { colors } from '../../../constants/theme';
import TabRow, { IconLabel } from '../TabRow';
import { useIndicatorX, useLayoutWidth, useTabAnimation } from '../useTabAnimation';

const BUBBLE = 52;
const RISE = BUBBLE / 2;
const DIP_DEPTH = 32;
const DIP_HALF_WIDTH = 46;
// Insets the tabs so the dip under an edge tab clips less of the rounded corner.
const INSET = 14;

// The bar background is twice the bar's width with the dip in the middle.
// Sliding it with translateX moves the dip under the active tab on the native
// driver; the bar's overflow clips the rest.
function dippedShape(width) {
  const c = width;
  const w = DIP_HALF_WIDTH;
  return (
    `M0 0H${c - w}` +
    `C${c - w + 16} 0 ${c - 36} ${DIP_DEPTH} ${c} ${DIP_DEPTH}` +
    `C${c + 36} ${DIP_DEPTH} ${c + w - 16} 0 ${c + w} 0` +
    `H${width * 2}V600H0Z`
  );
}

export default function CurvedBar({ items, activeIndex, onSelect, bottomInset }) {
  const { position, progress } = useTabAnimation(activeIndex, items.length);
  const [width, onLayout] = useLayoutWidth();
  const tabWidth = (width - INSET * 2) / items.length;
  const bubbleX = useIndicatorX(position, tabWidth, BUBBLE, INSET);
  // Dip center is at x = width inside the shape; move it to the tab center.
  const shapeX = useIndicatorX(position, tabWidth, width * 2, INSET);
  const shape = useMemo(() => (width > 0 ? dippedShape(width) : null), [width]);

  return (
    <View style={[styles.container, { marginBottom: 12 + bottomInset }]}>
      <View style={styles.bar} onLayout={onLayout}>
        {shape ? (
          <Animated.View
            pointerEvents="none"
            style={[styles.shape, { width: width * 2, transform: [{ translateX: shapeX }] }]}
          >
            <Svg width="100%" height="100%">
              <Path d={shape} fill={colors.primary} />
            </Svg>
          </Animated.View>
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
              filled={false}
              // The active icon moves up into the bubble; its label stays.
              color={active ? 'transparent' : 'rgba(255, 255, 255, 0.75)'}
              labelColor={active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)'}
            />
          )}
        />
      </View>
      {width > 0 ? (
        <Animated.View
          pointerEvents="none"
          style={[styles.bubble, { transform: [{ translateX: bubbleX }] }]}
        >
          {items.map((item, index) => (
            <Animated.View
              key={item.key}
              style={[styles.bubbleIcon, { opacity: progress[index] }]}
            >
              <Icon name={item.icon} size={24} color={colors.primary} filled />
            </Animated.View>
          ))}
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    paddingTop: RISE,
  },
  bar: {
    borderRadius: 26,
    overflow: 'hidden',
    paddingTop: DIP_DEPTH - 12,
    paddingBottom: 8,
    paddingHorizontal: INSET,
  },
  shape: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  row: {
    height: 52,
  },
  bubble: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: BUBBLE,
    height: BUBBLE,
    borderRadius: BUBBLE / 2,
    backgroundColor: colors.surface,
    boxShadow: '0px 6px 14px rgba(108, 76, 241, 0.35)',
  },
  bubbleIcon: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
