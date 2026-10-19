import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from '../Icon';
import GradientFill from '../GradientFill';
import { colors, gradients } from '../../constants/theme';
import {
  ACCENTS,
  CHIPS,
  CREATE_OPTIONS,
  FEED,
  LIST_ITEMS,
  MESSAGES,
  PROFILE,
  STATS,
  TAB_CONTENT,
  TILES,
  WEEK,
} from '../../constants/exampleContent';

const accent = (index) => ACCENTS[index % ACCENTS.length];

// Sample screen for one tab, drawn in the given screen tone.
export default function TabContent({ tab, tone }) {
  const content = TAB_CONTENT[tab.key] ?? { kind: 'list', heading: tab.label, subheading: '' };
  const Body = BODIES[content.kind];

  return (
    <View style={styles.page}>
      <View style={styles.heading}>
        <Text style={[styles.title, { color: tone.text }]}>{content.heading}</Text>
        <Text style={[styles.subtitle, { color: tone.subtext }]}>{content.subheading}</Text>
      </View>
      <Body tone={tone} />
    </View>
  );
}

function Card({ tone, style, children }) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: tone.card,
          boxShadow: tone.cardShadow,
          borderColor: tone.cardBorder ?? 'transparent',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

function IconTile({ icon, color, size = 44 }) {
  return (
    <View
      style={[
        styles.iconTile,
        { width: size, height: size, borderRadius: size * 0.32, backgroundColor: `${color}22` },
      ]}
    >
      <Icon name={icon} size={size * 0.48} color={color} />
    </View>
  );
}

function Row({ tone, icon, color, title, meta, children }) {
  return (
    <Card tone={tone} style={styles.row}>
      <IconTile icon={icon} color={color} />
      <View style={styles.rowText}>
        <Text numberOfLines={1} style={[styles.rowTitle, { color: tone.text }]}>{title}</Text>
        <Text numberOfLines={1} style={[styles.rowMeta, { color: tone.subtext }]}>{meta}</Text>
        {children}
      </View>
    </Card>
  );
}

function Feed({ tone }) {
  return (
    <>
      <View style={styles.hero}>
        <GradientFill colors={gradients.bold} start={[0, 0]} end={[1, 1]} />
        <Text style={styles.heroEyebrow}>WEEKLY HIGHLIGHTS</Text>
        <Text style={styles.heroTitle}>Your designs got 2.4k views this week</Text>
        <View style={styles.heroButton}>
          <Text style={styles.heroButtonText}>See report</Text>
        </View>
      </View>
      {FEED.map((item, i) => (
        <Row key={item.title} tone={tone} icon={item.icon} color={accent(i)} {...item} />
      ))}
    </>
  );
}

function Discover({ tone }) {
  return (
    <>
      <Card tone={tone} style={styles.search}>
        <Icon name="search" size={20} color={tone.subtext} />
        <Text style={[styles.searchText, { color: tone.subtext }]}>Search anything…</Text>
      </Card>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsScroll}
        contentContainerStyle={styles.chips}
      >
        {CHIPS.map((chip, i) => (
          <View
            key={chip}
            style={[
              styles.chip,
              i === 0 ? styles.chipActive : { backgroundColor: tone.card, borderColor: tone.cardBorder ?? colors.border },
            ]}
          >
            <Text style={[styles.chipText, { color: i === 0 ? '#FFFFFF' : tone.text }]}>{chip}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.grid}>
        {TILES.map((tile, i) => (
          <View key={tile.title} style={[styles.tile, { backgroundColor: accent(i) }]}>
            <GradientFill colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0)']} start={[0, 0]} end={[1, 1]} />
            <Text style={styles.tileTitle}>{tile.title}</Text>
            <Text style={styles.tileCount}>{tile.count}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

function List({ tone }) {
  return LIST_ITEMS.map((item, i) => (
    <Row key={item.title} tone={tone} icon={item.icon} color={accent(i)} {...item}>
      <View style={[styles.track, { backgroundColor: tone.skeleton }]}>
        <View style={[styles.fill, { width: `${item.progress * 100}%`, backgroundColor: accent(i) }]} />
      </View>
    </Row>
  ));
}

function Messages({ tone }) {
  return MESSAGES.map((message, i) => (
    <Card key={message.name} tone={tone} style={styles.row}>
      <View style={[styles.avatar, { backgroundColor: accent(i) }]}>
        <Text style={styles.avatarText}>
          {message.name.split(' ').map((part) => part[0]).join('')}
        </Text>
      </View>
      <View style={styles.rowText}>
        <Text numberOfLines={1} style={[styles.rowTitle, { color: tone.text }]}>{message.name}</Text>
        <Text
          numberOfLines={1}
          style={[styles.rowMeta, { color: message.unread ? tone.text : tone.subtext }]}
        >
          {message.text}
        </Text>
      </View>
      <View style={styles.messageSide}>
        <Text style={[styles.time, { color: tone.subtext }]}>{message.time}</Text>
        {message.unread ? <View style={styles.unread} /> : null}
      </View>
    </Card>
  ));
}

function Stats({ tone }) {
  return (
    <>
      <View style={styles.grid}>
        {STATS.map((stat) => (
          <Card key={stat.label} tone={tone} style={styles.stat}>
            <Text style={[styles.rowMeta, { color: tone.subtext }]}>{stat.label}</Text>
            <Text style={[styles.statValue, { color: tone.text }]}>{stat.value}</Text>
            <Text style={[styles.delta, { color: stat.delta.startsWith('-') ? '#E5484D' : '#22B07D' }]}>
              {stat.delta}
            </Text>
          </Card>
        ))}
      </View>
      <Card tone={tone}>
        <Text style={[styles.rowTitle, { color: tone.text }]}>Visitors this week</Text>
        <View style={styles.chart}>
          {WEEK.map((bar, i) => (
            <View key={i} style={styles.barColumn}>
              <View style={[styles.barTrack, { backgroundColor: tone.skeleton }]}>
                <View
                  style={[
                    styles.bar,
                    { height: `${bar.value * 100}%`, backgroundColor: i === 3 ? colors.primary : `${colors.primary}66` },
                  ]}
                />
              </View>
              <Text style={[styles.barLabel, { color: tone.subtext }]}>{bar.day}</Text>
            </View>
          ))}
        </View>
      </Card>
    </>
  );
}

function Profile({ tone }) {
  return (
    <>
      <Card tone={tone} style={styles.profile}>
        <View style={styles.bigAvatar}>
          <GradientFill colors={gradients.bold} start={[0, 0]} end={[1, 1]} />
          <Text style={styles.bigAvatarText}>AM</Text>
        </View>
        <Text style={[styles.profileName, { color: tone.text }]}>{PROFILE.name}</Text>
        <Text style={[styles.rowMeta, { color: tone.subtext }]}>{PROFILE.handle}</Text>
        <View style={styles.profileStats}>
          {PROFILE.stats.map((stat) => (
            <View key={stat.label} style={styles.profileStat}>
              <Text style={[styles.statValue, { color: tone.text }]}>{stat.value}</Text>
              <Text style={[styles.rowMeta, { color: tone.subtext }]}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </Card>
      {PROFILE.settings.map((item, i) => (
        <Card key={item.label} tone={tone} style={styles.row}>
          <IconTile icon={item.icon} color={accent(i)} size={38} />
          <Text style={[styles.rowTitle, styles.rowText, { color: tone.text }]}>{item.label}</Text>
          <Icon name="chevronRight" size={18} color={tone.subtext} />
        </Card>
      ))}
    </>
  );
}

function Create({ tone }) {
  return (
    <View style={styles.grid}>
      {CREATE_OPTIONS.map((option, i) => (
        <Card key={option.label} tone={tone} style={styles.createOption}>
          <IconTile icon={option.icon} color={accent(i)} size={48} />
          <Text style={[styles.rowTitle, { color: tone.text }]}>{option.label}</Text>
          <Text style={[styles.rowMeta, { color: tone.subtext }]}>{option.hint}</Text>
        </Card>
      ))}
    </View>
  );
}

const BODIES = {
  feed: Feed,
  discover: Discover,
  list: List,
  messages: Messages,
  stats: Stats,
  profile: Profile,
  create: Create,
};

const styles = StyleSheet.create({
  page: {
    gap: 12,
  },
  heading: {
    gap: 4,
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 15,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowText: {
    flex: 1,
    gap: 3,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  rowMeta: {
    fontSize: 13,
  },
  iconTile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    borderRadius: 22,
    padding: 20,
    gap: 8,
    overflow: 'hidden',
    marginBottom: 4,
  },
  heroEyebrow: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
  },
  heroButton: {
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  heroButtonText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  searchText: {
    fontSize: 15,
  },
  chipsScroll: {
    marginHorizontal: -20,
  },
  chips: {
    gap: 8,
    paddingHorizontal: 20,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tile: {
    flexBasis: '47%',
    flexGrow: 1,
    height: 120,
    borderRadius: 20,
    padding: 14,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  tileTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  tileCount: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    marginTop: 2,
  },
  track: {
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  messageSide: {
    alignItems: 'flex-end',
    gap: 6,
  },
  time: {
    fontSize: 12,
  },
  unread: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  stat: {
    flexBasis: '47%',
    flexGrow: 1,
    gap: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  delta: {
    fontSize: 12,
    fontWeight: '700',
  },
  chart: {
    flexDirection: 'row',
    height: 140,
    gap: 10,
    marginTop: 14,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  barTrack: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    borderRadius: 8,
  },
  barLabel: {
    fontSize: 12,
  },
  profile: {
    alignItems: 'center',
    paddingVertical: 22,
    gap: 4,
  },
  bigAvatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  bigAvatarText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
  },
  profileStats: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 14,
  },
  profileStat: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  createOption: {
    flexBasis: '47%',
    flexGrow: 1,
    gap: 6,
    paddingVertical: 18,
  },
});
