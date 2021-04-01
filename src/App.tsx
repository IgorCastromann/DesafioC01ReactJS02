import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { api } from './services/api';

import './styles/global.scss';
import { createContext, useContext, useEffect, useState } from 'react';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}


export type GlobalContent = {
  genres: [{
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }]
  setGenres: (c: string) => void,
  selectedGenreId: number,
  setSelectedGenreId: (id: number) => void,
  selectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  },
}
export const MyGlobalContext = createContext<GlobalContent>({
  genres: [{
    id: 1,
    name: 'action',
    title: 'legal'
  }],
  setGenres: () => { },
  selectedGenreId: 1,
  setSelectedGenreId: () => { },
  selectedGenre: {
    id: 1,
    name: 'action',
    title: 'string'
  },
})
export const useGlobalContext = () => useContext(MyGlobalContext)


export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);



  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);


  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MyGlobalContext.Provider value={{ genres, setGenres, selectedGenreId, setSelectedGenreId, selectedGenre }}>
        <SideBar />
        <Content />
      </MyGlobalContext.Provider>
    </div>
  )
}

