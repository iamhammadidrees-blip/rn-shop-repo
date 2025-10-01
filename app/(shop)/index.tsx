import { StyleSheet, Text, View, FlatList } from "react-native";
import { PRODUCTS } from "../../assets/products";
import { CATEGORIES } from "../../assets/categories";
import ProductListItem from "../components/product-list-item";
import { ListHeader } from "../components/list-header";
import { router } from "expo-router";
import Auth from "../auth";


const Home = () => {
    return (
        <View>
            <FlatList
                data={PRODUCTS}
                renderItem={({ item }) => <ProductListItem product={item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                ListHeaderComponent={<ListHeader categories={CATEGORIES} />}
                contentContainerStyle={styles.flatListContent}
                columnWrapperStyle={styles.flatListColumn}
                style={{ paddingHorizontal: 10, paddingVertical: 5 }}
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
    flatListContent: {
        paddingBottom: 20,
    },
    flatListColumn: {
        justifyContent: 'space-between',
    },
});