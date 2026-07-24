import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#173B2D', tabBarStyle: { height: 84, paddingTop: 8 } }}>
      <Tabs.Screen name="index" options={{ title: 'Today', tabBarIcon: ({ color, size }) => <Ionicons name="sparkles" color={color} size={size} /> }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore', tabBarIcon: ({ color, size }) => <Ionicons name="map" color={color} size={size} /> }} />
      <Tabs.Screen name="passport" options={{ title: 'Passport', tabBarIcon: ({ color, size }) => <Ionicons name="book" color={color} size={size} /> }} />
    </Tabs>
  );
}
