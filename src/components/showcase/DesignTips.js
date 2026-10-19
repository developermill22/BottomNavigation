import { StyleSheet, Text, View } from 'react-native';
import Icon from '../Icon';
import { colors } from '../../constants/theme';

export default function DesignTips({ tips }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Icon name="lightbulb" size={22} color={colors.primary} />
        <Text style={styles.title}>Design Tips</Text>
      </View>
      {tips.map((tip) => (
        <View key={tip} style={styles.tip}>
          <Icon name="check" size={16} color={colors.primary} strokeWidth={2.6} />
          <Text style={styles.tipText}>{tip}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F1EEFF',
    borderRadius: 22,
    padding: 20,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryDeep,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tipText: {
    fontSize: 14,
    color: colors.ink,
  },
});
