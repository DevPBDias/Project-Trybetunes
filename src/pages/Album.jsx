import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      titleName: '',
      songs: [],
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    this.setState({ songs }, () => {
      this.setState({
        artistName: songs[0].artistName,
        titleName: songs[0].collectionName,
      });
    });
  }

  render() {
    const {
      songs,
      titleName,
      artistName } = this.state;

    return (
      <section data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">
          {`Título do album: ${titleName} Artista: ${artistName}`}
        </p>
        <MusicCard songs={ songs } />
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.arrayOf(PropTypes.object).isRequired,
  params: PropTypes.arrayOf(PropTypes.array).isRequired,
  id: PropTypes.string.isRequired,
};

export default Album;
