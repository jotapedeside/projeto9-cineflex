import { Link } from "react-router-dom";

export default function Movies({movieList}) {
  return(
    <div className="container">
      <div className="container-header">
        <h1>Selecione o filme</h1>
      </div>
      <Movie movieList={movieList} />
    </div>
  )
}

function Movie({movieList}) {
    if (movieList.length === 0) {
      //TODO: Fazer um troço mais bonito
      return <div>Loading...</div>;
    } else {
      return (
        <div className="catalogo">
          {movieList.map((movie, index) => {
            return (
              <div className="poster" key={index}>
                <Link to={`/sessoes/${movie.id}`}>
                  <img src={movie.posterURL} alt={movie.posterURL} />
                </Link>
              </div>
            );})}
        </div>
      );}
}