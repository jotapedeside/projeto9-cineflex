import axios from "axios";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Rodape from "./Rodape";

export default function Schedules({movieSchedule, setMovieSchedule}) {
  //const [movieSchedule, setMovieSchedule] = useState([]);
  const {idFilme} = useParams();

  useEffect(()=>{
    const req = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/movies/${idFilme}/showtimes`);

    req.then(res => {
      setMovieSchedule(res.data);
    });
  }, []);
  
  return(
    movieSchedule.days && movieSchedule.days.length > 0 ?
    <div className="container">
      <div className="container-header">
        <h1>Selecione o horário</h1>
      </div>
      <Schedule days={movieSchedule.days}/>
      <Rodape movieSchedule={movieSchedule}/>
    </div>
    :
    <>Loading...</>
  )
}

function Schedule({days}){
    return (
      <div className="schedule">
        {days.map((day, index) =>
          <Date key={index} days={day}/>
        )}
      </div>
    )
  
}

function Date({days}){
  return(
    <div className="date-cont">
      <div className="date">
        <h1> {days.weekday} - {days.date} </h1>
      </div>
      <div className="timelist">
        {days.showtimes.map((time, index) =>
          <Time key={index} times={time}/>
        )}
      </div>
    </div>
  )
}

function Time({times}){
  return(
    <div className="time">
      <Link to={`/assentos/${times.id}`} >
        <p> {times.name} </p>
      </Link>
    </div>
  )
}