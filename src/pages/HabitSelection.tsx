import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { buildHabits, breakHabits } from '../data/habits';
import HabitCard from '../components/HabitCard';

interface HabitSelectionProps {
  type: 'build' | 'break';
}

const HabitSelection: React.FC<HabitSelectionProps> = ({ type }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const habits = type === 'build' ? buildHabits : breakHabits;
  const title = type === 'build' ? 'Build a Habit' : 'Break a Habit';
  const subtitle = type === 'build' 
    ? 'Choose a positive habit to develop' 
    : 'Select a habit you want to overcome';

  // Filter habits based on search query
  const filteredHabits = habits.filter(habit => 
    habit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    habit.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleHabitSelect = (habitId: string) => {
    navigate(`/habit/${habitId}/strategy`);
  };

  return (
    <div className="px-4 py-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search habits..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm"
        />
      </div>

      {/* Habit Cards */}
      <div className="space-y-4">
        {filteredHabits.length > 0 ? (
          filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onClick={() => handleHabitSelect(habit.id)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No habits found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitSelection;