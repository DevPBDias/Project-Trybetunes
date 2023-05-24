import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  musicAPI = (elemento) => {
    this.setState({
      loading: true,
    }, async () => {
      await addSong(elemento);
      await getFavoriteSongs();
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { loading } = this.state;
    const { songs } = this.props;

    return (
      <section>
        <div>
          {
            loading ? <Loading /> : <div />
          }
        </div>
        {
          songs.slice(1).map((musica) => (
            <div key={ musica.trackNumber }>
              <p>{musica.trackName}</p>
              <audio data-testid="audio-component" src={ musica.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o musicao
                <code>audio</code>
                .
              </audio>
              <label htmlFor="input-checkbox">
                <input
                  id="input-checkbox"
                  type="checkbox"
                  data-testid={ `checkbox-music-${musica.trackId}` }
                  // usar arrow para conseguir passar (musica) pra função
                  onChange={ () => this.musicAPI(musica) }
                />
                Favorita
              </label>
            </div>
          ))
        }
      </section>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
