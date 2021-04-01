import { useEffect, useState } from "react";
import '../styles/content.scss';
import { api } from '../services/api';
import { MovieCard } from './MovieCard';

import { useGlobalContext } from '../App'

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}


export function Content() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const { selectedGenreId, selectedGenre } = useGlobalContext()


  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

  }, [selectedGenreId]);
  console.log(selectedGenre)
  return (

    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>

  )
}

function GlobalContentContext(GlobalContentContext: any) {
  throw new Error("Function not implemented.");
}
