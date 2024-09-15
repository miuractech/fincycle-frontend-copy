import React from 'react';
import Card from './card';

export const Dashboard: React.FC = () => {
  const revenueData = [
    { name: 'Day 1', value: 120000 },
    { name: 'Day 2', value: 150000 },
    { name: 'Day 3', value: 130000 },
    { name: 'Day 4', value: 140000 },
    { name: 'Day 5', value: 170000 },
  ];

  const costData = [
    { name: 'Day 1', value: 80000 },
    { name: 'Day 2', value: 85000 },
    { name: 'Day 3', value: 82000 },
    { name: 'Day 4', value: 81000 },
    { name: 'Day 5', value: 79000 },
  ];

  const netProfitData = [
    { name: 'Day 1', value: 70000 },
    { name: 'Day 2', value: 71000 },
    { name: 'Day 3', value: 68000 },
    { name: 'Day 4', value: 69000 },
    { name: 'Day 5', value: 70000 },
  ];

  const cashBalanceData = [
    { name: 'Day 1', value: 95000 },
    { name: 'Day 2', value: 96000 },
    { name: 'Day 3', value: 98000 },
    { name: 'Day 4', value: 99000 },
    { name: 'Day 5', value: 100000 },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Card
          title="Revenue"
          amount="₹1,52,000"
          percentage={25}
          description="Total revenue compared to 7 days ago"
          icon="💲"
          graphColor="bg-green-100"
          data={revenueData}
          lineColor="#34D399"
        />
        <Card
          title="Cost"
          amount="₹82,000"
          percentage={-25}
          description="Total cost compared to 7 days ago"
          icon="💲"
          graphColor="bg-purple-100"
          data={costData}
          lineColor="#8B5CF6"
        />
        <Card
          title="Net Profit"
          amount="₹70,140"
          percentage={-25}
          description="Total shipments compared to 7 days ago"
          icon="📦"
          graphColor="bg-blue-100"
          data={netProfitData}
          lineColor="#3B82F6"
        />
        <Card
          title="Cash / Bank balance"
          amount="₹1,00,000"
          percentage={25}
          description="Avg delivery time compared to 7 days ago"
          icon="⏰"
          graphColor="bg-orange-100"
          data={cashBalanceData}
          lineColor="#FB923C"
        />
      </div>
    </div>
  );
};

