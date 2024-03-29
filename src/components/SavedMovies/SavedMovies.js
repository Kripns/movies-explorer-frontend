import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { filterMovies } from '../../utils/functions';
import { resErrors } from '../../utils/constants';

function SavedMovies(props) {
  const {
    savedMovies,
    updateSavedMovies,
    handleDeleteMovie,
    isLoading,
    resStatus,
  } = props;

  const [searchValue, setSearchValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [savedMoviesToRender, setSavedMoviesToRender] = useState([]);
  const [nothingFound, setNothingFound] = useState(false);
  const [statusMessage, setStatusMessage] = useState(false);

  function handleSearchMovies(value, checkboxValue) {
    setSearchValue(value);
    setCheckboxValue(checkboxValue);
  }

  function getCheckboxValue(checkboxValue) {
    return setCheckboxValue(checkboxValue);
  };

  useEffect(() => {
    updateSavedMovies();
    setSavedMoviesToRender(savedMovies)
    setFilteredSavedMovies([]);
    setNothingFound(false);
  }, [])

  useEffect(() => {
    setFilteredSavedMovies(filterMovies(savedMovies, searchValue, checkboxValue));
    setStatusMessage(false);
  }, [savedMovies, searchValue, checkboxValue])

  
  useEffect(() => {
    setSavedMoviesToRender((filteredSavedMovies.length && filteredSavedMovies) || savedMovies);
  }, [filteredSavedMovies, savedMovies]);
  
  useEffect(() => {
    setNothingFound(!filteredSavedMovies.length && searchValue)
  }, [filteredSavedMovies.length, searchValue])

  useEffect(() => {
    setSavedMoviesToRender(filterMovies(savedMovies, searchValue, checkboxValue));
  }, [checkboxValue]);

  useEffect(() => {
    resStatus
    ? setStatusMessage(resErrors.error500)
    : nothingFound
    ? setStatusMessage(resErrors.nothingFound)
    : setStatusMessage(false)
  }, [resStatus, nothingFound]);
  

  return (
    <section className='movies movies_place_saved-movies'>
      <SearchForm
        handleSubmit={handleSearchMovies}
        getCheckboxValue={getCheckboxValue}
        searchValue={searchValue}
        checkboxValue={checkboxValue}
        isLoading={isLoading}
      />
      {
      isLoading ? <Preloader />
      : statusMessage ? <p className='movies__error'>{statusMessage}</p>
      : <MoviesCardList
          savedMovies={savedMovies}
          savedMoviesToRender={savedMoviesToRender}
          handleDeleteMovie={handleDeleteMovie}
        />
      }
    </section>
  );
}

export default SavedMovies;
