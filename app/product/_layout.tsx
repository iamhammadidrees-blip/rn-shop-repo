

import { Stack } from 'expo-router';

export default function ProductLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='[slug]'
        options={{
          headerShown: false,
          title: '',
        }}
      />
    </Stack>
  );
}