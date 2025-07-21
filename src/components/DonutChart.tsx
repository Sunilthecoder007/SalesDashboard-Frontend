import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DonutChartProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  legendItems: string[];
}

export  function DonutChart({ title, data, legendItems }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const centerX = 150;
  const centerY = 150;
  const outerRadius = 100;
  const innerRadius = 60;

  // Calculate paths for each segment
  const createPath = (startAngle, endAngle) => {
    const start = (startAngle * Math.PI) / 180;
    const end = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + outerRadius * Math.cos(start);
    const y1 = centerY + outerRadius * Math.sin(start);
    const x2 = centerX + outerRadius * Math.cos(end);
    const y2 = centerY + outerRadius * Math.sin(end);
    
    const x3 = centerX + innerRadius * Math.cos(end);
    const y3 = centerY + innerRadius * Math.sin(end);
    const x4 = centerX + innerRadius * Math.cos(start);
    const y4 = centerY + innerRadius * Math.sin(start);
    
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
  };

  let currentAngle = 0;
  const segments = data.map(item => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;
    
    return {
      ...item,
      path: createPath(startAngle, endAngle)
    };
  });

  return (
   <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
        {/* Donut Chart */}
        <div className="mb-6">
          <svg width="300" height="300" viewBox="0 0 300 300">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={segment.path}
                fill={segment.color}
                className="transition-opacity hover:opacity-80 cursor-pointer"
              />
            ))}
          </svg>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6">
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: data[index]?.color }}
              />
              <span className="text-sm text-card-foreground font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
      </CardContent>
    </Card>
  );
}
