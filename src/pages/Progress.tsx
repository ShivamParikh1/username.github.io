import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Calendar, Target, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { UserData } from '../types';
import { getStoredData } from '../utils/storage';
import { allHabits } from '../data/habits';

const Progress: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const data = getStoredData();
    setUserData(data);
  }, []);

  if (!userData) return null;

  // Calculate overall stats
  const totalActiveHabits = userData.activeHabits.length;
  const totalStreak = userData.activeHabits.reduce((sum, habit) => sum + habit.streak, 0);
  const totalCompletions = userData.activeHabits.reduce((sum, habit) => sum + habit.completions.length, 0);

  // Prepare chart data for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const chartData = last7Days.map(date => {
    const dayCompletions = userData.activeHabits.reduce((count, habit) => {
      return count + (habit.completions.includes(date) ? 1 : 0);
    }, 0);
    
    return {
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      completions: dayCompletions,
      fullDate: date
    };
  });

  // Calculate completion rates for each habit
  const habitStats = userData.activeHabits.map(habitProgress => {
    const habit = allHabits.find(h => h.id === habitProgress.habitId);
    const daysSinceStart = Math.floor((Date.now() - new Date(habitProgress.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const completionRate = Math.round((habitProgress.completions.length / daysSinceStart) * 100);
    
    return {
      habit,
      habitProgress,
      daysSinceStart,
      completionRate,
      totalCompletions: habitProgress.completions.length
    };
  });

  if (totalActiveHabits === 0) {
    return (
      <div className="px-4 py-6 max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Progress</h1>
        </div>
        
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <TrendingUp size={48} className="mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Progress Yet</h2>
          <p className="text-gray-600 mb-6">Start tracking habits to see your progress here.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Progress</h1>
          <p className="text-gray-600 text-sm">Your habit journey</p>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Target size={20} className="text-primary-600" />
            <span className="text-sm font-medium text-gray-600">Active Habits</span>
          </div>
          <div className="text-2xl font-bold text-primary-600">{totalActiveHabits}</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Award size={20} className="text-success-600" />
            <span className="text-sm font-medium text-gray-600">Total Streak</span>
          </div>
          <div className="text-2xl font-bold text-success-600">{totalStreak}</div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Bar 
                dataKey="completions" 
                fill="#0ea5e9" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Habit Breakdown */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Habit Breakdown</h3>
        <div className="space-y-4">
          {habitStats.map(({ habit, habitProgress, daysSinceStart, completionRate, totalCompletions }) => {
            if (!habit) return null;
            
            return (
              <div key={habitProgress.habitId} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{habit.name}</h4>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    habit.type === 'build' 
                      ? 'bg-success-100 text-success-700' 
                      : 'bg-warning-100 text-warning-700'
                  }`}>
                    {completionRate}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>{totalCompletions} completions</span>
                  <span>{habitProgress.streak} day streak</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      habit.type === 'build' ? 'bg-success-500' : 'bg-warning-500'
                    }`}
                    style={{ width: `${Math.min(completionRate, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gradient-to-r from-primary-500 to-success-500 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">🎉 Achievements</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Days logged in</span>
            <span className="font-bold">{userData.totalDaysLoggedIn}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total completions</span>
            <span className="font-bold">{totalCompletions}</span>
          </div>
          {totalStreak >= 7 && (
            <div className="flex items-center justify-between">
              <span>🔥 Week warrior</span>
              <span className="font-bold">Unlocked!</span>
            </div>
          )}
          {totalCompletions >= 30 && (
            <div className="flex items-center justify-between">
              <span>⭐ Consistency champion</span>
              <span className="font-bold">Unlocked!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Progress;