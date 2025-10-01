
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { CATEGORIES } from '../../assets/categories';
import ProductListItem from '../components/product-list-item';
import { PRODUCTS } from "../../assets/products";
import { Ionicons } from '@expo/vector-icons';
import { styles } from './[slug]-styles';





const Category = () => {
    const { slug } = useLocalSearchParams<{ slug: string}>();

    const category = CATEGORIES.find(cat => cat.slug === slug);
    
    const renderProduct = ({ item }: { item: any }) => (
        <ProductListItem product={item} />
    );

    if (!category) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Category not found</Text>
                    <View style={styles.placeholder} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>{category.name}</Text>
                <View style={styles.placeholder} />
               </View>
            
            <View style={styles.categoryImageContainer}>
                <Image 
                    source={{ uri: category.imageUrl }} 
                    style={styles.categoryImage}
                    resizeMode="cover"
                />
            </View>
            
              <FlatList
                 data={category.products}
                 renderItem={renderProduct}
                 keyExtractor={(item) => item.id.toString()}
                 numColumns={2}
                 contentContainerStyle={styles.flatListContent}
                 columnWrapperStyle={styles.flatListColumn}
                 style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                 showsVerticalScrollIndicator={false}
             />
        </View>
    );
};

export default Category;