import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../pages/logo-trybe.svg';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

//  esse arquivo vai ser a parte que se mantem na pagina e linkar com as rotas do App, alem de usar a API getUser
class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    // chamar a função da API dps que efetuar o login
    this.userNameLogin();
  }

  userNameLogin = async () => {
    // pegando o nome do usuario na API
    const saveUser = await getUser();
    const { name } = saveUser;
    this.setState({
      name,
      loading: false,
    });
  }

  render() {
    const { loading, name } = this.state;

    return (
      <header data-testid="header-component">
        <img src={ logo } alt="Trybe Logo" />
        <div data-testid="header-user-name">
          {
            loading ? <Loading /> : <p>{name}</p>
          }
        </div>
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
