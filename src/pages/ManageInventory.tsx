import { useState, useEffect } from 'react';
import { getInventory, saveInventory } from '../api/inventoryService';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, Save, X, Package, AlertCircle } from 'lucide-react';

const ManageInventory = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, unit: 'pcs' });
  const [editItem, setEditItem] = useState({ name: '', quantity: 0, unit: 'pcs' });

  useEffect(() => {
    setInventory(getInventory());
  }, []);

  const handleAdd = () => {
    if (!newItem.name) return;
    const itemToAdd = { ...newItem, id: `inv_${Date.now()}` };
    const updated = [...inventory, itemToAdd];
    setInventory(updated);
    saveInventory(updated);
    setNewItem({ name: '', quantity: 0, unit: 'pcs' });
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    const updated = inventory.filter(item => item.id !== id);
    setInventory(updated);
    saveInventory(updated);
  };

  const handleStartEdit = (item: any) => {
    setEditingId(item.id);
    setEditItem({ ...item });
  };

  const handleSaveEdit = () => {
    const updated = inventory.map(item => item.id === editingId ? { ...editItem, id: editingId } : item);
    setInventory(updated);
    saveInventory(updated);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark tracking-tight">Manage Inventory</h1>
            <p className="text-gray-500 text-sm mt-1">Track and manage your raw materials and stock.</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-opacity-90 transition-all active:scale-95"
          >
            <Plus size={20} /> Add Item
          </button>
        </div>

        {/* Inventory List */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                <th className="p-6">Item Name</th>
                <th className="p-6">Quantity</th>
                <th className="p-6">Unit</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {isAdding && (
                  <motion.tr 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-primary/5"
                  >
                    <td className="p-4">
                      <input 
                        type="text" 
                        placeholder="e.g. Chicken Leg"
                        value={newItem.name}
                        onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm"
                      />
                    </td>
                    <td className="p-4">
                      <input 
                        type="number" 
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm"
                      />
                    </td>
                    <td className="p-4">
                      <input 
                        type="text" 
                        placeholder="pcs, kg, etc."
                        value={newItem.unit}
                        onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm"
                      />
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={handleAdd} className="p-2 bg-primary text-white rounded-lg hover:bg-opacity-90"><Save size={18} /></button>
                        <button onClick={() => setIsAdding(false)} className="p-2 bg-gray-200 text-gray-500 rounded-lg hover:bg-gray-300"><X size={18} /></button>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>

              {inventory.map((item) => (
                <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="p-6">
                    {editingId === item.id ? (
                      <input 
                        type="text" 
                        value={editItem.name}
                        onChange={(e) => setEditItem({...editItem, name: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm"
                      />
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                          <Package size={20} />
                        </div>
                        <span className="font-bold text-dark">{item.name}</span>
                      </div>
                    )}
                  </td>
                  <td className="p-6">
                    {editingId === item.id ? (
                      <input 
                        type="number" 
                        value={editItem.quantity}
                        onChange={(e) => setEditItem({...editItem, quantity: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${item.quantity < 10 ? 'text-red-500' : 'text-dark'}`}>
                          {item.quantity}
                        </span>
                        {item.quantity < 10 && <AlertCircle size={14} className="text-red-500" />}
                      </div>
                    )}
                  </td>
                  <td className="p-6">
                    {editingId === item.id ? (
                      <input 
                        type="text" 
                        value={editItem.unit}
                        onChange={(e) => setEditItem({...editItem, unit: e.target.value})}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">{item.unit}</span>
                    )}
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      {editingId === item.id ? (
                        <>
                          <button onClick={handleSaveEdit} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"><Save size={18} /></button>
                          <button onClick={() => setEditingId(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"><X size={18} /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleStartEdit(item)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Edit2 size={18} /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {inventory.length === 0 && !isAdding && (
            <div className="p-20 text-center">
              <Package size={48} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-400 font-medium">No inventory items yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageInventory;
