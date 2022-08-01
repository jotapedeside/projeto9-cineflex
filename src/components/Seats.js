import axios from "axios";
import { useState, useEffect } from "react";
import { Link,useParams } from "react-router-dom";
import styled from "styled-components";
import Rodape from "./Rodape";

export default function Seats() {
  const [sessionSeats, setSessionSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const {idSessao} = useParams();

  useEffect(() => {
    const req = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${idSessao}/seats`);
    req.then(res => {
      setSessionSeats({...res.data});
    });}, []);
  return(
    sessionSeats.seats && sessionSeats.seats.length > 0 ?
    <div className="container">
      <div className="container-header">
        <h1>Selecione os assentos</h1>
      </div>
      <Session
        sessionSeats={sessionSeats.seats}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}/>

      <Rodape movieSchedule={sessionSeats.movie} sessionInfo={sessionSeats}/>
    </div>
    :
    <>Loading...</>
  )
}

function Session({sessionSeats, selectedSeats, setSelectedSeats}) {
  return (
    <SeatsGrid>
      {sessionSeats.map((seat, index) => {
        return <Chairs
                  key={index}
                  seatsid={seat.id}
                  sessionSeats={seat.name}
                  available={seat.isAvailable}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}/>
      })}
    </SeatsGrid>
  );
}

function Chairs({sessionSeats, available, setSelectedSeats, selectedSeats, seatsid}) {
  const [availability, setAvailability] = useState(available)
  let color;
  let border;  

  switch (availability) {
    case true:
      color = "#C3CFD9";
      border = "#808F9D"
      break;
    case false:
      color = "#FBE192";
      border = "#F7C52B"
      break;
    default:
      color = "#8DD7CF";
      border = "#1AAE9E"
      break;
  }

  function chairSelected(id, seatsid) {
    switch (availability) {
      case true:
        setSelectedSeats([...selectedSeats, seatsid]);
        setAvailability(sessionSeats);
        break;
      case false:
        alert('Poltrona indisponível');
        break;
      default:
        //id
        setSelectedSeats([...selectedSeats, seatsid]);
        setAvailability(true)
        break;
    }
    /*if (availability === false) {
        alert('Poltrona indisponível');
    } else if (availability === true) {
        setAvailability(sessionSeats)
        const selecionado = [...selectedSeats, seatsid]
        setSelectedSeats(selecionado)
    } else if (sessionSeats === id) {
        setAvailability(true)
        const selecionado = selectedSeats.filter(id => id !== seatsid)
        setSelectedSeats(selecionado)
    }*/
}

  return (
    <Chair color={color} border={border} onClick={() => chairSelected(sessionSeats, seatsid)}>
      <p>{sessionSeats}</p>
    </Chair>
  )
}

const SeatsGrid = styled.div` 
  width: 375px;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
const Chair = styled.div`
    width: 26px;
    height: 25px;
    background: ${props => props.color};
    border: 1px solid ${props => props.border};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px 10px 5px;
    cursor: pointer;
    p {
        font-size: 11px;
        line-height: 13px;
        letter-spacing: 0.04em;
        color: #000000;
    }
`