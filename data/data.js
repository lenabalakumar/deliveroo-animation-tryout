const productData = [
  {
    productId: 1,
    productName: 'Apple',
    productImage:
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXBwbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    productQuantity: 1,
    productPrice: 1.95,
    productSKU: '1 kg',
  },
  {
    productId: 2,
    productName: 'Orange',
    productImage:
      'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8b3JhbmdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    productQuantity: 1,
    productPrice: 1.45,
    productSKU: '1 kg',
  },
  {
    productId: 3,
    productName: 'Grapes',
    productImage:
      'https://images.unsplash.com/photo-1631299106224-aae61c217164?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGdyYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    productQuantity: 1,
    productPrice: 1.55,
    productSKU: '1 kg',
  },
  {
    productId: 4,
    productName: 'Banana',
    productImage:
      'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmFuYW5hfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    productQuantity: 1,
    productPrice: 0.95,
    productSKU: '1 kg',
  },
];

export const getProductData = () => {
  return productData;
};
