import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import logo from './logo-trybe.svg';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  // função que salva o nome digitado e redireciona para /search
  handleButtonClick = async () => {
    const { name, history } = this.props;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false });
    history.push('/search');
  }

  render() {
    const { loading } = this.state;
    const { name, inputChange, buttonDisabled } = this.props;

    return (
      <div data-testid="page-login">
        <img src={ logo } alt="Trybe logo" />
        <form>
          <label htmlFor="input-nome">
            Login Name:
            <input
              type="text"
              id="input-nome"
              value={ name }
              data-testid="login-name-input"
              onChange={ inputChange }
            />
          </label>
          <button
            type="submit"
            disabled={ buttonDisabled }
            data-testid="login-submit-button"
            onClick={ this.handleButtonClick }
          >
            Enter
          </button>
          <div>
            {
              loading && <Loading />
            }
          </div>
        </form>

      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string.isRequired,
  buttonDisabled: PropTypes.bool.isRequired,
  inputChange: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Login;
