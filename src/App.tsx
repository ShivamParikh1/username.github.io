import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import HabitSelection from './pages/HabitSelection';
import HabitStrategy from './pages/HabitStrategy';
import ActiveHabits from './pages/ActiveHabits';
import Progress from './pages/Progress';
import Hotline from './pages/Hotline';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="habits/build" element={<HabitSelection type="build" />} />
          <Route path="habits/break" element={<HabitSelection type="break" />} />
          <Route path="habit/:habitId/strategy" element={<HabitStrategy />} />
          <Route path="habits" element={<ActiveHabits />} />
          <Route path="progress" element={<Progress />} />
          <Route path="hotline" element={<Hotline />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;