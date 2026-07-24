import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ChoiceChip } from '@/components/ChoiceChip';
import { buildAdventure } from '@/lib/planner';
import type { AdventureMood, Budget, PlannerPreferences } from '@/types/adventure';

const moods: { value: AdventureMood; label: string }[] = [
  { value: 'easy', label: 'Easy' }, { value: 'playful', label: 'Playful' },
  { value: 'wild', label: 'Outdoors' }, { value: 'learn', label: 'Learn' }
];
const budgets: { value: Budget; label: string }[] = [
  { value: 'free', label: 'Free' }, { value: 'under-25', label: 'Under $25' },
  { value: 'under-50', label: 'Under $50' }, { value: 'flexible', label: 'Flexible' }
];

export default function TodayScreen() {
  const [input, setInput] = useState<PlannerPreferences>({ minutes: 180, radiusMiles: 25, adults: 2, kids: 2, budget: 'under-50', mood: 'playful' });

  function generate() {
    const adventure = buildAdventure(input);
    router.push({ pathname: '/adventure/result', params: { data: JSON.stringify(adventure) } });
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>GO SOMEWHERE</Text>
      <Text style={styles.title}>Turn the time you have into a day worth remembering.</Text>
      <Text style={styles.copy}>Tell us what today can handle. We’ll build one realistic nearby outing—not another endless list.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>How much time do you have?</Text>
        <View style={styles.row}>{[120, 180, 300].map((minutes) => <ChoiceChip key={minutes} label={`${minutes / 60} hours`} selected={input.minutes === minutes} onPress={() => setInput({ ...input, minutes })} />)}</View>

        <Text style={styles.label}>What kind of day?</Text>
        <View style={styles.row}>{moods.map((mood) => <ChoiceChip key={mood.value} label={mood.label} selected={input.mood === mood.value} onPress={() => setInput({ ...input, mood: mood.value })} />)}</View>

        <Text style={styles.label}>Budget</Text>
        <View style={styles.row}>{budgets.map((budget) => <ChoiceChip key={budget.value} label={budget.label} selected={input.budget === budget.value} onPress={() => setInput({ ...input, budget: budget.value })} />)}</View>

        <Text style={styles.label}>Maximum drive</Text>
        <View style={styles.row}>{[10, 25, 50].map((radiusMiles) => <ChoiceChip key={radiusMiles} label={`${radiusMiles} miles`} selected={input.radiusMiles === radiusMiles} onPress={() => setInput({ ...input, radiusMiles })} />)}</View>

        <Pressable style={styles.button} onPress={generate}><Text style={styles.buttonText}>Build today’s adventure</Text></Pressable>
      </View>

      <View style={styles.promise}><Text style={styles.promiseTitle}>Built on trusted places</Text><Text style={styles.promiseCopy}>Every stop will come from an editor-verified database with a visible verification date.</Text></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F0E6' },
  content: { paddingTop: 72, paddingHorizontal: 20, paddingBottom: 40 },
  kicker: { fontSize: 12, letterSpacing: 2.4, color: '#A3552A', fontWeight: '800' },
  title: { marginTop: 12, fontSize: 38, lineHeight: 42, color: '#17261E', fontWeight: '800' },
  copy: { marginTop: 14, fontSize: 17, lineHeight: 25, color: '#5C625D' },
  card: { marginTop: 28, backgroundColor: '#FFFDF8', borderRadius: 28, padding: 20, gap: 14, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 20, shadowOffset: { width: 0, height: 8 } },
  label: { marginTop: 4, fontSize: 15, fontWeight: '800', color: '#28352E' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  button: { marginTop: 12, backgroundColor: '#D86A33', paddingVertical: 17, borderRadius: 18, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
  promise: { marginTop: 18, padding: 18, borderRadius: 20, backgroundColor: '#E2E9DF' },
  promiseTitle: { fontWeight: '800', color: '#173B2D' },
  promiseCopy: { marginTop: 4, lineHeight: 20, color: '#4B5B52' }
});
