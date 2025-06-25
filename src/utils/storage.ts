import { UserData, HabitProgress } from '../types';

const STORAGE_KEY = 'habitTrackerData';

export const getStoredData = (): UserData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  return {
    name: 'User',
    totalDaysLoggedIn: 1,
    lastLoginDate: new Date().toISOString().split('T')[0],
    activeHabits: []
  };
};

export const saveUserData = (data: UserData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const updateLoginStreak = (userData: UserData): UserData => {
  const today = new Date().toISOString().split('T')[0];
  const lastLogin = userData.lastLoginDate;
  
  if (lastLogin !== today) {
    return {
      ...userData,
      totalDaysLoggedIn: userData.totalDaysLoggedIn + 1,
      lastLoginDate: today
    };
  }
  
  return userData;
};

export const addHabitProgress = (userData: UserData, habitProgress: HabitProgress): UserData => {
  const existingIndex = userData.activeHabits.findIndex(h => h.habitId === habitProgress.habitId);
  
  if (existingIndex >= 0) {
    const updatedHabits = [...userData.activeHabits];
    updatedHabits[existingIndex] = habitProgress;
    return { ...userData, activeHabits: updatedHabits };
  }
  
  return {
    ...userData,
    activeHabits: [...userData.activeHabits, habitProgress]
  };
};

export const updateHabitProgress = (userData: UserData, habitId: string, updates: Partial<HabitProgress>): UserData => {
  const updatedHabits = userData.activeHabits.map(habit => 
    habit.habitId === habitId ? { ...habit, ...updates } : habit
  );
  
  return { ...userData, activeHabits: updatedHabits };
};