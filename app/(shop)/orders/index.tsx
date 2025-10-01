import {
    ActivityIndicator,
    FlatList,
    ListRenderItem,
    Pressable,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import { Link, Stack } from 'expo-router';
  
  import { Order } from '../../../assets/types/order';
  import { ORDERS } from '../../../assets/orders';
  import { styles } from './index-styles';
  
  const renderItem: ListRenderItem<Order> = ({ item }) => (
    <Link href={`/orders/${item.slug}`} asChild>
      <Pressable style={styles.orderContainer}>
        <View style={styles.orderContent}>
          <View style={styles.orderDetailsContainer}>
            <Text style={styles.orderItem}>{item.item}</Text>
            <Text style={styles.orderDetails}>{item.details}</Text>
            <Text style={styles.orderDate}>
              {new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </Text>
          </View>
          <View
            style={[styles.statusBadge, styles[`statusBadge_${item.status}`]]}
          >
            <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
  
  const Orders = () => {
    const orders = ORDERS;
  
    if (!orders.length)
      return (
        <View style={styles.container}>
          <Stack.Screen options={{ title: 'Orders' }} />
          <Text
            style={{
              fontSize: 16,
              color: '#555',
              textAlign: 'center',
              padding: 10,
            }}
          >
            No orders created yet
          </Text>
        </View>
      );
  
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Orders' }} />
        <FlatList
          data={orders}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    );
  };
  
  export default Orders;
  