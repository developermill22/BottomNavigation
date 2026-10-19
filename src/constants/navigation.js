const tab = (key, label, icon, extra) => ({ key, label, icon, ...extra });

const HOME = tab('home', 'Home', 'home');
const EXPLORE = tab('explore', 'Explore', 'explore');
const SEARCH = tab('search', 'Search', 'search');
const PROJECTS = tab('projects', 'Projects', 'folder');
const SAVED = tab('saved', 'Saved', 'bookmark');
const PROFILE = tab('profile', 'Profile', 'user');
const INBOX = tab('inbox', 'Inbox', 'bell');
const ACTIVITY = tab('activity', 'Activity', 'bell');
const MESSAGE = tab('message', 'Message', 'message');
const ANALYTICS = tab('analytics', 'Analytics', 'chart');
const WORK = tab('work', 'Work', 'briefcase');
const BROWSE = tab('browse', 'Browse', 'grid');
const LIBRARY = tab('library', 'Library', 'library');
const CREATE_TAB = tab('create', 'Create', 'plusCircle');
// `action` items trigger onAction instead of becoming the active tab.
const CREATE_ACTION = tab('create', 'Create', 'plus', { action: true });

// `screen` picks the demo backdrop; `homeIndicator` is the tone of the
// simulated iPhone home indicator drawn over the bar.
export const NAV_VARIANTS = [
  {
    variant: 'minimal',
    number: '01',
    title: 'Minimal Clean',
    tags: ['Simple', 'Clean', 'Focused'],
    items: [HOME, EXPLORE, PROJECTS, SAVED, PROFILE],
    screen: 'light',
    homeIndicator: 'dark',
  },
  {
    variant: 'glass',
    number: '02',
    title: 'Glassmorphism',
    tags: ['Modern', 'Blurred', 'Aesthetic'],
    items: [HOME, EXPLORE, PROJECTS, SAVED, PROFILE],
    screen: 'aurora',
    homeIndicator: 'light',
  },
  {
    variant: 'floating',
    number: '03',
    title: 'Floating (Detached)',
    tags: ['Floating', 'Premium', 'Elevated'],
    items: [HOME, SEARCH, CREATE_ACTION, INBOX, PROFILE],
    screen: 'dark',
    homeIndicator: 'light',
  },
  {
    variant: 'neumorphism',
    number: '04',
    title: 'Neumorphism',
    tags: ['Soft', 'Subtle', 'Smooth'],
    items: [HOME, SEARCH, ANALYTICS, MESSAGE, PROFILE],
    screen: 'neu',
    homeIndicator: 'dark',
  },
  {
    variant: 'pill',
    number: '05',
    title: 'Pill Highlight',
    tags: ['Clear', 'Friendly', 'Usable'],
    items: [HOME, EXPLORE, PROJECTS, SAVED, PROFILE],
    screen: 'light',
    homeIndicator: 'dark',
  },
  {
    variant: 'centerFab',
    number: '06',
    title: 'Center FAB',
    tags: ['Action Focused', 'Bold', 'Creative'],
    items: [HOME, EXPLORE, CREATE_ACTION, INBOX, PROFILE],
    screen: 'light',
    homeIndicator: 'dark',
  },
  {
    variant: 'gradient',
    number: '07',
    title: 'Gradient Bold',
    tags: ['Vibrant', 'Modern', 'Eye-catching'],
    items: [HOME, SEARCH, CREATE_TAB, ACTIVITY, PROFILE],
    screen: 'light',
    homeIndicator: 'light',
  },
  {
    variant: 'outline',
    number: '08',
    title: 'Outline Icons',
    tags: ['Light', 'Minimal', 'Elegant'],
    items: [HOME, EXPLORE, WORK, MESSAGE, PROFILE],
    screen: 'light',
    homeIndicator: 'dark',
  },
  {
    variant: 'indicator',
    number: '09',
    title: 'Tab with Indicator',
    tags: ['Indicator', 'Simple', 'Intuitive'],
    items: [HOME, SEARCH, PROJECTS, INBOX, PROFILE],
    screen: 'light',
    homeIndicator: 'dark',
  },
  {
    variant: 'curved',
    number: '10',
    title: 'Curved Background',
    tags: ['Soft Curve', 'Different', 'Stylish'],
    items: [HOME, EXPLORE, CREATE_TAB, SAVED, PROFILE],
    screen: 'light',
    homeIndicator: 'dark',
  },
  {
    variant: 'dock',
    number: '11',
    title: 'Dock Style (iOS Inspired)',
    tags: ['iOS Look', 'Floating Dock', 'Smooth'],
    items: [HOME, BROWSE, LIBRARY, SEARCH, PROFILE],
    screen: 'pastel',
    homeIndicator: 'dark',
  },
];

export const DESIGN_TIPS = [
  'Keep 4–5 items only',
  'Active state should be clear',
  'Use consistent icon style',
  'Min. tap area 48×48',
  'Add micro interactions',
];
