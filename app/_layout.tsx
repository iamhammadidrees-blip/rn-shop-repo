import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name='(shop)'
                options={{ headerShown: false, title: 'SAADies Ouds' }}
            />

            <Stack.Screen
                name='(categories)'
                options={{ headerShown: true, title: 'Categories' }}
            />

            <Stack.Screen
                name='(product)'
                options={{ headerShown: true, title: 'product' }}
            />

            <Stack.Screen
                name='(Cart)'
                options={{ presentation: 'modal', title: 'Shoppnig Cart' }}
            />

<Stack.Screen
                name='(Auth)'
                options={{ headerShown: true }}
            />

        </Stack>

         
    );
}