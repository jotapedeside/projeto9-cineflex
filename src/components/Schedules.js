import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Rodape from "./Rodape";

export default function Schedules({movieSchedule, setMovieSchedule}) {
  //const [movieSchedule, setMovieSchedule] = useState([]);
  const {movieId} = useParams();

  useEffect(()=>{
    const req = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/movies/${movieId}/showtimes`);

    req.then(res => {
      console.log(movieSchedule);
      console.log(movieSchedule.days);
      setMovieSchedule(res.data);
      console.log(movieSchedule);
      console.log(movieSchedule.days);
    });
  }, []);

  return(
    <div className="container">
      <div className="container-header">
        <h1>Selecione o horário</h1>
      </div>
      <Schedule days={movieSchedule}/>
      <Rodape movieSchedule={movieSchedule}/>
    </div>
  )
}

function Schedule({days}){
  if (days.length === 0) {
    return <div>Loading...</div>;
  } else {
    console.log(days);
    return (
      /*
      <div className="catalogo">
        {days.map((movie, index) => {
          return (
            <div className="poster" key={index}>
              <Link to={`/sessoes/${movie.id}`}>
                <img src={movie.posterURL} alt={movie.posterURL} />
              </Link>
            </div>
          );})}
      </div>*/
      <>
        <Time/>
      </>
    )
  }
}

function Time(){
  return(
    <>
      <p> Test</p>
    </>
  )
}