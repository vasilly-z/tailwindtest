import { useState } from 'react'
import { MOVIES } from '../constants/movies.data'
import { twMerge } from 'tailwind-merge'

function Movies() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('')

    const genres = Array.from(new Set(MOVIES.map((movie) => movie.genre)))

    const filteredMovies = MOVIES.filter((movie) => {
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