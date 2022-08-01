import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Rodape from "./Rodape";

export default function Seats() {
  const [sessionSeats, setSessionSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [name, setName] = useState([]);
  const [cpf, setCpf] = useState([]);

  const {idSessao} = useParams();
  //Put LEGENDA DE ASSENTO below Session component
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
      <SessionSeatsInfo/>
      <ClientInfo
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        idSessao={idSessao}
        name={name}
        setName={setName}
        cpf={cpf}
        setCpf={setCpf}
        sessionSeats={sessionSeats}/>
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
        alert("Este assento está indisponível...");
        break;
      default:
        //id
        setSelectedSeats([...selectedSeats, seatsid]);
        setAvailability(true)
        break;
    }
  }

  return (
    <Chair color={color} border={border} onClick={() => chairSelected(sessionSeats, seatsid)}>
      <p>{sessionSeats}</p>
    </Chair>
  )
}

function ClientInfo({selectedSeats, setSelectedSeats, idSessao, name, setName, cpf, setCpf, sessionSeats}) {
  //verificar se o nome e cpf estão preenchidos e se o cpf é valido (11 digitos) e se o nome tem pelo menos 2 letras
  const ids = selectedSeats.map(i => Number(i));
  let navigate = useNavigate();
  const regCPF = /^\d{11}$/;

  function Submit(event) {
    event.preventDefault();
    if (validateForm()) {
      
      const objToPost = {
        movieName: sessionSeats.movie.title,
        movieDate: sessionSeats.day.date,
        movieTime: sessionSeats.name,
        ids: selectedSeats,
        name: name,
        cpf: cpf
      }
      //console.log(objToPost);

      const req = axios.post(`https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many`, {
        ids: selectedSeats,
        name: name,
        cpf: cpf
      });

      req.then(res => {
        navigate("/sucesso", {state: {objToPost: objToPost}});
        alert("Reserva realizada com sucesso!");
      }).catch(err => {
        alert("Erro ao realizar a reserva!");
      });
    } else {
      alert("Preencha os campos corretamente!");
    }
  }

  function validateForm() {
    return name.length > 1 && regCPF.test(cpf) && selectedSeats.length > 0;
  }

  return (
    <FormStyle>
      <FormInfo>
        <label >Nome do comprador:</label>
        <input type="text" placeholder="Digite seu nome..." value={name} onChange={e => setName(e.target.value)}/>
        <label >CPF do comprador:</label>
        <input type="text" placeholder="Digite seu CPF..." value={cpf} onChange={e => setCpf(e.target.value)}/>
      </FormInfo>
      <button type="submit" onClick={Submit}>Reservar assento(s)</button>
    </FormStyle>
  )
}

function SessionSeatsInfo(){
  return(
    <SeatsInfo>
      <div className="example-div">
        <div className="seat-example selected"/>
        <p>Selecionado</p>
      </div>
      <div className="example-div">
        <div className="seat-example available"/>
        <p>Disponível</p>
      </div>
      <div className="example-div">
        <div className="seat-example unavailable"/>
        <p>Indisponível</p>
      </div>
    </SeatsInfo>
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
    height: 26px;
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
    }
`

const FormStyle = styled.form`
  margin: 24px 24px;
  padding: 0 10px;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  flex-direction: column;
  align-items: center;

  button{
    margin: 57px 0 147px 0;
    width: 225px;
    height: 42px;
    border-radius: 3px;
    color: #ffffff;
    background: #E8833A;
    border: none;
    cursor: pointer;
  }
`

const FormInfo = styled.div`
  label{
    color: #293845;
    line-height: 30px;
  }
  input{
    font-style: italic;
    font-size: 18px;
    color: #AFAFAF;
    width: 327px;
    height: 51px;
    padding-left: 15px;
    margin-bottom: 10px;
    border: 1px solid #D5D5D5;
    border-radius: 3px;
  }
`

const SeatsInfo = styled.div`
  display: flex;
  justify-content: space-around;

  .example-div{
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  p{
    height: 28px;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: -0.013em;
    color: #4E5A65;
  }

  .seat-example{
    width: 26px;
    height: 26px;
    border-radius: 12px;
  }
  
  .selected{
    background: #8DD7CF;
    border: 1px solid #1AAE9E;
  }

  .available{
    background: #C3CFD9;
    border: 1px solid #7B8B99;
  }

  .unavailable{
    background: #FBE192;
    border: 1px solid #F7C52B;  
  }
`