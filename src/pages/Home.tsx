import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Calendar, Flame } from 'lucide-react';
import { UserData } from '../types';
import { getStoredData, saveUserData, updateLoginStreak } from '../utils/storage';

const Home: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const data = getStoredData();
    const updatedData = updateLoginStreak(data);
    setUserData(updatedData);
    saveUserData(updatedData);
  }, []);

  if (!userData) return null;

  const activeHabitsCount = userData.activeHabits.length;
  const totalStreak = userData.activeHabits.reduce((sum, habit) => sum + habit.streak, 0);

  return (
    <div className="px-4 py-6 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {userData.name}! 👋
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{userData.totalDaysLoggedIn} days logged in</span>
          </div>
          {totalStreak > 0 && (
            <div className="flex items-center gap-1">
              <Flame size={16} className="text-orange-500" />
              <span>{totalStreak} total streak</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      {activeHabitsCount > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {activeHabitsCount}
            </div>
            <div className="text-sm text-gray-600">
              Active Habit{activeHabitsCount !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-success-600 mb-1">
              {totalStreak}
            </div>
            <div className="text-sm text-gray-600">
              Total Streak
            </div>
          </div>
        </div>
      )}

      {/* Main Action Buttons */}
      <div className="space-y-4 mb-8">
        <Link
          to="/habits/build"
          className="block w-full bg-gradient-to-r from-success-500 to-success-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Plus size={24} />
                </div>
                <h2 className="text-xl font-semibold">Build a Habit</h2>
              </div>
              <p className="text-success-100 text-sm">
                Start forming positive habits with proven methods
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/habits/break"
          className="block w-full bg-gradient-to-r from-warning-500 to-warning-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Minus size={24} />
                </div>
                <h2 className="text-xl font-semibold">Break a Habit</h2>
              </div>
              <p className="text-warning-100 text-sm">
                Overcome unwanted habits with effective techniques
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Access to Active Habits */}
      {activeHabitsCount > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Today's Habits
          </h3>
          <Link
            to="/habits"
            className="text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors"
          >
            View all active habits →
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;