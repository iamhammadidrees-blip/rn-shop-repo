import { StyleSheet, Text, View, FlatList } from "react-native";
import { PRODUCTS } from "../../assets/products";
import { CATEGORIES } from "../../assets/categories";
import ProductListItem from "../components/product-list-item";
import { ListHeader } from "../components/list-header";

const Home = () => {
    const renderProduct = ({ item }: { item: any }) => (
        <ProductListItem product={item} />
    );

    return (
        <View style={styles.container}>
            <ListHeader categories={CATEGORIES} />
            <Text style={styles.title}>Shop</Text>
            <FlatList
                data={PRODUCTS}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={true}
            />
        </View>
    );
};

export default Home;

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