import { StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import GradientFill from './GradientFill';

// Colorful backgrounds for the screens that need something behind a glass bar.
// Blob radii are percentages, so they scale from the preview to a full screen.
const DECOR = {
  aurora: {
    gradient: ['#5B3FD9', '#4F8BFF', '#FF6FB5'],
    blobs: [
      { cx: '18%', cy: '88%', r: '24%', fill: '#FFB86B', opacity: 0.85 },
      { cx: '55%', cy: '96%', r: '19%', fill: '#FF5FA2', opacity: 0.9 },
      { cx: '88%', cy: '80%', r: '22%', fill: '#38D6FF', opacity: 0.8 },
    ],
  },
  pastel: {
    gradient: ['#E9E4FF', '#FFE6F0', '#E2F3FF'],
    blobs: [
      { cx: '12%', cy: '82%', r: '21%', fill: '#C9B8FF', opacity: 0.8 },
      { cx: '80%', cy: '92%', r: '24%', fill: '#FFC1D9', opacity: 0.8 },
    ],
  },
};

export default function ScreenBackdrop({ screen }) {
  const decor = DECOR[screen];
  if (!decor) return null;

  return (
    <>
      <GradientFill colors={decor.gradient} start={[0, 0]} end={[1, 1]} />
      <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
        {decor.blobs.map((blob) => (
          <Circle key={`${blob.cx}-${blob.cy}`} {...blob} />
        ))}
      </Svg>
    </>
  );
}
