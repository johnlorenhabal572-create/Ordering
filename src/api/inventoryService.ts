const defaultInventory = [
  { id: 'inv_1', name: "Chicken Leg", quantity: 50, unit: "pcs" },
  { id: 'inv_2', name: "Pusit (Dried)", quantity: 10, unit: "kg" },
  { id: 'inv_3', name: "Coffee Beans", quantity: 5, unit: "kg" },
  { id: 'inv_4', name: "Milk Tea Powder", quantity: 20, unit: "kg" },
];

export const getInventory = () => {
  const stored = localStorage.getItem('shop_inventory');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('shop_inventory', JSON.stringify(defaultInventory));
  return defaultInventory;
};

export const saveInventory = (items: any[]) => {
  localStorage.setItem('shop_inventory', JSON.stringify(items));
};

export const deductInventory = (inventoryId: string, amount: number) => {
  const inventory = getInventory();
  const updated = inventory.map((item: any) => {
    if (item.id === inventoryId) {
      return { ...item, quantity: Math.max(0, item.quantity - amount) };
    }
    return item;
  });
  saveInventory(updated);
};
