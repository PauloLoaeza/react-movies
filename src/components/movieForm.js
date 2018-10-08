import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
// import { getMovie, saveMovie } from '../services/movieService';
// import { getGenres } from '../services/movieService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label('Title'),
    genreId: Joi.string()
      .required()
      .label('Genre'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number in stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Daily rental rate')
  };

  componentDidMount() {
    const genres = [
      { _id: 1, name: 'Action' },
      { _id: 2, name: 'Thriller' },
      { _id: 3, name: 'Comedy' }
    ]; //TODO: getGenres
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === 'new') return;

    const movie = {
      _id: 1,
      title: 'title1',
      genre: { _id: 1, name: 'Action' },
      numberInStock: 1,
      dailyRentalRate: 3.5,
      liked: true
    }; //TODO: getMovie(movieId)
    if (!movie) return this.props.history.replace('/not-found');

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = movie => {
    return {
      ...movie,
      genreId: movie.genre._id
    };
  };

  doSubmit = () => {
    //saveMovie(this.state.data);
    this.props.history.push('/movies');
  };

  render() {
    return (
      <div>
        <h1>Movie form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title: ')}
          {this.renderSelect('genreId', 'Genre: ', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in stock: ', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate: ')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;
