import CenterFabBar from './variants/CenterFabBar';
import CurvedBar from './variants/CurvedBar';
import DockBar from './variants/DockBar';
import FloatingBar from './variants/FloatingBar';
import GlassBar from './variants/GlassBar';
import GradientBar from './variants/GradientBar';
import IndicatorBar from './variants/IndicatorBar';
import MinimalBar from './variants/MinimalBar';
import NeumorphicBar from './variants/NeumorphicBar';
import OutlineBar from './variants/OutlineBar';
import PillBar from './variants/PillBar';

const BARS = {
  minimal: MinimalBar,
  glass: GlassBar,
  floating: FloatingBar,
  neumorphism: NeumorphicBar,
  pill: PillBar,
  centerFab: CenterFabBar,
  gradient: GradientBar,
  outline: OutlineBar,
  indicator: IndicatorBar,
  curved: CurvedBar,
  dock: DockBar,
};

export const BOTTOM_NAV_VARIANTS = Object.keys(BARS);

/**
 * Animated bottom tab bar in 11 styles.
 *
 * items        [{ key, label, icon, action? }] where `icon` is a key of ICONS.
 *              Items with `action: true` render as a create button and call
 *              onAction instead of becoming the active tab.
 * activeIndex  index of the selected tab (controlled).
 * onChange     (index, item) => void
 * onAction     (item) => void
 * bottomInset  safe-area bottom inset, e.g. useSafeAreaInsets().bottom.
 * blurTarget   Android only, for `glass` and `dock`: ref to a BlurTargetView
 *              that wraps the screen content behind the bar.
 */
export default function BottomNavigation({
  variant = 'minimal',
  items,
  activeIndex,
  onChange,
  onAction,
  bottomInset = 0,
  blurTarget,
}) {
  const Bar = BARS[variant] ?? MinimalBar;

  const handleSelect = (index) => {
    const item = items[index];
    if (item.action) onAction?.(item);
    else if (index !== activeIndex) onChange?.(index, item);
  };

  return (
    <Bar
      // Each bar keeps one animated value per tab, so remount if the tabs change.
      key={`${variant}:${items.map((item) => item.key).join(',')}`}
      items={items}
      activeIndex={activeIndex}
      onSelect={handleSelect}
      bottomInset={bottomInset}
      blurTarget={blurTarget}
    />
  );
}
