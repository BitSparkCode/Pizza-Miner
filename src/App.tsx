import React from 'react';
import { useState } from 'react';
import { Pizza as PizzaIcon } from 'lucide-react';
import { MenuItem, GenerationConfig } from './types';
import { menuItems } from './data/menuItems';
import Footer from './components/Footer';
import { generateEventLog, downloadCSV } from './utils/eventGenerator';
import MenuSection from './components/MenuSection';
import GenerationConfigPanel from './components/GenerationConfig';

function App() {
  const [items, setItems] = useState<MenuItem[]>(menuItems);
  const [config, setConfig] = useState<GenerationConfig>({
    numberOfCases: 1000,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    averageItemsPerOrder: 2,
    activePizzaChefs: ['Mario', 'Luigi'],
    activeOvens: 2,
    activeDrivers: 3,
    peakHourMultiplier: 2.5,
    qualityCheckEnabled: true,
    reworkRate: 15,
  });

  const handleGenerateEventLog = () => {
    if (items.length === 0) {
      alert('Please add at least one menu item');
      return;
    }
    const events = generateEventLog(config, items);
    downloadCSV(events);
  };

  const handleAddItem = (newItem: MenuItem) => {
    setItems(prev => [...prev, newItem]);
  };

  const handleRemoveItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <PizzaIcon className="w-8 h-8 text-purple-700 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              Pizza Restaurant Process Mining
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <GenerationConfigPanel
            config={config}
            onGenerateLog={handleGenerateEventLog}
            onConfigChange={setConfig}
          />

          <MenuSection
            items={items}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      </main>
      <Footer />
    </div>
  );

}
export default App;
