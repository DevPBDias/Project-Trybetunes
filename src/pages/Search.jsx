import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends Component {
  render() {
    const {
      searchName,
      inputSearchChange,
      buttonDisabledTwo,
      searchAlbum,
      handleSearchClick,
      conditionAlbum,
      artist,
      allAlbums } = this.props;

    let firstCondition;
    if (searchAlbum) {
      firstCondition = <Loading />;
    } else {
      firstCondition = (
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            value={ searchName }
            id="input-searchMusic"
            onChange={ inputSearchChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonDisabledTwo }
            onClick={ handleSearchClick }
          >
            Pesquisar
          </button>
        </form>);
    }

    let secondCondition;
    if (conditionAlbum) {
      secondCondition = (<div>{ `Resultado de álbuns de: ${artist} `}</div>);
    } else {
      secondCondition = <div />;
    }

    let thirdCondition;
    if (allAlbums.length === 0) {
      <p>{ `Resultado de álbuns de: ${artist}`}</p>;
      thirdCondition = 'Nenhum álbum foi encontrado';
    } else {
      thirdCondition = (
        <section>
          {
            allAlbums.map((musica) => (
              <div key={ musica.collectionId }>
                <img src={ musica.artwokUrl100 } alt={ musica.artistName } />
                <p>{musica.artistName}</p>
                <p>{musica.collectionName}</p>
                <p>{musica.collectionId}</p>
                <Link
                  to={ `/album/${musica.collectionId}` }
                  data-testid={ `link-to-album-${musica.collectionId}` }
                >
                  Album do artista
                </Link>
              </div>))
          }
        </section>);
    }

    return (
      <div data-testid="page-search">
        <Header />
        <section>
          <div>{firstCondition}</div>
          <div>{secondCondition}</div>
          <div>{thirdCondition}</div>
        </section>
      </div>
    );
  }
}

Search.propTypes = {
  searchName: PropTypes.string.isRequired,
  inputSearchChange: PropTypes.func.isRequired,
  buttonDisabledTwo: PropTypes.bool.isRequired,
  searchAlbum: PropTypes.bool.isRequired,
  conditionAlbum: PropTypes.bool.isRequired,
  handleSearchClick: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  allAlbums: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Search;
