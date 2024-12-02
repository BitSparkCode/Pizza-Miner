export interface MenuItem {
  id: string;
  name: string;
  price: number;
  prepTime: number; // in minutes
  category: 'pizza' | 'drink';
}

export interface OrderEvent {
  caseId: string;
  activity: string;
  timestamp: string;
  resource: string;
  cost: number;
  item?: string;
  station?: string;
  status?: string;
  details?: string;
  orderDetails?: {
    items?: string[];
    totalAmount?: number;
    hour?: number;
    dayOfWeek?: number;
    paymentMethod?: 'card' | 'cash';
  };
}

export interface GenerationConfig {
  numberOfCases: number;
  startDate: string;
  endDate: string;
  averageItemsPerOrder: number;
  activePizzaChefs: string[];
  activeOvens: number;
  activeDrivers: number;
  peakHourMultiplier: number;
  qualityCheckEnabled: boolean;
  reworkRate: number;
}