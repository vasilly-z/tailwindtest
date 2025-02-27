import { useState } from 'react'
import { MOVIES, TMOVIE } from '../constants/movies.data'
import { twMerge } from 'tailwind-merge'
import { CreateMovieForm } from './CreateMovieForm'

function Movies() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('')
    const [movies, setMovies] = useState<TMOVIE[]>(MOVIES)

    const genres = Array.from(new Set(movies.map((movie) => movie.genre)))

    const filteredMovies = movies.filter((movie) => {
        const isMatchingSearchTerm = movie.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        const isMatchingGenre = selectedGenre
            ? movie.genre === selectedGenre
            : true
        return isMatchingSearchTerm && isMatchingGenre
    })      

    return (
        <div>
            <CreateMovieForm setMovies={setMovies} /> 
            <h1 className='py-2 margin-0-auto'>Movies</h1>
            <input
                type="search"
                placeholder="Search..."
                className='py-2 px-4 border rounded outline-none 
                focus:border-purple-500 transition-colors duration-300 ease-in-out'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
           <div className='flex flex-wrap gap-2'>
                {genres.map((genre) => (
                    <button
                        className={twMerge(
                            'py-2 px-4  rounded text-white bg-zinc-500', 
                            selectedGenre === genre ? 'bg-blue-500' : 'bg-zinc-900'
                        )}
                        key={genre}
                        onClick={() =>
                            setSelectedGenre(
                                selectedGenre === genre ? '' : genre
                            )
                        }
                    >
                        {genre}
                    </button>
                ))}
            </div>
            <ul>
                {filteredMovies.length ? (
                    filteredMovies.map((movie) => (
                        <li className='fade' key={movie.id}>
                            {movie.title} ({movie.genre})
                        </li>
                    ))
                ) : (
                    <li className='text-red-300'>No movies found</li>
                )}
            </ul>
        </div>
    )
}

export default Movies