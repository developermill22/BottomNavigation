import { useId } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

// Fills its parent with a linear gradient. Give the parent `overflow: 'hidden'`
// and a borderRadius to round it.
export default function GradientFill({ colors, start = [0, 0], end = [1, 0], style }) {
  const id = `gradient-${useId()}`;
  const last = colors.length - 1;

  return (
    <Svg style={[StyleSheet.absoluteFill, style]} pointerEvents="none">
      <Defs>
        <LinearGradient id={id} x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]}>
          {colors.map((color, i) => (
            <Stop key={color + i} offset={last === 0 ? 0 : i / last} stopColor={color} />
          ))}
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill={`url(#${id})`} />
    </Svg>
  );
}
