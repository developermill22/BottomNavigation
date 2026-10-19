import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';

// `position` springs to the active index and drives sliding indicators.
// `progress[i]` fades 0 → 1 for the active tab, so tabs passed over while the
// indicator slides don't light up along the way.
export function useTabAnimation(activeIndex, count) {
  const position = useRef(new Animated.Value(activeIndex)).current;
  const progress = useRef(
    Array.from({ length: count }, (_, i) => new Animated.Value(i === activeIndex ? 1 : 0)),
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(position, {
        toValue: activeIndex,
        damping: 18,
        stiffness: 190,
        mass: 0.9,
        useNativeDriver: true,
      }),
      ...progress.map((value, i) =>
        Animated.timing(value, {
          toValue: i === activeIndex ? 1 : 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ),
    ]).start();
  }, [activeIndex, position, progress]);

  return { position, progress };
}

export function useLayoutWidth() {
  const [width, setWidth] = useState(0);
  const onLayout = useCallback((event) => setWidth(event.nativeEvent.layout.width), []);
  return [width, onLayout];
}

// translateX that centers an indicator of `indicatorWidth` under the active tab.
// `offset` is where the first tab starts relative to the indicator's parent.
export function useIndicatorX(position, tabWidth, indicatorWidth, offset = 0) {
  return useMemo(
    () =>
      Animated.add(
        Animated.multiply(position, tabWidth),
        offset + (tabWidth - indicatorWidth) / 2,
      ),
    [position, tabWidth, indicatorWidth, offset],
  );
}
