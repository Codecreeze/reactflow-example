import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Flow from './components/Flow';
import Filter from './components/Filter';
import "./index.css";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Flow />} />
          <Route path="/filter" element={<Filter />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
