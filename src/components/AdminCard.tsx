// src/components/AdminCard.tsx
import React from "react";

interface AdminCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  percentageChange?: string;
  description?: string;
}

const AdminCard: React.FC<AdminCardProps> = ({
  title,
  value,
  icon,
  percentageChange,
  description,
}) => {
  return (
    <div className="w-64 p-4 bg-white rounded-lg shadow-md flex flex-col gap-3">
      {/* Header and Icon */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600 font-medium">{title}</p>
        <div className="bg-purple-100 p-2 rounded-full">{icon}</div>
      </div>

      {/* Main Value */}
      <div className="text-black text-3xl font-bold">{value}</div>

      {/* Optional Percentage Change */}
      {percentageChange && (
        <div className="flex items-center gap-2">
          <span className="text-green-500 font-bold flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12l7-7 7 7"
              />
            </svg>
            {percentageChange}
          </span>
          {description && <p className="text-gray-500 text-sm">{description}</p>}
        </div>
      )}
    </div>
  );
};

export default AdminCard;
