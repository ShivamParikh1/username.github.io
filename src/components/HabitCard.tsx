import React from 'react';
import { Habit } from '../types';
import { Plus, Minus } from 'lucide-react';

interface HabitCardProps {
  habit: Habit;
  onClick: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onClick }) => {
  const isBreakHabit = habit.type === 'break';
  
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-full ${
          isBreakHabit 
            ? 'bg-warning-100 text-warning-600' 
            : 'bg-success-100 text-success-600'
        }`}>
          {isBreakHabit ? <Minus size={24} /> : <Plus size={24} />}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {habit.name}
      </h3>
      
      <p className="text-gray-600 text-sm leading-relaxed">
        {habit.description.substring(0, 100)}...
      </p>
      
      <div className="mt-4 flex items-center justify-between">
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
          isBreakHabit 
            ? 'bg-warning-100 text-warning-700' 
            : 'bg-success-100 text-success-700'
        }`}>
          {isBreakHabit ? 'Break Habit' : 'Build Habit'}
        </span>
        
        <span className="text-primary-600 text-sm font-medium">
          Learn More →
        </span>
      </div>
    </div>
  );
};

export default HabitCard;