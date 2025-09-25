
import { StyleSheet, Text, View, FlatList } from "react-native";
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { CATEGORIES } from '../../assets/categories';
import ProductListItem from '../components/product-list-item';

const Category = () => {
    const { slug } = useLocalSearchParams();
    const category = CATEGORIES.find(cat => cat.slug === slug);
    
    const renderProduct = ({ item }: { item: any }) => (
        <ProductListItem product={item} />
    );

    if (!category) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Category not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{category.name}</Text>
            <FlatList
                data={category.products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default Category;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    listContainer: {
        paddingVertical: 8,
    },
});