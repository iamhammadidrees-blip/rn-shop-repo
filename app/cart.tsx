import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
    FlatList,
    Image,
  } from 'react-native';
  import { useCartStore } from './store/cart-store';
  import { StatusBar } from 'expo-status-bar';
  import { styles } from './cart-styles';
  
  import { ImageSourcePropType } from 'react-native';

  type CartItemType = {
    id: number;
    title: string;
    heroImage: ImageSourcePropType;
    price: number;
    quantity: number;
    maxQuantity: number;
  };
  
  type CartItemProps = {
    item: CartItemType;
    onRemove: (id: number) => void;
    onIncrement: (id: number) => void;
    onDecrement: (id: number) => void;
  };
  
  const CartItem = ({
    item,
    onDecrement,
    onIncrement,
    onRemove,
  }: CartItemProps) => {
    return (
      <View style={styles.cartItem}>
        <Image source={item.heroImage} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => onDecrement(item.id)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.itemQuantity}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => onIncrement(item.id)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => onRemove(item.id)}
          style={styles.removeButton}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default function Cart() {
    const {
      items,
      removeItem,
      incrementItem,
      decrementItem,
      getTotalPrice,
      resetCart,
    } = useCartStore();

    const handleCheckout = () => {
      // Simple checkout - just show alert for now
      alert(`Checkout completed! Total: $${getTotalPrice()}`);
      resetCart();
    };
  
    return (
      <View style={styles.container}>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
        </View>

        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onRemove={removeItem}
              onIncrement={incrementItem}
              onDecrement={decrementItem}
            />
          )}
          contentContainerStyle={styles.cartList}
        />

        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
          <TouchableOpacity
            onPress={handleCheckout}
            style={styles.checkoutButton}
          >
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  