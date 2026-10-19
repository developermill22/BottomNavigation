import { BlurView } from 'expo-blur';
import { Animated, StyleSheet, View } from 'react-native';
import TabRow, { IconLabel } from '../TabRow';
import { useIndicatorX, useLayoutWidth, useTabAnimation } from '../useTabAnimation';

const ROW = 60;
const BUBBLE_INSET = 6;

// On Android the blur only works when `blurTarget` is a ref to a
// BlurTargetView wrapping the content behind the bar.
export default function GlassBar({ items, activeIndex, onSelect, bottomInset, blurTarget }) {
  const { position, progress } = useTabAnimation(activeIndex, items.length);
  const [width, onLayout] = useLayoutWidth();
  const tabWidth = width / items.length;
  const bubbleWidth = Math.max(tabWidth - BUBBLE_INSET * 2, 0);
  const translateX = useIndicatorX(position, tabWidth, bubbleWidth);

  return (
    <View style={[styles.wrap, { marginBottom: 12 + bottomInset }]}>
      <View style={styles.glass}>
        <BlurView
          intensity={40}
          tint="light"
          blurTarget={blurTarget}
          blurMethod="dimezisBlurViewSdk31Plus"
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.sheen} />
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
                style={[styles.bubble, { width: bubbleWidth, transform: [{ translateX }] }]}
              />
            ) : null
          }
          renderLayer={(item, active) => (
            <IconLabel
              icon={item.icon}
              label={item.label}
              active={active}
              filled={false}
              strokeWidth={active ? 2.3 : 1.9}
              color={active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.78)'}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 14,
    borderRadius: 26,
    boxShadow: '0px 10px 30px rgba(40, 20, 90, 0.25)',
  },
  glass: {
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.45)',
    padding: 4,
  },
  sheen: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
  },
  row: {
    height: ROW,
  },
  bubble: {
    position: 'absolute',
    left: 0,
    top: 4,
    height: ROW - 8,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.24)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
});
