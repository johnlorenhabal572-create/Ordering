const defaultProducts = [
  { id: 1, name: "Sizzling Sisig", price: 185, category: "Main Course", stock: 100, image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "Signature Wings", price: 165, category: "Appetizer", stock: 100, image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "Premium Dried Pusit", price: 150, category: "Seafood", stock: 20, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "DXN Lingzhi Coffee", price: 550, category: "Beverage", stock: 15, image: "https://images.unsplash.com/photo-1544145945-f904253d0c7e?auto=format&fit=crop&q=80&w=600" },
  { id: 5, name: "DXN Spirulina", price: 850, category: "Supplement", stock: 25, image: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&q=80&w=600" },
  { id: 6, name: "CupEat Milktea", price: 85, category: "Beverage", stock: 50, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600" },
  { id: 7, name: "Grilled Platter", price: 450, category: "Main Course", stock: 30, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600" },
  { id: 8, name: "Bucket Deal (Beer)", price: 350, category: "Beverage", stock: 20, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600" }
];

export const getProducts = () => {
  const storedProducts = localStorage.getItem('shop_products');
  if (storedProducts) {
    return JSON.parse(storedProducts);
  }
  localStorage.setItem('shop_products', JSON.stringify(defaultProducts));
  return defaultProducts;
};

export const addProduct = (newProduct) => {
  const currentProducts = getProducts();
  const productWithId = { ...newProduct, id: Date.now() }; 
  currentProducts.push(productWithId);
  localStorage.setItem('shop_products', JSON.stringify(currentProducts));
  return productWithId;
};