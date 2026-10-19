import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import ExampleModal from './src/components/example/ExampleModal';
import DesignTips from './src/components/showcase/DesignTips';
import ShowcaseCard from './src/components/showcase/ShowcaseCard';
import { DESIGN_TIPS, NAV_VARIANTS } from './src/constants/navigation';
import { colors } from './src/constants/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Gallery />
    </SafeAreaProvider>
  );
}

function Gallery() {
  const insets = useSafeAreaInsets();
  const [openConfig, setOpenConfig] = useState(null);

  return (
    <>
      <ScrollView
        style={styles.page}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
        ]}
      >
        <Text style={styles.heading}>Bottom Navigation</Text>
        <Text style={styles.subheading}>
          11 animated tab bar styles. Tap the tabs to try them, or open a full example.
        </Text>
        {NAV_VARIANTS.map((config) => (
          <ShowcaseCard key={config.variant} config={config} onOpen={setOpenConfig} />
        ))}
        <DesignTips tips={DESIGN_TIPS} />
      </ScrollView>
      <ExampleModal config={openConfig} onClose={() => setOpenConfig(null)} />
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.page,
  },
  content: {
    paddingHorizontal: 16,
    gap: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.ink,
  },
  subheading: {
    fontSize: 14,
    color: colors.muted,
    marginTop: -10,
    marginBottom: 4,
  },
});
