import http from './httpService';

export function getMovies() {
  return http.get('http://localhost:3900/api/movies');
}

export function deleteMovie(movieId) {
  return http.delete('http://localhost:3900/api/movies/' + movieId);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;

    return http.put('http://localhost:3900/api/movies/' + movie._id, body);
  }

  return http.post('http://localhost:3900/api/movies', movie);
}

export function getMovie(movieId) {
  return http.get('http://localhost:3900/api/movies/' + movieId);
}
