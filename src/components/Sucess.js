import {useLocation} from 'react-router-dom';
import styled from "styled-components"

export default function Sucess(){
  const location = useLocation();
  console.log(location);

  //botar botão de volta pra home
  return(
    <SuccessBody>
      <SuccessTitle>
        Pedido feito com sucesso!
      </SuccessTitle>
      <InfoContainer>
        <h1> Filme e sessão </h1>
        <p> {location.state.objToPost.movieName} </p>
        <p> {location.state.objToPost.movieDate} {location.state.objToPost.movieTime}</p>
      </InfoContainer>
      <InfoContainer>
        <h1> Ingressos </h1>
        <Ingressos ingressos={location.state.objToPost.ids}/>
      </InfoContainer>
      <InfoContainer>
        <h1> Comprador </h1>
        <p> Nome: {location.state.objToPost.name} </p>
        <p> CPF: {location.state.objToPost.cpf}  </p>
      </InfoContainer>
      <button> POW POW</button>
    </SuccessBody>
  )
}

function Ingressos({ingressos}){
  return(
    <>
      {ingressos.map((i,index) => <p key={index}>Assento {i}</p>)}
    </>
  )

}

const SuccessBody = styled.div`
  margin-top: 80px;
  margin-bottom: 12px;
  width: 100vw;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  letter-spacing: 0.04em;
  line-height: 28px;
`
const SuccessTitle = styled.div`
  width: 100%;
  height: 110px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #247A6B;
`
const InfoContainer = styled.div`
  padding: 10px 26px;
  width: 100%;
  h1{
    font-weight: 700;
    line-height: 40px;
  }
  p{
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
  }

`