import { MOVIES, TMOVIE } from '../constants/movies.data'
import { create } from 'zustand'
interface IMovieStore {
  movieList: TMOVIE[]
  searchTerm: string
  selectedGenre: string
  addMovie: (movie: TMOVIE) => void
  selectGenre: (genre: string) => void
  setSearchTerm: (term: string) => void
}

export const useMovieStore = create<IMovieStore>((set) => ({
  movieList: MOVIES,
  searchTerm: '',
  selectedGenre: '',
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  selectGenre: (genre: string) => set({ selectedGenre: genre }),
  addMovie: (movie: TMOVIE) =>
    set((state) => ({ movieList: [...state.movieList, movie] })),
}))
