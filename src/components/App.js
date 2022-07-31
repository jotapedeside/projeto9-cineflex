import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header.js";
import Movie from "./Movie.js";
import Schedule from "./Schedule.js";

export default function App() {
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Schedule/>} />
      </Routes>
    </BrowserRouter>
  )
}