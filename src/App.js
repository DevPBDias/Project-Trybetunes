import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import searchAlbumsAPI from './services/searchAlbumsAPI';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      artist: '',
      allAlbums: [],
      buttonDisabled: true,
      buttonDisabledTwo: true,
      searchName: '',
      searchAlbum: false,
      conditionAlbum: false,
    };
  }

  minimumLoginName = () => {
    const { name } = this.state;
    const min = 3;
    const loginNameLength = name.length >= min;
    const condicao = [loginNameLength];
    const verifyTrue = condicao.every((elemento) => elemento === true);
    this.setState({ buttonDisabled: !verifyTrue });
  }

  inputChange = ({ target }) => {
    this.setState({ name: target.value }, this.minimumLoginName);
  }

  minimumSearch = () => {
    const { searchName } = this.state;
    const min = 2;
    const searchLength = searchName.length >= min;
    const condicao = [searchLength];
    const verifyTrue = condicao.every((elemento) => elemento === true);
    this.setState({ buttonDisabledTwo: !verifyTrue });
  }

  inputSearchChange = ({ target }) => {
    this.setState({ searchName: target.value }, this.minimumSearch);
  }

  handleSearchClick = () => {
    const { searchName } = this.state;
    this.setState({
      searchAlbum: true,
      artist: searchName,
    }, async () => {
      const songs = await searchAlbumsAPI(searchName);
      this.setState({
        searchName: '',
        searchAlbum: false,
        conditionAlbum: true,
        allAlbums: songs,
      });
    });
  }

  render() {
    const {
      name,
      buttonDisabled,
      searchName,
      buttonDisabledTwo,
      searchAlbum,
      conditionAlbum,
      artist,
      allAlbums } = this.state;

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              buttonDisabled={ buttonDisabled }
              inputChange={ this.inputChange }
              name={ name }
            />) }
          />
          <Route
            path="/search"
            render={ (props) => (<Search
              { ...props }
              artist={ artist }
              allAlbums={ allAlbums }
              buttonDisabledTwo={ buttonDisabledTwo }
              handleSearchClick={ this.handleSearchClick }
              inputSearchChange={ this.inputSearchChange }
              searchName={ searchName }
              searchAlbum={ searchAlbum }
              conditionAlbum={ conditionAlbum }
            />) }
          />
          <Route
            path="/album/:id"
            render={ (props) => (<Album
              { ...props }
            />) }
          />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
