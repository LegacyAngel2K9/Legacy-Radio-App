import { Redirect } from 'expo-router';

export default function TabIndex() {
  // Redirect to the channels tab by default
  return <Redirect href="/(tabs)/channels" />;
}