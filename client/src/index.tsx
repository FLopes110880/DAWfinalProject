
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Menu from './Menu';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./List"
import PreviousLists from "./PreviousLists";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Router>
          <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/myList" element={<List /> } />
              <Route path="/previousLists" element={<PreviousLists />} />
          </Routes>
      </Router>
      {/*<App />*/}
  </React.StrictMode>
);