import {View, Text, Dimensions, Image, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import {getProductData} from './data/data';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './store/store';
import {
  addItemToCart,
  reduceItemQuantityfromCart,
  removeItemFromCart,
} from './features/cartSlice';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
  BounceInDown,
  BounceOutDown,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <ProductScreen />
      </GestureHandlerRootView>
    </Provider>
  );
};

const ProductScreen = () => {
  const [productData, setProductData] = React.useState([]);
  const {cart, total} = useSelector(state => state.cart);

  React.useEffect(() => {
    setProductData(getProductData());
  }, [productData]);

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: 'white',
        width: windowWidth,
        height: windowHeight,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {productData.map(product => {
        return <ProductCard product={product} key={product.productId} />;
      })}
      {cart.length > 0 && (
        <Animated.View
          entering={BounceInDown}
          exiting={BounceOutDown}
          style={{
            position: 'absolute',
            bottom: 20,
            width: '100%',
            height: 60,
            borderRadius: 10,
            backgroundColor: '#30d183',
            shadowColor: 'black',
            shadowOffset: {
              width: 1,
              height: 1,
            },
            shadowRadius: 10,
            shadowOpacity: 0.8,
            elevation: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#166640',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: 'white', fontSize: 16}}>{cart.length}</Text>
          </View>

          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
            view basket
          </Text>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
            {total}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

const ProductCard = props => {
  const {
    productName,
    productImage,
    productSKU,
    productQuantity,
    productId,
    productPrice,
  } = props.product;
  const dispatch = useDispatch();
  const {cart, total} = useSelector(state => state.cart);
  const incrementWidth = useSharedValue(90);
  const decrementWidth = useSharedValue(0);
  const fontScale = useSharedValue(1);

  const rIncrementStyle = useAnimatedStyle(() => {
    return {
      width: incrementWidth.value,
    };
  });

  const rDecrementStyle = useAnimatedStyle(() => {
    return {
      width: decrementWidth.value,
    };
  });

  const rFontStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: fontScale.value}],
    };
  });

  const handleIncrement = () => {
    dispatch(addItemToCart(props.product));
    incrementWidth.value = withTiming(40, {duration: 500});
    decrementWidth.value = withTiming(40, {duration: 500});
    fontScale.value = withSequence(
      withTiming(0.8, {duration: 50}),
      withTiming(1.5, {duration: 50}),
      withTiming(1.0, {duration: 50}),
    );
  };

  const handleDeleteItem = () => {
    dispatch(removeItemFromCart(props.product));
    decrementWidth.value = withTiming(0, {duration: 500});
    incrementWidth.value = withTiming(90, {duration: 500});
  };

  const handleDecrement = () => {
    dispatch(reduceItemQuantityfromCart(props.product));
    fontScale.value = withSequence(
      withTiming(0.8, {duration: 50}),
      withTiming(1.5, {duration: 50}),
      withTiming(1.0, {duration: 50}),
    );
  };

  return (
    <View
      style={{
        width: 100,
        height: 180,
        backgroundColor: 'white',
        margin: 10,
        padding: 5,
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: {
          width: 5,
          height: 10,
        },
        elevation: 10,
      }}>
      <Image
        source={{uri: productImage}}
        style={{width: 90, height: 90, resizeMode: 'cover', borderRadius: 10}}
      />
      <View style={{flexDirection: 'row'}}>
        {cart.map(cartItem => {
          if (cartItem.productId === productId) {
            return (
              <Animated.View key={productId} style={[{margin: 2}, rFontStyle]}>
                <Text style={{fontWeight: 'bold', color: '#166640'}}>
                  {cartItem.productQuantity}
                  {'x'}
                </Text>
              </Animated.View>
            );
          }
        })}
        <Text>{productName}</Text>
      </View>
      <Text>{productPrice}</Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          // backgroundColor: 'blue',
        }}>
        {cart.map(cartItem => {
          if (cartItem.productId === productId) {
            if (cartItem.productQuantity < 2) {
              return (
                <TouchableWithoutFeedback
                  onPress={handleDeleteItem}
                  key={productId}>
                  <Animated.View
                    style={[
                      {
                        height: 40,
                        backgroundColor: 'white',
                        borderRadius: 5,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: '#ebebeb',
                        borderWidth: 0.5,
                      },
                      rDecrementStyle,
                    ]}>
                    <Text style={{fontSize: 20, color: '#30d183'}}>D</Text>
                  </Animated.View>
                </TouchableWithoutFeedback>
              );
            } else {
              return (
                <Pressable onPress={handleDecrement} key={productId}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: 'white',
                      borderRadius: 5,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: '#ebebeb',
                      borderWidth: 0.5,
                    }}>
                    <Text style={{fontSize: 20, color: '#30d183'}}>-</Text>
                  </View>
                </Pressable>
              );
            }
          }
        })}
        {/* <TouchableWithoutFeedback onPress={handleDecrement}>
          <Animated.View
            style={[
              {
                width: 0,
                height: 40,
                backgroundColor: 'white',
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#ebebeb',
                borderWidth: 0.5,
              },
              rDecrementStyle,
            ]}>
            <Text style={{fontSize: 20, color: '#30d183'}}>-</Text>
          </Animated.View>
        </TouchableWithoutFeedback> */}
        <TouchableWithoutFeedback onPress={handleIncrement}>
          <Animated.View
            style={[
              {
                // width: '100%',
                height: 40,
                backgroundColor: 'white',
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#ebebeb',
                borderWidth: 0.5,
              },
              rIncrementStyle,
            ]}>
            <Text style={{fontSize: 20, color: '#30d183'}}>+</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default App;
