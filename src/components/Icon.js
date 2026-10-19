import Svg, { Path } from 'react-native-svg';
import { ICONS } from '../constants/icons';

export default function Icon({
  name,
  size = 24,
  color,
  filled = false,
  cutoutColor = '#FFFFFF',
  strokeWidth = 2,
}) {
  const icon = ICONS[name];
  if (!icon) return null;

  const fill = filled && icon.fillable !== false;
  // Unfillable icons still read as "selected" with a slightly heavier stroke.
  const stroke = filled && !fill ? strokeWidth + 0.4 : strokeWidth;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icon.body.map((d) => (
        <Path key={d} d={d} fill={fill ? color : 'none'} />
      ))}
      {icon.detail?.map((d) => (
        <Path
          key={d}
          d={d}
          stroke={fill ? cutoutColor : color}
          fill={fill ? cutoutColor : 'none'}
        />
      ))}
    </Svg>
  );
}
