import { MenuItem, OrderEvent, GenerationConfig } from '../types';

function getOrderProbability(hour: number): number {
  // Base probability
  let probability = 1;
  
  // Early morning (6-9): Gradually increasing
  if (hour >= 6 && hour < 9) {
    probability = 0.3 + (hour - 6) * 0.2;
  }
  // Late morning (9-11): Moderate
  else if (hour >= 9 && hour < 11) {
    probability = 0.7;
  }
  // Lunch rush (11-14): Peak
  else if (hour >= 11 && hour < 14) {
    probability = 2.0;
  }
  // Afternoon (14-17): Low
  else if (hour >= 14 && hour < 17) {
    probability = 0.5;
  }
  // Evening rush (17-21): High
  else if (hour >= 17 && hour < 21) {
    probability = 1.8;
  }
  // Late night (21-23): Moderate to low
  else if (hour >= 21 && hour < 23) {
    probability = 0.6;
  }
  // Very late/early (23-6): Minimal
  else {
    probability = 0.1;
  }
  
  // Weekend multiplier (Friday evening and Saturday)
  const day = new Date().getDay();
  if (day === 5 && hour >= 17) probability *= 1.3;
  if (day === 6) probability *= 1.4;
  
  return probability;
}

function getItemProbability(item: MenuItem, hour: number): number {
  let probability = 1;
  
  // Drinks are more popular during lunch hours
  if (item.category === 'drink') {
    if (hour >= 11 && hour < 14) probability *= 1.5;
    if (hour >= 17 && hour < 21) probability *= 1.3;
  }
  
  // Pizza preferences
  if (item.category === 'pizza') {
    // Margherita is always popular
    if (item.name.toLowerCase().includes('margherita')) probability *= 1.2;
    
    // Vegetarian options more popular during lunch
    if (item.name.toLowerCase().includes('veg')) {
      if (hour >= 11 && hour < 14) probability *= 1.4;
    }
    
    // Special/premium pizzas more popular during dinner
    if (item.price > 15) {
      if (hour >= 17 && hour < 21) probability *= 1.3;
    }
  }
  
  return probability;
}

function getStations(config: GenerationConfig) {
  return {
    pizza: Array.from({ length: config.activeOvens }, (_, i) => `Oven ${i + 1}`),
    drink: ['Drink Station 1', 'Drink Station 2']
  };
}

function getResources(config: GenerationConfig) {
  return {
    system: ['System'],
    cashier: ['Cashier 1', 'Cashier 2'],
    chef: config.activePizzaChefs,
    driver: Array.from({ length: config.activeDrivers }, (_, i) => `Driver ${i + 1}`)
  };
}

function getRandomStation(type: 'pizza' | 'drink', stations: ReturnType<typeof getStations>): string {
  const options = stations[type];
  return options[Math.floor(Math.random() * options.length)];
}

function getRandomResource(type: keyof ReturnType<typeof getResources>, resources: ReturnType<typeof getResources>): string {
  const options = resources[type];
  return options[Math.floor(Math.random() * options.length)];
}

function isPeakHour(hour: number): boolean {
  // Peak hours: 11:00-14:00 (lunch) and 18:00-21:00 (dinner)
  return (hour >= 11 && hour < 14) || (hour >= 18 && hour < 21);
}

function calculatePeakHourCases(baseCount: number, multiplier: number): number {
  // Calculate additional cases for peak hours (roughly 40% of the day is peak hours)
  const peakHourRatio = 0.4;
  const regularCases = Math.floor(baseCount * (1 - peakHourRatio));
  const peakCases = Math.floor(baseCount * peakHourRatio * multiplier);
  return regularCases + peakCases;
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateTimestamp(
  baseTime: Date,
  minOffset: number,
  maxOffset: number
): string {
  const offset = randomBetween(minOffset, maxOffset);
  const newTime = new Date(baseTime.getTime() + offset * 60000);
  return newTime.toISOString();
}

function shouldRework(config: GenerationConfig): boolean {
  if (!config.qualityCheckEnabled) return false;
  return Math.random() * 100 < config.reworkRate;
}

function shouldSkipPickup(): boolean {
  // 2% chance of customer not picking up their order
  return Math.random() < 0.02;
}

function shouldFailDelivery(): boolean {
  // 3% chance of driver not finding the location
  return Math.random() < 0.03;
}

export function generateEventLog(
  config: GenerationConfig,
  selectedItems: MenuItem[]
): OrderEvent[] {
  const events: OrderEvent[] = [];
  const startDate = new Date(config.startDate);
  const endDate = new Date(config.endDate);
  const timeRange = endDate.getTime() - startDate.getTime();
  const stations = getStations(config);
  const resources = getResources(config);
  const totalCases = calculatePeakHourCases(config.numberOfCases, config.peakHourMultiplier);

  for (let i = 0; i < totalCases; i++) {
    const caseId = `CASE-${i + 1}`;
    const currentTime = new Date(
      startDate.getTime() + Math.random() * timeRange
    );
    const hour = currentTime.getHours();
    const orderProbability = getOrderProbability(hour);

    // Distribute cases more heavily during peak hours
    if (isPeakHour(hour)) {
      // During peak hours, allow more parallel activities
      const parallelFactor = Math.random() * 0.5 + 1; // 1.0-1.5x more parallel activities
      currentTime.setMinutes(currentTime.getMinutes() - Math.floor(Math.random() * 15));
    }
    
    // Select items based on time-based probabilities
    const numItems = Math.max(1, Math.round(
      config.averageItemsPerOrder * (0.5 + Math.random())
    ));
    
    const orderItems = Array.from({ length: numItems }, () => {
      // Calculate probabilities for each item based on time of day
      const itemProbabilities = selectedItems.map(item => ({
        item,
        probability: getItemProbability(item, hour) * orderProbability
      }));
      
      // Normalize probabilities
      const totalProbability = itemProbabilities.reduce((sum, { probability }) => sum + probability, 0);
      const normalizedProbabilities = itemProbabilities.map(({ item, probability }) => ({
        item,
        probability: probability / totalProbability
      }));
      
      // Select item based on probability
      const random = Math.random();
      let cumulativeProbability = 0;
      
      for (const { item, probability } of normalizedProbabilities) {
        cumulativeProbability += probability;
        if (random <= cumulativeProbability) return item;
      }
      
      return normalizedProbabilities[0].item;
    });
    
    const totalCost = orderItems.reduce((sum, item) => sum + item.price, 0);

    // Order received
    events.push({
      caseId,
      activity: 'Order Received',
      timestamp: generateTimestamp(currentTime, 1, 3),
      resource: getRandomResource('system', resources),
      cost: 0,
      orderDetails: {
        items: orderItems.map(item => item.name),
        totalAmount: totalCost,
        hour,
        dayOfWeek: currentTime.getDay()
      }
    });

    // Payment
    events.push({
      caseId,
      activity: 'Payment Confirmed',
      timestamp: generateTimestamp(currentTime, 2, 5),
      resource: getRandomResource('cashier', resources),
      cost: totalCost,
      orderDetails: {
        paymentMethod: Math.random() < 0.7 ? 'card' : 'cash'
      }
    });

    // Parallel preparation of items
    orderItems.forEach((item, index) => {
      const prepStart = new Date(currentTime.getTime() + (Math.random() * 5 + 3) * 60000);
      
      events.push({
        caseId,
        activity: 'Preparation Started',
        timestamp: generateTimestamp(prepStart, 1, 3),
        resource: getRandomResource('chef', resources),
        item: item.name,
        station: getRandomStation(item.category, stations),
        cost: 0,
        status: 'Started'
      });

      events.push({
        caseId,
        activity: 'Preparation Completed',
        timestamp: generateTimestamp(prepStart, item.prepTime - 2, item.prepTime),
        resource: getRandomResource('chef', resources),
        item: item.name,
        cost: 0,
        status: 'Completed'
      });
    });

    // Quality check after all items are prepared
    const lastPrepTime = Math.max(...orderItems.map(item => item.prepTime));
    const qualityCheckTime = new Date(currentTime.getTime() + (lastPrepTime + 5) * 60000);
    const needsRework = shouldRework(config);
    const skipPickup = shouldSkipPickup();
    const deliveryFails = !skipPickup && shouldFailDelivery();
    
    events.push({
      caseId,
      activity: 'Quality Check',
      timestamp: generateTimestamp(qualityCheckTime, 2, 4),
      resource: getRandomResource('chef', resources),
      cost: 0,
      status: needsRework ? 'Failed' : 'Passed',
      details: needsRework ? 'Quality standards not met' : 'Meets quality standards'
    });

    if (needsRework) {
      // Add rework activities
      const reworkTime = new Date(qualityCheckTime.getTime() + 5 * 60000);
      
      events.push({
        caseId,
        activity: 'Rework Started',
        timestamp: generateTimestamp(reworkTime, 1, 3),
        resource: getRandomResource('chef', resources),
        cost: 0,
        status: 'Rework'
      });

      events.push({
        caseId,
        activity: 'Rework Completed',
        timestamp: generateTimestamp(reworkTime, 8, 12),
        resource: getRandomResource('chef', resources),
        cost: 0,
        status: 'Completed'
      });

      // Second quality check
      events.push({
        caseId,
        activity: 'Quality Check',
        timestamp: generateTimestamp(reworkTime, 13, 15),
        resource: getRandomResource('chef', resources),
        cost: 0,
        status: 'Passed',
        details: 'Meets quality standards after rework'
      });
    }

    // Delivery
    if (!skipPickup) {
      events.push({
        caseId,
        activity: 'Out for Delivery',
        timestamp: generateTimestamp(qualityCheckTime, 5, 8),
        resource: getRandomResource('driver', resources),
        cost: 0,
        status: 'Started'
      });

      if (deliveryFails) {
        // Driver couldn't find the location
        const failedDeliveryTime = generateTimestamp(qualityCheckTime, 25, 35);
        events.push({
          caseId,
          activity: 'Delivery Failed - Address Not Found',
          timestamp: failedDeliveryTime,
          resource: getRandomResource('driver', resources),
          cost: 0,
          details: 'Unable to locate delivery address'
        });

        // Return to store
        events.push({
          caseId,
          activity: 'Returned to Store',
          timestamp: generateTimestamp(new Date(failedDeliveryTime), 10, 15),
          resource: getRandomResource('driver', resources),
          cost: totalCost * 0.5, // Partial cost as loss
          status: 'Failed Delivery'
        });

        // Contact customer
        events.push({
          caseId,
          activity: 'Customer Contacted',
          timestamp: generateTimestamp(new Date(failedDeliveryTime), 5, 10),
          resource: getRandomResource('system', resources),
          cost: 0,
          details: 'Customer contacted for address verification'
        });

        // Address verification process
        const verificationTime = new Date(failedDeliveryTime);
        verificationTime.setMinutes(verificationTime.getMinutes() + 10);
        
        events.push({
          caseId,
          activity: 'Address Verification Started',
          timestamp: generateTimestamp(verificationTime, 1, 3),
          resource: getRandomResource('system', resources),
          cost: 0,
          status: 'Started',
          details: 'Verifying delivery address details'
        });

        // Add potential GPS coordinates verification
        events.push({
          caseId,
          activity: 'GPS Location Verified',
          timestamp: generateTimestamp(verificationTime, 3, 5),
          resource: getRandomResource('system', resources),
          cost: 0,
          status: 'Completed',
          details: 'GPS coordinates confirmed for delivery location'
        });

        // Address confirmation
        events.push({
          caseId,
          activity: 'Address Verification Completed',
          timestamp: generateTimestamp(verificationTime, 5, 8),
          resource: getRandomResource('system', resources),
          cost: 0,
          status: 'Completed',
          details: 'Delivery address verified and confirmed'
        });

        // Second delivery attempt
        const secondAttemptTime = new Date(verificationTime);
        secondAttemptTime.setMinutes(secondAttemptTime.getMinutes() + 15);

        events.push({
          caseId,
          activity: 'Out for Delivery',
          timestamp: generateTimestamp(secondAttemptTime, 1, 5),
          resource: getRandomResource('driver', resources),
          cost: 0,
          status: 'Second Attempt',
          details: 'Delivery attempt with verified address'
        });

        events.push({
          caseId,
          activity: 'Delivered',
          timestamp: generateTimestamp(secondAttemptTime, 15, 25),
          resource: getRandomResource('driver', resources),
          cost: 0,
          status: 'Completed',
          details: 'Successful delivery on second attempt'
        });
      } else {
        events.push({
          caseId,
          activity: 'Delivered',
          timestamp: generateTimestamp(qualityCheckTime, 15, 30),
          resource: getRandomResource('driver', resources),
          cost: 0,
          status: 'Completed',
          details: 'Successful delivery'
        });
      }
    } else {
      // Customer didn't pick up the order
      events.push({
        caseId,
        activity: 'Order Not Picked Up',
        timestamp: generateTimestamp(qualityCheckTime, 45, 60),
        resource: getRandomResource('system', resources),
        cost: totalCost, // Add cost as loss
        status: 'Not Picked Up',
        details: 'Customer did not pick up order'
      });
    }
  }

  return events.sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
}

export function downloadCSV(events: OrderEvent[]): void {
  const headers = [
    'Case ID',
    'Activity',
    'Timestamp',
    'Resource',
    'Cost',
    'Items',
    'Status',
    'Details',
    'Station',
    'Order Hour',
    'Day of Week',
    'Total Amount'
  ];
  
  const csvContent = [
    headers.join(','),
    ...events.map(event => {
      const row = [
        event.caseId,
        event.activity,
        event.timestamp,
        event.resource,
        event.cost,
        event.orderDetails?.items ? `"${event.orderDetails.items.join(', ')}"` : '',
        event.status || '',
        event.details ? `"${event.details}"` : '',
        event.station || '',
        event.orderDetails?.hour || '',
        event.orderDetails?.dayOfWeek || '',
        event.orderDetails?.totalAmount || ''
      ];
      return row.join(',');
    })
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'pizza_process_events.csv';
  link.click();
}