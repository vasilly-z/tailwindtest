import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TMOVIE , MOVIES} from '../constants/movies.data';

type ICreateMovieForm = Pick<TMOVIE, 'title'| 'genre'>
interface Props{
  setMovies: React.Dispatch<React.SetStateAction<TMOVIE[]>>
}
export function CreateMovieForm({ setMovies }: Props) {
  const { register, handleSubmit, reset, watch, formState: {errors} } = useForm<ICreateMovieForm>({
    mode: 'onChange',
  });

console.log(watch('genre'))


  const onSubmit: SubmitHandler<ICreateMovieForm> = (data) => {
    console.log(data);
    const newMovie : TMOVIE = {
      id: MOVIES.length + 1,
      ...data
    }
    setMovies((prev) => [...prev, newMovie])
    reset()
  }


  return <div>
    <h2>Add a new movie</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
    <input
    {...register('title', { required: {message: 'Title is required', value: true} })}
                type="search"
                placeholder="Title"
                className='py-2 px-4 border rounded outline-none 
                focus:border-purple-500 transition-colors duration-300 ease-in-out block'
            />
            {errors.title?.message && <p>{errors.title.message}</p>}
            <input
    {...register('genre', { required: {message: 'Genre is required', value: true} })}
                type="search"
                placeholder="Genre"
                className='py-2 px-4 border rounded outline-none 
                focus:border-purple-500 transition-colors duration-300 ease-in-out block'
            />
           {errors.genre?.message && <p>{errors.genre.message}</p>}
            <button type='submit' className='block bg-color-black-500'>Add movie</button>
    </form>
  </div>
}
