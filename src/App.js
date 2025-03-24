// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookData from "./book-choice";
import ConfirmedBooking from "./confirm-booking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookData />} />
        <Route path="/confirm-booking" element={<ConfirmedBooking />} />
      </Routes>
    </Router>
  );
}

export default App;
