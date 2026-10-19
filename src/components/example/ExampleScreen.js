import { BlurTargetView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNavigation from '../BottomNavigation';
import Icon from '../Icon';
import ScreenBackdrop from '../ScreenBackdrop';
import TabContent from './TabContent';
import Toast from './Toast';
import { SCREENS } from '../../constants/screens';

// A full app screen for one bar style: real safe-area insets, a page per tab,
// and content that scrolls underneath the bar.
export default function ExampleScreen({ config, onClose }) {
  const insets = useSafeAreaInsets();
  const blurTarget = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [barHeight, setBarHeight] = useState(0);
  const [toast, setToast] = useState(null);
  const enter = useRef(new Animated.Value(0)).current;

  const tone = SCREENS[config.screen] ?? SCREENS.light;
  const tab = config.items[activeIndex];

  // Each tab page fades and rises in when it becomes active.
  useEffect(() => {
    enter.setValue(0);
    Animated.timing(enter, { toValue: 1, duration: 260, useNativeDriver: true }).start();
  }, [activeIndex, enter]);

  const translateY = enter.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });

  return (
    <View style={[styles.screen, { backgroundColor: tone.background }]}>
      <StatusBar style={tone.statusBar} />
      {/* Everything the glass and dock bars should blur goes in here. */}
      <BlurTargetView ref={blurTarget} style={styles.screen}>
        <ScreenBackdrop screen={config.screen} />
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to all styles"
            onPress={onClose}
            hitSlop={8}
            style={({ pressed }) => [
              styles.back,
              {
                backgroundColor: tone.card,
                boxShadow: tone.cardShadow,
                borderColor: tone.cardBorder ?? 'transparent',
              },
              pressed && styles.pressed,
            ]}
          >
            <Icon name="chevronLeft" size={22} color={tone.text} strokeWidth={2.4} />
          </Pressable>
          <View style={styles.headerText}>
            <Text numberOfLines={1} style={[styles.headerTitle, { color: tone.text }]}>
              {config.title}
            </Text>
            <Text numberOfLines={1} style={[styles.headerTags, { color: tone.subtext }]}>
              {config.number} · {config.tags.join(' • ')}
            </Text>
          </View>
        </View>
        <ScrollView
          // A fresh scroll view per tab starts each page at the top.
          key={tab.key}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.content, { paddingBottom: barHeight + 24 }]}
        >
          <Animated.View style={{ opacity: enter, transform: [{ translateY }] }}>
            <TabContent tab={tab} tone={tone} />
          </Animated.View>
        </ScrollView>
      </BlurTargetView>

      <View
        style={styles.barSlot}
        pointerEvents="box-none"
        onLayout={(event) => setBarHeight(event.nativeEvent.layout.height)}
      >
        <BottomNavigation
          variant={config.variant}
          items={config.items}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          onAction={(item) => setToast({ id: Date.now(), message: `${item.label} tapped` })}
          bottomInset={insets.bottom}
          blurTarget={blurTarget}
        />
      </View>

      {toast ? <Toast key={toast.id} message={toast.message} bottom={barHeight + 12} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  back: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    transform: [{ scale: 0.92 }],
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  headerTags: {
    fontSize: 12,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  barSlot: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
