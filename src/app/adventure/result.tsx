import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { Adventure } from '@/types/adventure';

export default function AdventureResultScreen() {
  const { data } = useLocalSearchParams<{ data?: string }>();
  const adventure = data ? (JSON.parse(data) as Adventure) : null;
  if (!adventure) return <View style={styles.empty}><Text>We couldn’t build this adventure.</Text></View>;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Change the plan</Text></Pressable>
      <Text style={styles.kicker}>TODAY’S ADVENTURE</Text>
      <Text style={styles.title}>{adventure.title}</Text>
      <Text style={styles.subtitle}>{adventure.subtitle}</Text>
      <View style={styles.stats}><Text>{Math.round(adventure.totalMinutes / 60)} hr</Text><Text>≈ ${adventure.estimatedCost}</Text><Text>Within {adventure.distanceMiles} mi</Text></View>

      {adventure.stops.map((stop) => (
        <View key={stop.id} style={styles.stop}>
          <View style={styles.number}><Text style={styles.numberText}>{stop.order}</Text></View>
          <View style={styles.stopBody}>
            <Text style={styles.category}>{stop.category} · {stop.neighborhood}</Text>
            <Text style={styles.stopName}>{stop.name}</Text>
            <Text style={styles.summary}>{stop.summary}</Text>
            <View style={styles.mission}><Text style={styles.missionLabel}>YOUR MISSION</Text><Text style={styles.missionText}>{stop.mission}</Text></View>
            <Text style={styles.verified}>Seed record verified {stop.verifiedAt}</Text>
          </View>
        </View>
      ))}

      <Pressable style={styles.primary}><Text style={styles.primaryText}>Save this adventure</Text></Pressable>
      <Text style={styles.note}>Saving is the next connected feature; this starter currently demonstrates the complete planning loop.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F0E6' }, content: { paddingTop: 64, paddingHorizontal: 20, paddingBottom: 48 },
  back: { color: '#A3552A', fontWeight: '700', marginBottom: 26 }, kicker: { fontSize: 12, letterSpacing: 2.2, color: '#A3552A', fontWeight: '800' },
  title: { marginTop: 10, fontSize: 38, lineHeight: 42, fontWeight: '800', color: '#17261E' }, subtitle: { marginTop: 10, color: '#606761', lineHeight: 23, fontSize: 16 },
  stats: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 24, padding: 16, borderRadius: 18, backgroundColor: '#E3EADF' },
  stop: { flexDirection: 'row', gap: 12, marginBottom: 16 }, number: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#173B2D', alignItems: 'center', justifyContent: 'center' }, numberText: { color: '#FFF', fontWeight: '800' },
  stopBody: { flex: 1, backgroundColor: '#FFFDF8', borderRadius: 22, padding: 18 }, category: { fontSize: 11, letterSpacing: 1.2, fontWeight: '800', color: '#A3552A', textTransform: 'uppercase' }, stopName: { marginTop: 6, fontSize: 23, fontWeight: '800', color: '#1C2A23' }, summary: { marginTop: 8, lineHeight: 21, color: '#59605B' },
  mission: { marginTop: 14, backgroundColor: '#F1E4D4', borderRadius: 14, padding: 13 }, missionLabel: { fontSize: 10, letterSpacing: 1.2, fontWeight: '900', color: '#A3552A' }, missionText: { marginTop: 4, lineHeight: 19, fontWeight: '600', color: '#453B31' }, verified: { marginTop: 12, fontSize: 11, color: '#8A8E89' },
  primary: { marginTop: 12, backgroundColor: '#D86A33', paddingVertical: 17, borderRadius: 18, alignItems: 'center' }, primaryText: { color: '#FFF', fontWeight: '800', fontSize: 17 }, note: { marginTop: 10, textAlign: 'center', color: '#7A7F7A', fontSize: 12, lineHeight: 17 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
