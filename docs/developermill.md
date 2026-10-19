# 11 Animated Bottom Navigation Styles in Expo (React Native)

## Summary

**One component, 11 bottom tab bar styles, every animation on the native driver.** `BottomNavigation` is a drop-in tab bar for Expo and React Native. You choose a style with one `variant` prop: no navigation library and no animation library.

**The 11 styles**

| # | Style | What makes it different |
| --- | --- | --- |
| 01 | Minimal Clean | Filled active icon and a sliding dot |
| 02 | Glassmorphism | Frosted floating bar over colorful content |
| 03 | Floating | Detached white pill with a spinning Create button |
| 04 | Neumorphism | Soft raised bar with a sliding inset "pressed" well |
| 05 | Pill Highlight | Tinted pill that glides behind the active tab |
| 06 | Center FAB | Raised action button sitting in a curved notch |
| 07 | Gradient Bold | Purple-to-pink bar with a white bubble on the active icon |
| 08 | Outline Icons | Thin strokes and a sliding underline |
| 09 | Tab with Indicator | Indicator line along the top edge |
| 10 | Curved Background | Dip in the bar that follows the active tab, icon in a floating bubble |
| 11 | Dock | Frosted iOS-style dock with a magnifying active icon |

**Techniques worth stealing**

- **Color changes on the native driver.** Each tab is drawn twice, inactive and active, and the two copies crossfade. Color, filled icon and bold label all animate without any JS work per frame.
- **One spring, many indicators.** A single animated `position` drives every sliding dot, pill, underline and well with `Animated.add`/`multiply`. A separate fade per tab keeps the tabs in between from flashing.
- **A moving curve without animating SVG paths.** The curved background is drawn twice as wide as the bar and slid with `translateX`, so the dip follows the active tab at 60fps.
- **Neumorphism in plain styles.** React Native's `boxShadow` now supports `inset` and multiple shadows.
- **Real glass on Android.** `expo-blur` needs the content behind it wrapped in a `BlurTargetView`, and the component takes that ref as `blurTarget`.
- **Icons as SVG paths, not an icon font.** Each icon has an outline form and a filled form with cutouts, so you can see the door on the filled house.

**Ready for real screens.** The demo gallery previews every style in a phone frame. Tap a card and it opens a full-screen example app: safe-area insets, content that scrolls under the bar, a page per tab (feed, discover, projects, messages, analytics, profile, create) and a back button that also handles Android's hardware back.

```jsx
<BottomNavigation
  variant="curved"
  items={tabs}
  activeIndex={index}
  onChange={setIndex}
  bottomInset={insets.bottom}
/>
```

**Stack:** Expo SDK 57 · React Native 0.86 · JavaScript · built-in `Animated` · `react-native-svg` · `expo-blur` · `react-native-safe-area-context`

**Gotcha:** React Native 0.86 removed `StyleSheet.absoluteFillObject`. Spreading it fails without any error and the overlay quietly lays out in normal flow, so use `...StyleSheet.absoluteFill`.

---

A bottom tab bar is the part of an app people touch most, and also one of the easiest places to make the app feel a bit more polished. This post builds one `BottomNavigation` component that renders 11 styles: minimal, glassmorphism, floating, neumorphism, pill, center FAB, gradient, outline, top indicator, curved and iOS dock. Every animation runs on the native driver.

**Stack:** Expo SDK 57, React Native 0.86, plain JavaScript, built-in `Animated`.
**Extra packages:** `react-native-svg` (icons, gradients, curves), `expo-blur` (frosted glass), `react-native-safe-area-context` (insets).

```sh
npx expo install react-native-svg expo-blur react-native-safe-area-context
```

All three include native code, so rebuild the dev client afterwards (`npx expo run:ios` / `npx expo run:android`).

## Usage

```jsx
import BottomNavigation from './src/components/BottomNavigation';

const tabs = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'search', label: 'Search', icon: 'search' },
  { key: 'create', label: 'Create', icon: 'plus', action: true },
  { key: 'inbox', label: 'Inbox', icon: 'bell' },
  { key: 'profile', label: 'Profile', icon: 'user' },
];

function Screen() {
  const [index, setIndex] = useState(0);
  const insets = useSafeAreaInsets();

  return (
    <BottomNavigation
      variant="floating"
      items={tabs}
      activeIndex={index}
      onChange={setIndex}
      onAction={() => openComposer()}
      bottomInset={insets.bottom}
    />
  );
}
```

| Prop | What it does |
| --- | --- |
| `variant` | `minimal`, `glass`, `floating`, `neumorphism`, `pill`, `centerFab`, `gradient`, `outline`, `indicator`, `curved`, `dock` |
| `items` | `{ key, label, icon, action? }`. `action: true` turns the item into a create button instead of a tab |
| `activeIndex` / `onChange` | Controlled selection |
| `onAction` | Called when an `action` item is pressed |
| `bottomInset` | Safe-area bottom inset. Docked bars pad by it, floating bars lift by it |
| `blurTarget` | Android only, for `glass` and `dock` (see below) |

## Project layout

```
src/
  constants/
    icons.js        SVG path data (Lucide-style 24×24 outline icons)
    navigation.js   tab sets + the 11 variant configs
    theme.js        colors, gradients, box shadows
  components/
    Icon.js         outline / filled icon renderer
    GradientFill.js SVG linear gradient that fills its parent
    BottomNavigation/
      index.js            picks the variant
      useTabAnimation.js  shared animation state
      TabButton.js        one tab: crossfade + press spring
      TabRow.js           equal-width row + IconLabel
      ActionButton.js     spinning "create" button
      variants/           one file per style
```

## The animation model

All 11 bars share one hook:

```js
export function useTabAnimation(activeIndex, count) {
  const position = useRef(new Animated.Value(activeIndex)).current;
  const progress = useRef(
    Array.from({ length: count }, (_, i) => new Animated.Value(i === activeIndex ? 1 : 0)),
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(position, { toValue: activeIndex, damping: 18, stiffness: 190, mass: 0.9, useNativeDriver: true }),
      ...progress.map((value, i) =>
        Animated.timing(value, { toValue: i === activeIndex ? 1 : 0, duration: 220, useNativeDriver: true }),
      ),
    ]).start();
  }, [activeIndex, position, progress]);

  return { position, progress };
}
```

There are two kinds of value because they do different jobs:

- **`position`** springs from one index to the next and drives anything that slides: dots, pills, underlines, wells, the curve. A sliding indicator is just `position * tabWidth + (tabWidth - indicatorWidth) / 2`, built with `Animated.add` and `Animated.multiply`, which are native-driver safe.
- **`progress[i]`** fades one tab in or out. If tab highlights were interpolated from `position` instead, jumping from tab 0 to tab 4 would light up tabs 1–3 as the spring passed over them.

### Color changes on the native driver

The native driver can only animate `transform` and `opacity`, not `color`. So `TabButton` draws the tab twice, once inactive and once active, stacks the two layers, and crossfades them:

```jsx
<Animated.View style={{ opacity: inactiveOpacity }}>{renderLayer(false)}</Animated.View>
<Animated.View style={[styles.activeLayer, { opacity: progress }]}>{renderLayer(true)}</Animated.View>
```

This one trick gives a smooth gray-to-purple transition, the switch from outline to filled icon, and the label weight change, all at 60fps with no JS work per frame. Each variant only supplies `renderLayer(item, active)`.

`TabButton` also handles press feedback (a spring to `0.86` scale on press-in), an optional `lift` (the active tab floats up a couple of pixels) and `activeScale` (the dock's magnify effect).

## Icons without an icon font

Icons are SVG path data in `constants/icons.js`, adapted from Lucide. Each icon has `body` paths and optional `detail` paths:

```js
home: {
  body: ['M3 10a2 2 0 0 1 .709-1.528l7-5.999 ...'],
  detail: ['M15 21v-8a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v8'], // the door
},
```

When the icon is drawn `filled`, the body gets filled and the detail paths are stroked in a `cutoutColor` (usually the bar background), so the door is still visible on a solid house. Icons that look wrong filled, like search or plus, set `fillable: false` and get a slightly heavier stroke instead.

## Highlights from the variants

**Glassmorphism and Dock: blur on Android.** Since SDK 55, `expo-blur` blurs on Android only when it knows what to blur. Wrap the screen content in a `BlurTargetView` and pass its ref to the bar:

```jsx
const blurTarget = useRef(null);

<BlurTargetView ref={blurTarget} style={StyleSheet.absoluteFill}>
  {/* screen content */}
</BlurTargetView>
<BottomNavigation variant="glass" blurTarget={blurTarget} ... />
```

The bars use `blurMethod="dimezisBlurViewSdk31Plus"`, which blurs on Android 12+ and falls back to translucent on older devices. Also, `BlurView` ignores `borderRadius`, so round it with `overflow: 'hidden'` on a parent and put the shadow on a wrapper outside that parent.

**Neumorphism: inset shadows are just styles now.** React Native's `boxShadow` takes CSS syntax, including `inset` and multiple shadows:

```js
neuRaised: '8px 8px 16px #C5CAD6, -8px -8px 16px #FFFFFF',
neuInset: 'inset 3px 3px 6px #C5CAD6, inset -3px -3px 6px #FFFFFF',
```

The bar uses the raised shadow, and a sliding "well" with the inset shadow moves under the active tab.

**Center FAB: a notched bar.** The bar background is an SVG path with a cubic-curve notch cut out of the top edge, centered on the bar's measured width. The FAB overhangs the bar by half its height. That overhang is padding inside the component, not a negative offset, because Android doesn't deliver touches outside a parent's bounds and the top half of the button would stop working.

**Curved Background: an animated SVG curve without animating the path.** Changing SVG path data every frame can't run on the native driver. Instead the background is drawn **twice as wide as the bar**, with the dip at its center, and slid with `translateX` so the dip sits under the active tab. The bar's `overflow: 'hidden'` clips the rest. A white bubble slides on the same `position` value, and the active icon crossfades from the row into the bubble.

```js
// dip center is at x = width inside the shape; move it to the tab center
const shapeX = position * tabWidth + tabWidth / 2 - width;
```

**Gradient Bold.** The `GradientFill` component renders an SVG `LinearGradient` behind the row, and the active tab's white bubble lives inside the active layer, so it fades and pops in through the same crossfade.

## Design tips baked in

- Keep 4–5 items. The row divides its width equally, so a sixth item squeezes the labels.
- Make the active state obvious: color, filled icon, bold label and an indicator together.
- Use one consistent icon style. The whole set shares a 24×24 grid and stroke caps.
- Keep tap targets at least 48×48. Every `TabButton` has `minHeight: 48` and takes a full column width.
- Add micro-interactions: press springs, sliding indicators, a spinning plus.

## Using it on a real screen

A tab bar only proves itself on a full screen, with real insets and content scrolling underneath it. In the demo, tapping a card opens that style in a full-screen example built with React Native's own `Modal`, so no navigation library is needed:

```jsx
<Modal
  visible={config != null}
  animationType="slide"
  presentationStyle="fullScreen"
  statusBarTranslucent
  navigationBarTranslucent
  onRequestClose={onClose}
>
  <SafeAreaProvider>
    <ExampleScreen config={config} onClose={onClose} />
  </SafeAreaProvider>
</Modal>
```

The screen applies the same rules you'd use in an app:

- **Wrap the modal's content in its own `SafeAreaProvider`.** Insets don't carry across the native modal boundary.
- **Overlay the bar instead of stacking it.** The bar is absolutely positioned at the bottom, and the bar slot's `onLayout` height becomes the scroll view's `paddingBottom`. Content scrolls under the bar, so the glass and dock styles have something to blur, and the last row never ends up hidden behind the bar.
- **Pass `useSafeAreaInsets().bottom` as `bottomInset`.** Docked bars extend under the home indicator, and floating bars sit above it.
- **Remount the scroll view per tab (`key={tab.key}`).** Each page then starts at the top. A short fade-and-rise runs on the native driver as each page appears.

## Source

The demo app (`App.js`) shows all 11 styles in phone-frame previews. You can try each bar in place, or open a card for the full example with a page per tab: feed, discover grid, project list, messages, analytics, profile and create.
