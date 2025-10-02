import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import AuthProvider from "./providers/auth-provider";

export default function RootLayout() {
    return (
        <ToastProvider>
            <AuthProvider>
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
                    options={{ headerShown: false }}
                />
                </Stack>
            </AuthProvider>
        </ToastProvider>
    );
}