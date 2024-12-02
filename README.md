# Pizza Process Mining

A React-based web application for generating and analyzing process mining event logs for a pizza restaurant. This tool helps in understanding and optimizing restaurant operations through data-driven insights.

![image](https://github.com/user-attachments/assets/ea07acc0-9068-498a-944d-29f26538e956)

## Features

- 🍕 Customizable menu items with dynamic pricing and preparation times
- ⚙️ Configurable process parameters (staff, equipment, peak hours)
- 📊 Realistic event log generation with various scenarios
- 🚗 Delivery process simulation with error handling
- ✨ Quality control and rework process simulation
- 📈 Time-based order probability distribution
- 💳 Multiple payment methods support

## Installation

1. Clone the repository:
```bash
git clone https://github.com/BitSparkCode/pizza-process-mining.git
cd pizza-process-mining
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

1. Configure the event log generation parameters:
   - Set the number of cases to generate
   - Define the date range
   - Adjust staff availability
   - Configure peak hour multipliers
   - Enable/disable quality checks

2. Customize the menu:
   - Add/remove pizza and drink items
   - Set prices and preparation times
   - Define item categories

3. Generate event logs:
   - Click "Generate & Download Event Log"
   - The CSV file will be automatically downloaded
   - Use the generated logs for process mining analysis

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons

## Author

Created by Moritz Maier for:
- Bern University of Applied Sciences
- Industrial Engineering and Management Science
- Process Analysis and Optimization
