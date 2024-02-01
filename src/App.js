import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowDetail from './components/ShowDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/show/:id" element={<ShowDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
