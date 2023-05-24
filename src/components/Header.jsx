import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  state = {
    hash: '',
  };

  componentDidMount() {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    this.setState({
      hash,
    });
  }

  render() {
    const { name, score } = this.props;
    const { hash } = this.state;
    const endPoint = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <div className="header-trivia">
        <img
          data-testid="header-profile-picture"
          alt="Profile"
          src={ endPoint }
        />
        <span data-testid="header-player-name">{` ${name}`}</span>
        <span data-testid="header-score">{` ${score}`}</span>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  ...globalState.player,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
