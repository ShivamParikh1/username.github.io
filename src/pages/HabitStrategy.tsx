import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { allHabits } from '../data/habits';
import { getStoredData, saveUserData, addHabitProgress } from '../utils/storage';
import { HabitProgress } from '../types';

const HabitStrategy: React.FC = () => {
  const { habitId } = useParams<{ habitId: string }>();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  
  const habit = allHabits.find(h => h.id === habitId);
  
  if (!habit) {
    navigate('/');
    return null;
  }

  const handleStartPlan = () => {
    if (!selectedMethod) return;
    
    const userData = getStoredData();
    const newProgress: HabitProgress = {
      habitId: habit.id,
      startDate: new Date().toISOString().split('T')[0],
      selectedMethod,
      streak: 0,
      completions: [],
      relapses: [],
      notes: {}
    };
    
    const updatedData = addHabitProgress(userData, newProgress);
    saveUserData(updatedData);
    
    navigate('/habits');
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
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{habit.name}</h1>
          <p className="text-gray-600 text-sm">
            {habit.type === 'build' ? 'Strategy Guide' : 'Breaking Toolkit'}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Why This Matters
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {habit.description}
        </p>
        
        {habit.quote && (
          <div className="mt-4 p-4 bg-primary-50 rounded-lg border-l-4 border-primary-500">
            <p className="text-primary-800 italic text-sm">
              {habit.quote}
            </p>
          </div>
        )}
      </div>

      {/* Methods */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {habit.type === 'build' ? 'Choose Your Method' : 'Select Your Technique'}
        </h2>
        
        <div className="space-y-3">
          {habit.methods.map((method, index) => (
            <div
              key={index}
              onClick={() => setSelectedMethod(method.name)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedMethod === method.name
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white hover:border-primary-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${
                  selectedMethod === method.name ? 'text-primary-600' : 'text-gray-400'
                }`}>
                  <CheckCircle size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {method.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {method.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Need Help Section for Break Habits */}
      {habit.type === 'break' && (
        <div className="mb-6">
          <div className="bg-warning-50 border border-warning-200 rounded-xl p-4">
            <h3 className="font-semibold text-warning-900 mb-2">
              Need Additional Support?
            </h3>
            <p className="text-warning-800 text-sm mb-3">
              Breaking habits can be challenging. Professional support is available.
            </p>
            <button
              onClick={() => navigate('/hotline')}
              className="text-warning-700 font-medium hover:text-warning-800 transition-colors"
            >
              View Support Resources →
            </button>
          </div>
        </div>
      )}

      {/* Start Button */}
      <button
        onClick={handleStartPlan}
        disabled={!selectedMethod}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
          selectedMethod
            ? `${habit.type === 'build' 
                ? 'bg-success-600 hover:bg-success-700' 
                : 'bg-warning-600 hover:bg-warning-700'
              } shadow-lg hover:shadow-xl active:scale-95`
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {habit.type === 'build' ? 'Start Habit Plan' : 'Start Breaking Plan'}
      </button>
    </div>
  );
};

export default HabitStrategy;