export interface Habit {
  id: string;
  name: string;
  type: 'build' | 'break';
  description: string;
  methods: Method[];
  quote?: string;
}

export interface Method {
  name: string;
  description: string;
}

export interface HabitProgress {
  habitId: string;
  startDate: string;
  selectedMethod: string;
  streak: number;
  completions: string[];
  relapses: string[];
  notes: { [date: string]: string };
  lastCompleted?: string;
}

export interface UserData {
  name: string;
  totalDaysLoggedIn: number;
  lastLoginDate: string;
  activeHabits: HabitProgress[];
}