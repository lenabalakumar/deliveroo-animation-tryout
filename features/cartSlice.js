import {createSlice} from '@reduxjs/toolkit';

const initialState = {cart: [], total: 0};

const calculateTotal = cart => {
  return cart
    .reduce((acc, item) => acc + item.productQuantity * item.productPrice, 0)
    .toFixed(2);
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const itemExist = state.cart.findIndex(
        cartItem => cartItem.productId === action.payload.productId,
      );

      if (itemExist !== -1) {
        state.cart.find(
          cartItem => cartItem.productId === action.payload.productId,
        ).productQuantity += 1;
      } else {
        state.cart.push(action.payload);
      }

      state.total = calculateTotal(state.cart);
    },
    reduceItemQuantityfromCart: (state, action) => {
      const itemExist = state.cart.findIndex(
        cartItem => cartItem.productId === action.payload.productId,
      );
      console.log(itemExist);

      if (itemExist !== -1) {
        if (state.cart[itemExist].productQuantity < 2) {
          state.cart.splice(itemExist, 1);
        } else {
          state.cart.find(
            cartItem => cartItem.productId === action.payload.productId,
          ).productQuantity -= 1;
        }
      }

      state.total = calculateTotal(state.cart);

      console.log(state.cart);
    },
    removeItemFromCart: (state, action) => {
      const itemExist = state.cart.findIndex(
        cartItem => cartItem.productId === action.payload.productId,
      );

      if (itemExist !== -1) {
        state.cart.splice(itemExist, 1);
      }
      state.total = calculateTotal(state.cart);
    },
  },
});

export const {addItemToCart, reduceItemQuantityfromCart, removeItemFromCart} =
  cartSlice.actions;
export default cartSlice.reducer;
