// Sample content for the full-screen examples. Each tab key maps to a layout
// `kind` that TabContent knows how to draw.

export const ACCENTS = ['#6C4CF1', '#F25FB5', '#3BA3FF', '#22B07D', '#FF9F43'];

export const TAB_CONTENT = {
  home: { kind: 'feed', heading: 'Good morning, Alex', subheading: "Here's what's new today" },
  explore: { kind: 'discover', heading: 'Explore', subheading: 'Collections picked for you' },
  search: { kind: 'discover', heading: 'Search', subheading: 'Find people, projects and ideas' },
  browse: { kind: 'discover', heading: 'Browse', subheading: 'Everything in one place' },
  projects: { kind: 'list', heading: 'Projects', subheading: '4 active this week' },
  work: { kind: 'list', heading: 'Work', subheading: 'Tasks across your teams' },
  library: { kind: 'list', heading: 'Library', subheading: 'Your saved collections' },
  saved: { kind: 'list', heading: 'Saved', subheading: 'Bookmarks you kept for later' },
  inbox: { kind: 'messages', heading: 'Inbox', subheading: '3 unread notifications' },
  activity: { kind: 'messages', heading: 'Activity', subheading: 'Updates from your network' },
  message: { kind: 'messages', heading: 'Messages', subheading: '2 unread conversations' },
  analytics: { kind: 'stats', heading: 'Analytics', subheading: 'Last 7 days' },
  profile: { kind: 'profile', heading: 'Profile', subheading: 'Account and settings' },
  create: { kind: 'create', heading: 'Create', subheading: 'What do you want to make?' },
};

export const FEED = [
  { title: 'Design review moved to 3 PM', meta: 'Calendar · 10 min ago', icon: 'calendar' },
  { title: 'Maya shared “Onboarding v2”', meta: 'Projects · 32 min ago', icon: 'folder' },
  { title: '5 new comments on your post', meta: 'Activity · 1 h ago', icon: 'message' },
  { title: 'Weekly report is ready', meta: 'Analytics · 2 h ago', icon: 'chart' },
  { title: 'Saved “Motion principles”', meta: 'Library · Yesterday', icon: 'bookmark' },
];

export const CHIPS = ['All', 'Design', 'Motion', 'Mobile', 'Branding', '3D'];

export const TILES = [
  { title: 'UI Kits', count: '128 items' },
  { title: 'Icons', count: '2.4k items' },
  { title: 'Illustrations', count: '312 items' },
  { title: 'Templates', count: '86 items' },
  { title: 'Mockups', count: '54 items' },
  { title: 'Fonts', count: '41 items' },
];

export const LIST_ITEMS = [
  { title: 'Mobile banking app', meta: 'Due Fri · 6 tasks left', progress: 0.72, icon: 'folder' },
  { title: 'Brand refresh', meta: 'Due Mon · 12 tasks left', progress: 0.45, icon: 'pen' },
  { title: 'Dashboard redesign', meta: 'Due in 2 weeks', progress: 0.3, icon: 'chart' },
  { title: 'Marketing site', meta: 'Review pending', progress: 0.9, icon: 'grid' },
  { title: 'Design system docs', meta: 'Ongoing', progress: 0.58, icon: 'library' },
  { title: 'Icon set v3', meta: 'Due next month', progress: 0.15, icon: 'bookmark' },
];

export const MESSAGES = [
  { name: 'Maya Patel', text: 'Love the new nav animation! 🎉', time: '2m', unread: true },
  { name: 'Leo Chen', text: 'Can you share the Figma link?', time: '18m', unread: true },
  { name: 'Design Team', text: 'Sprint planning starts at 10', time: '1h', unread: true },
  { name: 'Sara Kim', text: 'Thanks, looks great.', time: '3h' },
  { name: 'Omar Ali', text: 'Sent you the updated assets', time: 'Yesterday' },
  { name: 'Nina Ross', text: 'Let’s sync tomorrow morning', time: 'Mon' },
];

export const STATS = [
  { label: 'Visitors', value: '24.8k', delta: '+12%' },
  { label: 'Sessions', value: '3m 42s', delta: '+4%' },
  { label: 'Sign-ups', value: '1,284', delta: '+18%' },
  { label: 'Bounce', value: '32%', delta: '-3%' },
];

export const WEEK = [
  { day: 'M', value: 0.45 },
  { day: 'T', value: 0.7 },
  { day: 'W', value: 0.55 },
  { day: 'T', value: 0.9 },
  { day: 'F', value: 0.65 },
  { day: 'S', value: 0.35 },
  { day: 'S', value: 0.5 },
];

export const PROFILE = {
  name: 'Alex Morgan',
  handle: '@alexdesigns',
  stats: [
    { label: 'Projects', value: '24' },
    { label: 'Followers', value: '1.2k' },
    { label: 'Following', value: '318' },
  ],
  settings: [
    { label: 'Edit profile', icon: 'user' },
    { label: 'Notifications', icon: 'bell' },
    { label: 'Saved items', icon: 'bookmark' },
    { label: 'Workspace', icon: 'briefcase' },
  ],
};

export const CREATE_OPTIONS = [
  { label: 'New post', hint: 'Share an update', icon: 'pen' },
  { label: 'Project', hint: 'Start a workspace', icon: 'folder' },
  { label: 'Event', hint: 'Schedule a meeting', icon: 'calendar' },
  { label: 'Message', hint: 'Start a chat', icon: 'message' },
];
