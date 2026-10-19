import { BlurView } from 'expo-blur';
import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '../../../constants/theme';
import TabRow, { IconLabel } from '../TabRow';
import { useIndicatorX, useLayoutWidth, useTabAnimation } from '../useTabAnimation';

const ROW = 60;

// iOS-dock look: frosted floating tray, the active icon magnifies.
export default function DockBar({ items, activeIndex, onSelect, bottomInset, blurTarget }) {
  const { position, progress } = useTabAnimation(activeIndex, items.length);
  const [width, onLayout] = useLayoutWidth();
  const tabWidth = width / items.length;
  const tileWidth = Math.max(tabWidth - 8, 0);
  const translateX = useIndicatorX(position, tabWidth, tileWidth);

  return (
    <View style={[styles.wrap, { marginBottom: 12 + bottomInset }]}>
      <View style={styles.dock}>
        <BlurView
          intensity={60}
          tint="light"
          blurTarget={blurTarget}
          blurMethod="dimezisBlurViewSdk31Plus"
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.frost} />
        <TabRow
          items={items}
          activeIndex={activeIndex}
          progress={progress}
          onSelect={onSelect}
          onLayout={onLayout}
          style={styles.row}
          activeScale={1.08}
          underlay={
            width > 0 ? (
              <Animated.View
                style={[styles.tile, { width: tileWidth, transform: [{ translateX }] }]}
              />
            ) : null
          }
          renderLayer={(item, active) => (
            <IconLabel
              icon={item.icon}
              label={item.label}
              active={active}
              cutoutColor="#ECE8FD"
              color={active ? colors.primary : '#4B4F63'}
              strokeWidth={1.8}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 16,
    borderRadius: 30,
    boxShadow: '0px 12px 30px rgba(30, 30, 60, 0.18)',
  },
  dock: {
    borderRadius: 30,
    overflow: 'hidden',
    padding: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  frost: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
  row: {
    height: ROW,
  },
  tile: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: ROW,
    borderRadius: 20,
    backgroundColor: 'rgba(108, 76, 241, 0.12)',
  },
});
