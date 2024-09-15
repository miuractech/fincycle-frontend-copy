import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface CardProps {
  title: string;
  amount: string;
  percentage: number;
  description: string;
  icon: string;
  graphColor: string;
  data: { name: string; value: number }[];
  lineColor: string;
}

const Card: React.FC<CardProps> = ({ title, amount, percentage, description, icon, graphColor, data, lineColor }) => {
  const isPositive = percentage >= 0;

  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-2 rounded-full ${graphColor}`}>
            <span className="text-lg">{icon}</span>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-2xl font-bold">{amount}</p>
          </div>
        </div>
        <div className={`text-lg font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? `▲ ${percentage}%` : `▼ ${Math.abs(percentage)}%`}
        </div>
      </div>
      <p className="text-gray-500 text-sm mt-2">{description}</p>
      <ResponsiveContainer width="100%" height={50}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Card;
