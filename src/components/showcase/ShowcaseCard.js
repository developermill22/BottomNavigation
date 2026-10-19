import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BottomNavigation from '../BottomNavigation';
import Icon from '../Icon';
import PhonePreview, { PREVIEW_INSET } from './PhonePreview';
import { colors } from '../../constants/theme';

// Tap the bar to try it in place; tap the header or the screen above the bar
// to open the full example.
export default function ShowcaseCard({ config, onOpen }) {
  const { variant, number, title, tags, items, screen, homeIndicator } = config;
  const [activeIndex, setActiveIndex] = useState(0);
  const [notice, setNotice] = useState(null);
  const open = () => onOpen(config);

  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Open ${title} example`}
        onPress={open}
        style={({ pressed }) => [styles.header, pressed && styles.headerPressed]}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{number}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.tags}>{tags.join('  •  ')}</Text>
        </View>
        <View style={styles.open}>
          <Text style={styles.openText}>Open</Text>
          <Icon name="chevronRight" size={14} color={colors.primary} strokeWidth={2.6} />
        </View>
      </Pressable>
      <View style={styles.preview}>
        <PhonePreview
          screen={screen}
          homeIndicator={homeIndicator}
          title={notice ?? items[activeIndex].label}
          onPressScreen={open}
          accessibilityLabel={`Open ${title} example`}
          renderBar={(blurTarget) => (
            <BottomNavigation
              variant={variant}
              items={items}
              activeIndex={activeIndex}
              onChange={(index) => {
                setActiveIndex(index);
                setNotice(null);
              }}
              onAction={(item) => setNotice(`${item.label} tapped`)}
              bottomInset={PREVIEW_INSET}
              blurTarget={blurTarget}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 22,
    paddingTop: 16,
    boxShadow: '0px 2px 10px rgba(17, 12, 46, 0.06)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  headerPressed: {
    opacity: 0.6,
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#E6E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.ink,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.ink,
  },
  tags: {
    fontSize: 12,
    color: colors.muted,
  },
  open: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
  },
  openText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  preview: {
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
});
