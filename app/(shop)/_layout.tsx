import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const TabsLayout = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tabs
                screenOptions={{
                    tabBarPosition: 'top',
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        borderBottomWidth: 1,
                        borderBottomColor: '#e0e0e0',
                    },
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