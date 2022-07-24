import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WhtBdPage from './components/whtBdPage';

const App = (props) => {

  return (
		   <BrowserRouter>
          <Routes>
            <Route path="/" element={<><WhtBdPage /></>} />
          </Routes>
		   </BrowserRouter>
	);
}

export default App

