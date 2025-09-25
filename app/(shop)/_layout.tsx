import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const TabsLayout = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="dark" backgroundColor="#FFD700" />
            <Tabs
                screenOptions={{
                    tabBarPosition: 'bottom',
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        borderTopWidth: 1,
                        borderTopColor: '#e0e0e0',
                        height: 60,
                    },
                    tabBarActiveTintColor: '#4CAF50',
                    tabBarInactiveTintColor: '#999',
                }}
            >
                <Tabs.Screen 
                    name='index' 
                    options={{
                        headerShown: false,
                        title: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen 
                    name='orders' 
                    options={{
                        headerShown: false,
                        title: 'Orders',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="list" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
};

export default TabsLayout;