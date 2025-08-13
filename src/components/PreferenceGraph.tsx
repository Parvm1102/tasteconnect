import React from 'react';

interface PreferenceGraphProps {
  preferences: Record<string, number>;
}

const PreferenceGraph: React.FC<PreferenceGraphProps> = ({ preferences }) => {
  const categories = [
    { key: 'spicy', label: 'Spicy', color: 'text-red-400' },
    { key: 'sweet', label: 'Sweet', color: 'text-pink-400' },
    { key: 'adventurous', label: 'Adventurous', color: 'text-purple-400' },
    { key: 'healthy', label: 'Healthy', color: 'text-green-400' },
    { key: 'social', label: 'Social', color: 'text-blue-400' },
    { key: 'budget', label: 'Budget', color: 'text-yellow-400' }
  ];

  const centerX = 200;
  const centerY = 200;
  const radius = 120;

  // Calculate points for the radar chart
  const points = categories.map((category, index) => {
    const angle = (index / categories.length) * 2 * Math.PI - Math.PI / 2;
    const value = (preferences[category.key] || 50) / 100;
    const x = centerX + Math.cos(angle) * radius * value;
    const y = centerY + Math.sin(angle) * radius * value;
    return { x, y, ...category, value: preferences[category.key] || 50 };
  });

  // Create the polygon path
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  // Create grid circles
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
      {/* Radar Chart */}
      <div className="relative">
        <svg width="400" height="400" className="overflow-visible">
          {/* Grid circles */}
          {gridLevels.map(level => (
            <circle
              key={level}
              cx={centerX}
              cy={centerY}
              r={radius * level}
              fill="none"
              stroke="rgba(75, 85, 99, 0.3)"
              strokeWidth="1"
            />
          ))}

          {/* Grid lines */}
          {categories.map((category, index) => {
            const angle = (index / categories.length) * 2 * Math.PI - Math.PI / 2;
            const endX = centerX + Math.cos(angle) * radius;
            const endY = centerY + Math.sin(angle) * radius;
            
            return (
              <line
                key={category.key}
                x1={centerX}
                y1={centerY}
                x2={endX}
                y2={endY}
                stroke="rgba(75, 85, 99, 0.3)"
                strokeWidth="1"
              />
            );
          })}

          {/* Preference area */}
          <path
            d={pathData}
            fill="url(#gradient)"
            fillOpacity="0.3"
            stroke="url(#strokeGradient)"
            strokeWidth="2"
          />

          {/* Data points */}
          {points.map(point => (
            <circle
              key={point.key}
              cx={point.x}
              cy={point.y}
              r="6"
              fill="url(#pointGradient)"
              stroke="#1a1a1a"
              strokeWidth="2"
              className="drop-shadow-lg"
            />
          ))}

          {/* Category labels */}
          {categories.map((category, index) => {
            const angle = (index / categories.length) * 2 * Math.PI - Math.PI / 2;
            const labelRadius = radius + 30;
            const x = centerX + Math.cos(angle) * labelRadius;
            const y = centerY + Math.sin(angle) * labelRadius;
            
            return (
              <text
                key={category.key}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-medium fill-current text-gray-300"
              >
                {category.label}
              </text>
            );
          })}

          {/* Gradients */}
          <defs>
            <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9333ea" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
            </radialGradient>
            
            <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            
            <linearGradient id="pointGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Legend */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Preference Breakdown</h3>
        {points.map(point => (
          <div key={point.key} className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-3">
              <div 
                className={`w-3 h-3 rounded-full ${point.color.replace('text-', 'bg-')}`}
              />
              <span className="text-sm font-medium">{point.label}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-24 bg-gray-800 rounded-full h-2">
                <div
                  className="h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500"
                  style={{ width: `${point.value}%` }}
                />
              </div>
              <span className="text-sm text-gray-400 w-8 text-right">{point.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreferenceGraph;