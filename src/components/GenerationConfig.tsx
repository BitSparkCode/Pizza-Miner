import React from 'react';
import { GenerationConfig } from '../types';
import { ChefHat, Flame, Clock, CheckCircle2, Settings2, Pizza } from 'lucide-react';

const AVAILABLE_CHEFS = ['Mario', 'Luigi', 'Yoshi'];

interface GenerationConfigProps {
  config: GenerationConfig;
  onGenerateLog: () => void;
  onConfigChange: (config: GenerationConfig) => void;
}

export default function GenerationConfigPanel({
  config,
  onGenerateLog,
  onConfigChange,
}: GenerationConfigProps) {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Event Log Configuration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-gray-500" />
            Time Settings
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={config.startDate}
                onChange={(e) =>
                  onConfigChange({
                    ...config,
                    startDate: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={config.endDate}
                onChange={(e) =>
                  onConfigChange({
                    ...config,
                    endDate: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-6 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center">
            <Settings2 className="w-5 h-5 mr-2 text-gray-500" />
            Process Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Cases
              </label>
              <input
                type="number"
                min="1"
                max="10000"
                value={config.numberOfCases}
                onChange={(e) =>
                  onConfigChange({
                    ...config,
                    numberOfCases: Math.max(1, parseInt(e.target.value) || 1000),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Average Items per Order
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={config.averageItemsPerOrder}
                onChange={(e) =>
                  onConfigChange({
                    ...config,
                    averageItemsPerOrder: Math.max(1, parseInt(e.target.value) || 1),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center">
            <ChefHat className="w-5 h-5 mr-2 text-gray-500" />
            Staff & Equipment
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Active Pizza Chefs
              </label>
              <div className="flex gap-3">
                {AVAILABLE_CHEFS.map(chef => (
                  <label
                    key={chef}
                    className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={config.activePizzaChefs.includes(chef)}
                      onChange={(e) => {
                        const newChefs = e.target.checked
                          ? [...config.activePizzaChefs, chef]
                          : config.activePizzaChefs.filter(c => c !== chef);
                        onConfigChange({
                          ...config,
                          activePizzaChefs: newChefs,
                        });
                      }}
                      className="rounded text-purple-700 focus:ring-purple-700"
                    />
                    <span>{chef}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Active Ovens
                </label>
                <select
                  value={config.activeOvens}
                  onChange={(e) =>
                    onConfigChange({
                      ...config,
                      activeOvens: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Oven' : 'Ovens'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Active Drivers
                </label>
                <select
                  value={config.activeDrivers}
                  onChange={(e) =>
                    onConfigChange({
                      ...config,
                      activeDrivers: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[2, 3, 4].map(num => (
                    <option key={num} value={num}>
                      {num} Drivers
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center">
            <Flame className="w-4 h-4 mr-1 text-orange-500" />
            Advanced Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Peak Hour Order Multiplier
              </label>
              <input
                type="number"
                min="1.0"
                max="5"
                step="0.1"
                value={config.peakHourMultiplier}
                onChange={(e) =>
                  onConfigChange({
                    ...config,
                    peakHourMultiplier: Math.max(1, parseFloat(e.target.value) || 1),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Multiplies orders during peak hours (11:00-14:00 and 18:00-21:00)
              </p>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.qualityCheckEnabled}
                  onChange={(e) =>
                    onConfigChange({
                      ...config,
                      qualityCheckEnabled: e.target.checked,
                    })
                  }
                  className="rounded text-purple-700 focus:ring-purple-700"
                />
                <span className="text-sm font-medium text-gray-700 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1 text-purple-700" />
                  Enable Quality Checks
                </span>
            </label>
          
            {config.qualityCheckEnabled && (
              <div className="ml-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rework Rate (%)
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={config.reworkRate}
                  onChange={(e) =>
                    onConfigChange({
                      ...config,
                      reworkRate: Math.max(1, Math.min(20, parseInt(e.target.value) || 15)),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Percentage of orders requiring rework after quality check
                </p>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button
          onClick={onGenerateLog}
          className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-lg shadow-sm hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 flex items-center"
        >
          <Pizza className="w-5 h-5 mr-2" />
          Generate & Download Event Log
        </button>
      </div>
    </div>
  );
}