import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Circle, Calendar, Flame, MessageSquare, AlertTriangle } from 'lucide-react';
import { UserData, HabitProgress } from '../types';
import { getStoredData, saveUserData, updateHabitProgress } from '../utils/storage';
import { allHabits } from '../data/habits';

const ActiveHabits: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);

  useEffect(() => {
    const data = getStoredData();
    setUserData(data);
  }, []);

  if (!userData || userData.activeHabits.length === 0) {
    return (
      <div className="px-4 py-6 max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Active Habits</h1>
        </div>
        
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar size={48} className="mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Active Habits</h2>
          <p className="text-gray-600 mb-6">Start building or breaking habits to see them here.</p>
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

  const today = new Date().toISOString().split('T')[0];

  const markHabitComplete = (habitProgress: HabitProgress) => {
    const isCompleted = habitProgress.completions.includes(today);
    
    if (isCompleted) return; // Already completed today
    
    const updatedCompletions = [...habitProgress.completions, today];
    const newStreak = calculateStreak(updatedCompletions);
    
    const updatedData = updateHabitProgress(userData, habitProgress.habitId, {
      completions: updatedCompletions,
      streak: newStreak,
      lastCompleted: today
    });
    
    setUserData(updatedData);
    saveUserData(updatedData);
  };

  const logRelapse = (habitProgress: HabitProgress) => {
    const updatedRelapses = [...habitProgress.relapses, today];
    const updatedData = updateHabitProgress(userData, habitProgress.habitId, {
      relapses: updatedRelapses,
      streak: 0 // Reset streak on relapse
    });
    
    setUserData(updatedData);
    saveUserData(updatedData);
  };

  const saveNote = () => {
    if (!selectedHabit) return;
    
    const updatedNotes = { ...userData.activeHabits.find(h => h.habitId === selectedHabit)?.notes };
    updatedNotes[today] = note;
    
    const updatedData = updateHabitProgress(userData, selectedHabit, {
      notes: updatedNotes
    });
    
    setUserData(updatedData);
    saveUserData(updatedData);
    setShowNoteModal(false);
    setNote('');
    setSelectedHabit(null);
  };

  const calculateStreak = (completions: string[]): number => {
    if (completions.length === 0) return 0;
    
    const sortedDates = completions.sort().reverse();
    let streak = 0;
    let currentDate = new Date();
    
    for (const dateStr of sortedDates) {
      const date = new Date(dateStr);
      const diffTime = currentDate.getTime() - date.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= streak + 1) {
        streak++;
        currentDate = date;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const openNoteModal = (habitId: string) => {
    setSelectedHabit(habitId);
    const existingNote = userData.activeHabits.find(h => h.habitId === habitId)?.notes[today] || '';
    setNote(existingNote);
    setShowNoteModal(true);
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Active Habits</h1>
          <p className="text-gray-600 text-sm">Today's progress</p>
        </div>
      </div>

      {/* Habit Cards */}
      <div className="space-y-4">
        {userData.activeHabits.map((habitProgress) => {
          const habit = allHabits.find(h => h.id === habitProgress.habitId);
          if (!habit) return null;

          const isCompleted = habitProgress.completions.includes(today);
          const hasRelapsedToday = habitProgress.relapses.includes(today);
          const isBreakHabit = habit.type === 'break';

          return (
            <div
              key={habitProgress.habitId}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              {/* Habit Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {habit.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Method: {habitProgress.selectedMethod}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Flame size={16} className="text-orange-500" />
                      <span className="text-gray-600">{habitProgress.streak} day streak</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} className="text-blue-500" />
                      <span className="text-gray-600">
                        {Math.floor((Date.now() - new Date(habitProgress.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} days active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {isBreakHabit ? (
                  <div className="flex gap-3">
                    <button
                      onClick={() => markHabitComplete(habitProgress)}
                      disabled={isCompleted}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                        isCompleted
                          ? 'bg-success-100 text-success-700 cursor-not-allowed'
                          : 'bg-success-600 text-white hover:bg-success-700 active:scale-95'
                      }`}
                    >
                      <CheckCircle size={20} />
                      {isCompleted ? 'Resisted Today!' : 'Mark Resisted'}
                    </button>
                    
                    {!hasRelapsedToday && (
                      <button
                        onClick={() => logRelapse(habitProgress)}
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all active:scale-95"
                      >
                        <AlertTriangle size={20} />
                        Relapse
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => markHabitComplete(habitProgress)}
                    disabled={isCompleted}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                      isCompleted
                        ? 'bg-success-100 text-success-700 cursor-not-allowed'
                        : 'bg-success-600 text-white hover:bg-success-700 active:scale-95'
                    }`}
                  >
                    {isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
                    {isCompleted ? 'Completed Today!' : 'Mark as Done'}
                  </button>
                )}

                {/* Note Button */}
                <button
                  onClick={() => openNoteModal(habitProgress.habitId)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <MessageSquare size={18} />
                  {habitProgress.notes[today] ? 'Edit Note' : 'Add Note'}
                </button>
              </div>

              {/* Today's Note Preview */}
              {habitProgress.notes[today] && (
                <div className="mt-3 p-3 bg-primary-50 rounded-lg border-l-4 border-primary-500">
                  <p className="text-sm text-primary-800">
                    "{habitProgress.notes[today]}"
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Daily Note
            </h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="How did it go today? Any insights or challenges?"
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setShowNoteModal(false);
                  setNote('');
                  setSelectedHabit(null);
                }}
                className="flex-1 py-2 px-4 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveNote}
                className="flex-1 py-2 px-4 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveHabits;