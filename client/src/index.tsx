
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css'
import './components/index.css';
import Menu from './components/Menu';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./components/List"
import PreviousLists from "./components/PreviousLists";

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
