import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header.js";
import Movies from "./Movies.js";
import Schedules from "./Schedules.js";
import Seats from "./Seats.js";
import Sucess from "./Sucess.js";

export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [movieSchedule, setMovieSchedule] = useState([]);

  useEffect(() => {
    const req = axios.get("https://mock-api.driven.com.br/api/v7/cineflex/movies");

    req.then(res => {
      setMovieList(res.data);
    });
  }, []);
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Movies movieList={movieList}/>} />
        <Route path="/sessoes/:idFilme" element={<Schedules movieSchedule={movieSchedule} setMovieSchedule={setMovieSchedule}/>} />
        <Route path="/assentos/:idSessao" element={<Seats/>} />
        <Route path="/sucesso" element={
                    <Sucess/>}/>
      </Routes>
    </BrowserRouter>
  )
}