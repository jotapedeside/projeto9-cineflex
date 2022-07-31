import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header.js";
import Movies from "./Movies.js";
import Schedules from "./Schedules.js";
import Seats from "./Seats.js";

export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [movieSchedule, setMovieSchedule] = useState([]);

  useEffect(() => {
    const req = axios.get("https://mock-api.driven.com.br/api/v7/cineflex/movies")
    req.then(res => {
      setMovieList(res.data);
    });
  }, []);

  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Movies movieList={movieList}/>} />
        <Route path="/sessoes/:movieId" element={<Schedules movieSchedule={movieSchedule} setMovieSchedule={setMovieSchedule}/>} />
        <Route path="/movie/:movieId/seats" element={<Seats/>} />
      </Routes>
    </BrowserRouter>
  )
}