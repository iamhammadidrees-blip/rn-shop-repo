import { Link } from 'expo-router';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { CATEGORIES } from '../../assets/categories';
import { styles } from './list-header-styles';
import { useCartStore } from '../store/cart-store';
import { useAuth } from '../providers/auth-provider';

export const ListHeader = ({
  categories,
}: {
  categories: any[]; // Temporary fix - replace with proper type later
}) => {
  const { getItemCount } = useCartStore();
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            const { error } = await signOut();
            if (error) {
              Alert.alert("Error", "Failed to sign out. Please try again.");
            }
            // Navigation will happen automatically via auth provider
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.headerContainer]}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png' }}
              style={styles.avatarImage}
            />
            <Text style={styles.avatarText}>Hey! {user?.email ? user.email.split('@')[0] : 'User'}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Link style={styles.cartContainer} href='/cart' asChild>
            <Pressable>
              {({ pressed }) => (
                <View>
                  <FontAwesome
                    name='shopping-cart'
                    size={25}
                    color='gray'
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />

                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{getItemCount()}</Text>
                  </View>
                </View>
              )}
            </Pressable>
          </Link>
          <TouchableOpacity
            onPress={handleSignOut}
            style={styles.signOutButton}
          >
            <FontAwesome name='sign-out' size={25} color='red' />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.heroContainer}>
        <Image
          source={require('../../assets/images/hero.png')}
          style={styles.heroImage}
        />
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={CATEGORIES}
          renderItem={({ item }) => (
            <Link asChild href={`/categories/${item.slug}`}>
              <Pressable style={styles.category}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{item.name}</Text>
              </Pressable>
            </Link>
          )}
          keyExtractor={item => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

