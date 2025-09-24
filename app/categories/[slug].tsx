
import { StyleSheet, Text, View } from "react-native";
import React from 'react';

const Category = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Category</Text>
        </View>
    );
};

export default Category;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});