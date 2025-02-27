import { TMOVIE , MOVIES} from '../constants/movies.data';
import { useForm, SubmitHandler } from 'react-hook-form';
import {useMovieStore } from '../zustand/store';


type ICreateMovieForm = Pick<TMOVIE, 'title'| 'genre'>

export function CreateMovieForm() {
  const { register, handleSubmit, reset, watch, formState: {errors} } = useForm<ICreateMovieForm>({
    mode: 'onChange',
  });

  console.log(watch('genre'))

  const {addMovie} = useMovieStore() 

  const onSubmit: SubmitHandler<ICreateMovieForm> = (data) => {
    const newMovie : TMOVIE = {
      id: MOVIES.length + 1,
      ...data
    }
    addMovie(newMovie)
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
            {errors.title?.message && <p className='text-red-400'>{errors.title.message}</p>}
            <input
    {...register('genre', { required: {message: 'Genre is required', value: true} })}
                type="search"
                placeholder="Genre"
                className='py-2 px-4 border rounded outline-none 
                focus:border-purple-500 transition-colors duration-300 ease-in-out block'
            />
           {errors.genre?.message && <p className='text-red-400'>{errors.genre.message}</p>}
            <button type='submit' className='block bg-color-black-500 mt-2'>Add movie</button>
    </form>
  </div>
}
