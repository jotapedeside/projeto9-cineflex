export default function Rodape({movieSchedule, sessionInfo}){
  console.log(sessionInfo);
  return(
    <div className="rodape">
      <div className="rodape-poster">
        <img src={movieSchedule.posterURL} alt={movieSchedule.title} />
      </div>
      <div>
        <h1>{movieSchedule.title}</h1>
        {sessionInfo !== undefined ?
        <h1>{sessionInfo.day.weekday} - {sessionInfo.name}</h1>
        : <></>}
      </div>
    </div>
    )
}