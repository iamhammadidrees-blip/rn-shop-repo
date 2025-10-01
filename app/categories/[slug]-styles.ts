import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        paddingTop: 25,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
        paddingTop: 25,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    placeholder: {
        width: 40, // Same width as back button to center the title
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
    categoryImageContainer: {
        marginHorizontal: 16,
        marginVertical: 16,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    categoryImage: {
        width: '100%',
        height: 200,
    },
});
