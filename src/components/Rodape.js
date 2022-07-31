export default function Rodape({movieSchedule}){
  console.log(movieSchedule);
  console.log(movieSchedule.title);
  return(
    <div className="rodape">
      <div className="rodape-poster">
        <img src={movieSchedule.posterURL} alt={movieSchedule.title} />
      </div>
      <h1>{movieSchedule.title}</h1>
    </div>
    )
}