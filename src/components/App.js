import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header.js";
import Movies from "./Movies.js";
import Schedule from "./Schedule.js";

export default function App() {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    const req = axios.get("https://mock-api.driven.com.br/api/v7/cineflex/movies")
    req.then(res => {
      console.log(res.data);
      setMovieList(res.data);
    });
  }, []);
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Movies movieList={movieList}/>} />
        <Route path="/movie" element={<Schedule/>} />
      </Routes>
    </BrowserRouter>
  )
}