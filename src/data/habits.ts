import { Habit } from '../types';

export const buildHabits: Habit[] = [
  {
    id: 'drink-water',
    name: 'Drink More Water',
    type: 'build',
    description: 'Staying hydrated improves energy, focus, and overall health. Water helps regulate body temperature, transport nutrients, and flush out toxins.',
    methods: [
      {
        name: 'Habit Stacking',
        description: 'After brushing teeth, drink 1 glass of water'
      },
      {
        name: 'Visual Cue Placement',
        description: 'Keep a water bottle at your desk'
      },
      {
        name: 'Tracking Trick',
        description: 'Use your phone alarm 3x/day as reminders'
      }
    ]
  },
  {
    id: 'wake-early',
    name: 'Wake Up Early',
    type: 'build',
    description: 'Early rising gives you quiet time for yourself, improves productivity, and helps establish a consistent sleep schedule for better rest.',
    methods: [
      {
        name: 'Environment Setup',
        description: 'Place phone/alarm across the room'
      },
      {
        name: 'Identity Shift',
        description: 'Visualize being an early riser'
      },
      {
        name: 'Cue Anchoring',
        description: 'Sleep clothes = signal to go to bed now'
      }
    ]
  },
  {
    id: 'meditation',
    name: 'Practice Meditation',
    type: 'build',
    description: 'Meditation reduces stress, improves focus, and enhances emotional well-being. Even a few minutes daily can make a significant difference.',
    methods: [
      {
        name: 'Tiny Habits',
        description: 'Start with 1 minute of silence after waking'
      },
      {
        name: 'Habit Buddy',
        description: 'Invite a friend to meditate and share check-ins'
      },
      {
        name: 'Reward Loop',
        description: 'Log a reflection & unlock calming audio'
      }
    ]
  }
];

export const breakHabits: Habit[] = [
  {
    id: 'stop-procrastinating',
    name: 'Stop Procrastinating',
    type: 'break',
    description: 'Procrastination creates stress, reduces productivity, and prevents you from reaching your goals. Breaking this habit opens up time and mental energy.',
    quote: '"The way to get started is to quit talking and begin doing." - Walt Disney',
    methods: [
      {
        name: '5-Minute Rule',
        description: 'Commit to working for just 5 minutes'
      },
      {
        name: 'Delay Distraction',
        description: 'Use app blocker or move your phone away'
      },
      {
        name: 'Visualize Outcome',
        description: 'Picture how good finishing will feel'
      }
    ]
  },
  {
    id: 'quit-phone-use',
    name: 'Quit Excessive Phone Use',
    type: 'break',
    description: 'Excessive phone use can harm relationships, reduce productivity, and increase anxiety. Reducing screen time improves focus and real-world connections.',
    quote: '"Technology is a useful servant but a dangerous master." - Christian Lous Lange',
    methods: [
      {
        name: 'Move Icons',
        description: 'Hide distracting apps in a folder'
      },
      {
        name: 'Scheduled Lockouts',
        description: 'No phone zone from 10pm–7am'
      },
      {
        name: 'Habit Swap',
        description: 'Replace with book/music/walk'
      }
    ]
  }
];

export const allHabits = [...buildHabits, ...breakHabits];