import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { Stack } from 'expo-router';
import { Order } from '../../../assets/types/order';
import { ORDERS } from '../../../assets/orders';
import { styles } from './[slug]-styles';

const OrderDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  
  // Find the order by slug
  const order = ORDERS.find(o => o.slug === slug);

  if (!order) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Order Not Found' }} />
        <Text style={styles.errorText}>Order not found</Text>
      </View>
    );
  }

  const renderOrderItem = ({ item }: { item: any }) => (
    <View style={styles.orderItemContainer}>
      <Image source={item.heroImage} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: order.item }} />
      
      {/* Order Header */}
      <View style={styles.header}>
        <Text style={styles.orderTitle}>{order.item}</Text>
        <Text style={styles.orderDetails}>{order.details}</Text>
        <Text style={styles.orderDate}>
          {new Date(order.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
      </View>

      {/* Order Status */}
      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, styles[`statusBadge_${order.status}`]]}>
          <Text style={styles.statusText}>{order.status.toUpperCase()}</Text>
        </View>
      </View>

      {/* Order Items */}
      <View style={styles.itemsContainer}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        <FlatList
          data={order.items}
          keyExtractor={item => item.id.toString()}
          renderItem={renderOrderItem}
          scrollEnabled={false}
        />
      </View>

    </ScrollView>
  );
};

export default OrderDetails;
