import { useLocalSearchParams } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import { useCartStore } from '../store/cart-store';
import Toast from 'react-native-toast-notifications';

import { PRODUCTS } from '../../assets/products';
import { styles } from './[slug]-styles';

const ProductDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const product = PRODUCTS.find(p => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const toast = useRef<any>(null);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      {/* Product Header - Name Only */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{product.title}</Text>
      </View>
      
      {/* Product Image */}
      <View style={styles.productImageContainer}>
        <Image 
          source={product.heroImage} 
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>
      
      {/* Product Price */}
      <View style={styles.productPriceContainer}>
        <Text style={styles.productPriceText}>${product.price.toFixed(2)}</Text>
      </View>
      
      {/* Related Images */}
      <View style={styles.relatedImagesContainer}>
        <Text style={styles.relatedImagesTitle}>Related Images</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imagesScrollContainer}
        >
          {product.imagesUrl.map((image, index) => (
            <View key={index} style={styles.imageItem}>
              <Image 
                source={image} 
                style={styles.relatedImage}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      </View>
      
      {/* Quantity Controls and Add to Cart */}
      <View style={styles.bottomControls}>
        {/* Quantity Controls */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Ionicons name="remove" size={20} color="#fff" />
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {/* Add to Cart Button */}
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => {
            addItem({
              id: product.id,
              title: product.title,
              price: product.price,
              heroImage: product.heroImage, // Pass the actual image
              quantity: quantity,
              maxQuantity: product.maxQuantity
            });
            
            // Show toast message
            toast.current?.show(`${quantity} x ${product.title} added to cart!`, {
              type: 'success',
              duration: 2000,
              placement: 'top',
              animationType: 'slide',
              style: {
                marginTop: 60, // Position below status bar
                marginHorizontal: 16,
                borderRadius: 8,
                elevation: 5,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              },
              textStyle: {
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
              },
            });
          }}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      
      {/* Toast Component */}
      <Toast ref={toast} />
    </View>
  );
};

export default ProductDetails;
