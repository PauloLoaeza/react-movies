import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import SearchBox from './common/searchBox';
import MoviesTable from './moviesTable';
// import { getMovies } from "../services/movieService";
// import { getGenres } from "../services/genreService";
import { paginate } from '../utils/paginate';
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: '',
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {
    const genres = [
      { _id: '', name: 'All genres' },
      { _id: 1, name: 'Action' },
      { _id: 2, name: 'Thriller' },
      { _id: 3, name: 'Comedy' }
    ];
    this.setState({
      movies: [
        {
          _id: 1,
          title: 'title1',
          genre: { _id: 1, name: 'Action' },
          numberInStock: 1,
          dailyRentalRate: 3.5,
          liked: true
        },
        {
          _id: 2,
          title: 'title2',
          genre: { _id: 2, name: 'Thriller' },
          numberInStock: 2,
          dailyRentalRate: 6.5
        },
        {
          _id: 3,
          title: 'title3',
          genre: { _id: 1, name: 'Action' },
          numberInStock: 3,
          dailyRentalRate: 6.5
        },
        {
          _id: 4,
          title: 'title4',
          genre: { _id: 2, name: 'Thriller' },
          numberInStock: 4,
          dailyRentalRate: 9.5
        },
        {
          _id: 5,
          title: 'title5',
          genre: { _id: 1, name: 'Action' },
          numberInStock: 5,
          dailyRentalRate: 9.5
        },
        {
          _id: 6,
          title: 'title6',
          genre: { _id: 2, name: 'Thriller' },
          numberInStock: 6,
          dailyRentalRate: 9.5
        },
        {
          _id: 7,
          title: 'title7',
          genre: { _id: 3, name: 'Comedy' },
          numberInStock: 7,
          dailyRentalRate: 9.5
        },
        {
          _id: 8,
          title: 'title8',
          genre: { _id: 4, name: 'Unknown' },
          numberInStock: 8,
          dailyRentalRate: 9.5
        },
        {
          _id: 9,
          title: 'title9',
          genre: { _id: 3, name: 'Comedy' },
          numberInStock: 9,
          dailyRentalRate: 9.5
        },
        {
          _id: 10,
          title: 'title10',
          genre: { _id: 4, name: 'Unknown' },
          numberInStock: 10,
          dailyRentalRate: 9.5
        }
      ],
      genres
    });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    movies[index] = { ...movies[index], liked: !movies[index].liked };

    this.setState({ movies });
  };

  handlePageChanged = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: '' });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      selectedGenre,
      sortColumn,
      currentPage,
      pageSize,
      searchQuery
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  render() {
    const {
      movies: { length: count },
      genres,
      selectedGenre,
      currentPage,
      pageSize,
      sortColumn,
      searchQuery
    } = this.state;

    if (count === 0) return <p>No movies in the database</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New movie
          </Link>
          <p>Showing {totalCount} movies in the databse</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={this.handlePageChanged}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
