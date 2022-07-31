import { Link } from "react-router-dom";


export default function Movies({movieList}) {
  console.log(movieList);
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
      console.log(movieList);
      //TODO: Fazer um troço mais bonito
      return <div>Loading...</div>;
    } else {
      console.log(movieList);
      return (
        <div className="catalogo">
          {movieList.map((movie, index) => {
            console.log(movieList);
            console.log(movie.posterURL);
            console.log(movie.id);
            console.log(movie.title);
            return (
              <div className="poster" key={index}>
                <Link to={`/movie/${movie.id}`}>
                  <img src={movie.posterURL} alt={movie.posterURL} />
                </Link>
              </div>
            );})}
        </div>
      );}
}