import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";

export default function RootLayout() {
    return (
        <ToastProvider>
            <Stack>
                <Stack.Screen
                    name='(shop)'
                    options={{ headerShown: false, title: 'SAADy HADy ' }}
                />

                <Stack.Screen
                    name='categories'
                    options={{ headerShown: false }}
                />


                <Stack.Screen
                    name='cart'
                    options={{ presentation: 'modal', title: 'Shopping Cart' }}
                />

                <Stack.Screen
                    name='(Auth)'
                    options={{ headerShown: true }}
                />
            </Stack>
        </ToastProvider>
    );
}