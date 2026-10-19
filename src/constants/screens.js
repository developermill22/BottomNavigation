import { colors, shadows } from './theme';

// Screen tones the bars are shown on, in the previews and the full examples.
export const SCREENS = {
  light: {
    background: '#F4F5FA',
    text: colors.ink,
    subtext: colors.muted,
    card: colors.surface,
    cardShadow: shadows.soft,
    skeleton: '#E3E5EE',
    statusBar: 'dark',
  },
  neu: {
    background: colors.neu,
    text: '#4B5168',
    subtext: '#8A90A6',
    card: colors.neu,
    cardShadow: `6px 6px 12px ${colors.neuShadow}, -6px -6px 12px ${colors.neuLight}`,
    skeleton: '#D8DCE5',
    statusBar: 'dark',
  },
  dark: {
    background: '#17142B',
    text: '#FFFFFF',
    subtext: 'rgba(255, 255, 255, 0.6)',
    card: 'rgba(255, 255, 255, 0.08)',
    skeleton: 'rgba(255, 255, 255, 0.12)',
    statusBar: 'light',
  },
  aurora: {
    background: '#5B3FD9',
    text: '#FFFFFF',
    subtext: 'rgba(255, 255, 255, 0.78)',
    card: 'rgba(255, 255, 255, 0.16)',
    cardBorder: 'rgba(255, 255, 255, 0.25)',
    skeleton: 'rgba(255, 255, 255, 0.28)',
    statusBar: 'light',
  },
  pastel: {
    background: '#EDE9FF',
    text: colors.ink,
    subtext: '#6B6F85',
    card: 'rgba(255, 255, 255, 0.72)',
    cardBorder: 'rgba(255, 255, 255, 0.9)',
    skeleton: 'rgba(255, 255, 255, 0.7)',
    statusBar: 'dark',
  },
};
