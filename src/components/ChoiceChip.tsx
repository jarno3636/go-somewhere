import { Pressable, StyleSheet, Text } from 'react-native';

type Props = { label: string; selected: boolean; onPress: () => void };

export function ChoiceChip({ label, selected, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.selected]}>
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: { borderWidth: 1, borderColor: '#D9D4CB', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 10, backgroundColor: '#FFFFFF' },
  selected: { backgroundColor: '#173B2D', borderColor: '#173B2D' },
  label: { color: '#3E423E', fontWeight: '600' },
  selectedLabel: { color: '#FFFFFF' }
});
