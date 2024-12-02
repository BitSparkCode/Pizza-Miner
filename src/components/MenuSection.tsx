import React from 'react';
import { MenuItem } from '../types';
import { Pizza, Coffee, Trash2, Clock, ChefHat, Droplets } from 'lucide-react';
import MenuItemForm from './MenuItemForm';

interface MenuSectionProps {
  items: MenuItem[];
  onAddItem: (item: MenuItem) => void;
  onRemoveItem: (itemId: string) => void;
}

export default function MenuSection({
  items,
  onAddItem,
  onRemoveItem,
}: MenuSectionProps) {
  const pizzas = items.filter(item => item.category === 'pizza');
  const drinks = items.filter(item => item.category === 'drink');

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 rounded-lg mr-3">
              <Pizza className="w-6 h-6 text-purple-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Pizza Menu</h2>
          </div>
          <MenuItemForm category="pizza" onAdd={onAddItem} />
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzas.map(item => (
            <div
              key={item.id}
              className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
            >
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1.5 bg-red-50 rounded-full text-red-500 hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                    CHF {item.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center text-gray-500">
                  <ChefHat className="w-4 h-4 mr-1.5" />
                  <span className="text-sm">{item.prepTime} min prep</span>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <Droplets className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Drinks Menu</h2>
          </div>
          <MenuItemForm category="drink" onAdd={onAddItem} />
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {drinks.map(item => (
            <div
              key={item.id}
              className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
            >
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1.5 bg-red-50 rounded-full text-red-500 hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    CHF {item.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-1.5" />
                  <span className="text-sm">{item.prepTime} min prep</span>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}