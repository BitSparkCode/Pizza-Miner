import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Plus } from 'lucide-react';

interface MenuItemFormProps {
  category: 'pizza' | 'drink';
  onAdd: (item: MenuItem) => void;
}

export default function MenuItemForm({ category, onAdd }: MenuItemFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [prepTime, setPrepTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !prepTime) return;

    const newItem: MenuItem = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      price: parseFloat(price),
      prepTime: parseInt(prepTime),
      category,
    };

    onAdd(newItem);
    setName('');
    setPrice('');
    setPrepTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-48 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={`New ${category}`}
          required
        />
      </div>
      <div className="relative">
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
          Price (CHF)
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-28 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="0.00"
          step="0.01"
          min="0"
          required
        />
      </div>
      <div className="relative">
        <label className="block text-sm font-medium text-gray-600 mb-1.5">
          Prep Time (min)
        </label>
        <input
          type="number"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          className="w-28 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="1"
          min="1"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 flex items-center shadow-sm"
      >
        <Plus className="w-5 h-5 mr-1" />
        Add {category}
      </button>
    </form>
  );
}