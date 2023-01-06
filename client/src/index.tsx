import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css'
import './components/index.css';
import Menu from './components/Menu';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./components/MyList"
import PreviousLists from "./components/PreviousLists";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/**
 * Creation of all the Routes needed with the help of the react-router-dom.
 * The react-router-dom is a popular library that provides routing functionality for React applications.
 * React-router-dom is also responsible for all the Link tags in the different components, and they are responsible
 * to redirect the user through all the different pages from the web page.
 * */
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